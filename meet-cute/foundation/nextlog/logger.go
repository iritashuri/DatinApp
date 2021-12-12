package nextlog

import (
	"errors"
	"io"

	kitlog "github.com/go-kit/kit/log"
)

// logger implements kitlog.Logger
type logger struct {
	kitLogger kitlog.Logger
	level     string
	w         io.Writer
}

type Valuer func() interface{}

func (l *logger) Debug(msg string, keyvals ...interface{}) {
	if !l.canDebug() {
		return
	}

	keyvals = addLevelAndMsg(LevelDebug, msg, keyvals...)
	l.Log(keyvals...)
}

func (l *logger) Info(msg string, keyvals ...interface{}) {
	if !l.canInfo() {
		return
	}

	keyvals = addLevelAndMsg(LevelInfo, msg, keyvals...)
	l.Log(keyvals...)
}

func (l *logger) AddColor(key, value, color string) {
	if l == nil || l.w == nil {
		return
	}

	lw := l.w
	writer, ok := lw.(*writer)
	if !ok {
		return
	}

	writer.AddColorRule(key, value, color)
}

// kitlog.Logger implementation
func (l *logger) Log(keyvals ...interface{}) error {
	if l == nil || l.w == nil {
		return errors.New("no logger or no out")
	}

	keyvals = runValuerIfNeedto(keyvals)
	return l.kitLogger.Log(keyvals...)
}

// private

func (l *logger) canDebug() bool {
	return l != nil && l.level == LevelDebug
}

func (l *logger) canInfo() bool {
	return l != nil && (l.level == LevelDebug || l.level == LevelInfo)
}

func (l *logger) canWarn() bool {
	return l != nil
}

func addLevelAndMsg(level, msg string, keyvals ...interface{}) []interface{} {
	kvsToRet := append(
		[]interface{}{
			"level", level,
			"msg", msg,
		},
		keyvals...,
	)

	if len(kvsToRet)%2 == 0 {
		return kvsToRet
	}

	return append(keyvals, "MISSING VALUE")
}

func runValuerIfNeedto(keyvals []interface{}) []interface{} {
	kvsToRet := make([]interface{}, len(keyvals))
	for i := 0; i < len(keyvals); i++ {
		if v, ok := keyvals[i].(Valuer); ok {
			kvsToRet[i] = v()
		} else {
			kvsToRet[i] = keyvals[i]
		}
	}

	return kvsToRet
}
