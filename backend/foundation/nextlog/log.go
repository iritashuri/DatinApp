package nextlog

import (
	"io"
	"os"

	kitlog "github.com/go-kit/kit/log"
	"github.com/mattn/go-isatty"
)

const (
	LevelDebug   = "debug"
	LevelInfo    = "info"
	LevelError   = "error"
	LevelWarning = "warning"
)

type Logger interface {
	Debug(msg string, keyvals ...interface{})
	Info(msg string, keyvals ...interface{})
	Error(err error, msg string, keyvals ...interface{})
	AddColor(key, value, color string)
}

type Config struct {
	Level  string
	Tenant string
}

// TODO(oren) rename to New (?)
func NewLogger(c Config, out io.Writer, keyvals ...interface{}) Logger {
	var (
		w         io.Writer
		kitLogger kitlog.Logger
	)

	if isTerm(out) {
		w = NewWriter(out)
		kitLogger = kitlog.NewLogfmtLogger(kitlog.NewSyncWriter(w))
	} else {
		w = out
		kitLogger = kitlog.NewJSONLogger(kitlog.NewSyncWriter(w))
	}

	keyvals = append(convertToKitValuerIfNeed(keyvals), []interface{}{
		"timestamp", kitlog.DefaultTimestampUTC,
	}...)

	if c.Tenant != "" {
		keyvals = append(keyvals, []interface{}{
			"tenant", c.Tenant,
		}...)
	}

	kitLogger = kitlog.With(kitLogger, keyvals...)
	return &logger{kitLogger: kitLogger, w: w, level: c.Level}
}

// private

func isTerm(out io.Writer) bool {
	if w, ok := out.(*os.File); !ok ||
		(os.Getenv("TERM") == "dumb" || (!isatty.IsTerminal(w.Fd()) && !isatty.IsCygwinTerminal(w.Fd()))) {
		return false
	}

	return true
}

func convertToKitValuerIfNeed(keyvals []interface{}) []interface{} {
	kvsToRet := make([]interface{}, len(keyvals))
	for i := 0; i < len(keyvals); i++ {
		if v, ok := keyvals[i].(Valuer); ok {
			kvsToRet[i] = kitlog.Valuer(v)
		} else {
			kvsToRet[i] = keyvals[i]
		}
	}

	return kvsToRet
}
