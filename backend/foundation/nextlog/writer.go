package nextlog

import (
	"errors"
	"fmt"
	"io"
	"regexp"
	"strings"

	pkgErrors "github.com/pkg/errors"
)

const (
	ColorGrey      = "\x1b[30;1m"
	ColorRed       = "\x1b[31;1m"
	ColorGreen     = "\x1b[32;1m"
	ColorYellow    = "\x1b[33;1m"
	ColorPurple    = "\x1b[34;1m"
	ColorMagenta   = "\x1b[35;1m"
	ColorCyan      = "\x1b[36;1m"
	ColorWhite     = "\x1b[37;1m"
	ColorGreenBG   = "\x1b[97;42m"
	ColorWhiteBG   = "\x1b[90;47m"
	ColorYellowBG  = "\x1b[97;43m"
	ColorRedBG     = "\x1b[97;41m"
	ColorBlueBG    = "\x1b[97;44m"
	ColorMagentaBG = "\x1b[97;45m"
	ColorCyanBG    = "\x1b[97;46m"
	ColorReset     = "\x1b[0m"
)

// writer is used to add colors in case the output is terminal.
// writer implements io.Writer
type writer struct {
	out        io.Writer
	colorRules map[string]string
}

func NewWriter(out io.Writer) *writer {
	return &writer{
		out:        out,
		colorRules: map[string]string{},
	}
}

func (w *writer) Write(p []byte) (n int, err error) {
	if w.out == nil {
		return 0, errors.New("no out")
	}

	s := string(p)
	s = w.putKeyFirst(s, "level")
	s = w.putKeyFirst(s, "name")
	s = w.setFixedLength(s, "name", 10)
	s = w.setFixedLength(s, "level", 5)
	s = w.colorize(s)
	return io.WriteString(w.out, s)
}

func (w *writer) PrintStack(err error) {
	type stacker interface {
		StackTrace() pkgErrors.StackTrace
	}

	tracer, ok := err.(stacker)
	if !ok {
		return
	}

	stack := tracer.StackTrace()
	stackString := fmt.Sprintf("%+v\n\n", stack)
	io.WriteString(w.out, stackString)
}

func (w *writer) AddColorRule(key, value, color string) {
	kv := key + "=" + value
	w.colorRules[kv] = color
}

// private

func (w *writer) putKeyFirst(s, key string) string {
	regF := fmt.Sprintf("(.*) %s=(.*?)( .*|$)", key)
	reg := regexp.MustCompile(regF)
	resF := fmt.Sprintf("%s=${2} ${1} ${3}", key)
	res := reg.ReplaceAllString(s, resF)
	return res
}

func (w *writer) setFixedLength(s, key string, length int) string {
	value, err := findKey(s, key)
	if err != nil {
		return s
	}

	newValue := fmt.Sprintf("%-*s", length, value)
	regF := fmt.Sprintf("(^| .*)%s=%s( .*|$)", key, value)
	reg := regexp.MustCompile(regF)
	resF := fmt.Sprintf("${1}%s=%s${2}", key, newValue)
	res := reg.ReplaceAllString(s, resF)
	return res
}

func (w *writer) colorize(s string) string {
	s = w.colorizeLevel(s)
	s = w.colorizeRules(s)
	return s
}

func (w *writer) colorizeLevel(s string) string {
	i := strings.Index(s, "level=")
	if i == -1 {
		return s
	}

	// level, err := findLevel(s)
	level, err := findKey(s, "level")
	if err != nil {
		return s
	}

	return replaceLevelColor(s, level)
}

func replaceLevelColor(s, level string) string {
	color := colorForLevel(level)
	kv := "level=" + level
	return colorize(s, kv, color)
}

func (w *writer) colorizeRules(s string) string {
	for kv, color := range w.colorRules {
		s = colorize(s, kv, color)
	}
	return s
}

func colorize(s, kv, color string) string {
	colored := color + "$0" + ColorReset
	reg, err := regexp.Compile(kv)
	if err != nil {
		return s
	}

	return reg.ReplaceAllString(s, colored)
}

func findLevel(s string) (string, error) {
	r := "level=(?P<level>[-\\w]*)"
	reg, err := regexp.Compile(r)
	if err != nil {
		return "", err
	}

	matches := reg.FindStringSubmatch(s)
	if len(matches) > 0 {
		return matches[len(matches)-1], nil
	}

	return "", fmt.Errorf("didn't find level")
}

func findKey(s, key string) (string, error) {
	r := fmt.Sprintf("%s=(?P<key>[-\\w]*)", key)
	reg, err := regexp.Compile(r)
	if err != nil {
		return "", err
	}

	matches := reg.FindStringSubmatch(s)
	if len(matches) > 0 {
		return matches[len(matches)-1], nil
	}

	return "", fmt.Errorf("didn't find key")
}

func colorForLevel(level string) string {
	switch level {
	case LevelDebug:
		return ColorPurple
	case LevelInfo:
		return ColorYellow
	case LevelError:
		return ColorRed
	case LevelWarning:
		return ColorMagenta
	default:
		return ColorReset
	}
}
