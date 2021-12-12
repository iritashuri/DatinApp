package nextlog

import (
	"encoding/json"
	"fmt"
	"os"
)

func (l *logger) Error(err error, msg string, keyvals ...interface{}) {
	if !l.canError() {
		return
	}

	keyvals = appendErrKeyvals(err, keyvals)
	keyvals = addLevelAndMsg(LevelError, err.Error(), keyvals...)
	l.logError(err, msg, keyvals...)
}

func (l *logger) logError(err error, msg string, keyvals ...interface{}) {
	keyvals = appendErrKeyvals(err, keyvals)
	keyvals = addLevelAndMsg(LevelError, msg, keyvals...)
	keyvals = append(keyvals, []interface{}{
		"err.Error()", err.Error(),
	}...)

	l.Log(keyvals...)
	l.printStackIfCustomWriter(err)
}

// private

func (l *logger) canError() bool {
	return l != nil
}

type keyvaluer interface {
	KeyVals() []interface{}
}

type unwrapper interface {
	Unwrap() error
}

func appendErrKeyvals(err error, keyvals []interface{}) []interface{} {
	for err != nil {
		if kver, ok := err.(keyvaluer); ok {
			keyvals = append(kver.KeyVals(), keyvals...)
		}

		if unw, ok := err.(unwrapper); ok {
			err = unw.Unwrap()
			continue
		}

		err = nil
	}

	return keyvals
}

func (l *logger) printStackIfCustomWriter(err error) {
	if w, ok := l.w.(*writer); ok {
		w.PrintStack(err)
	}
}

func logToStdout(keyvals ...interface{}) error {
	n := (len(keyvals) + 1) / 2 // +1 to handle case when len is odd
	m := make(map[string]interface{}, n)
	for i := 0; i < len(keyvals); i += 2 {
		k := keyvals[i]
		var v interface{} = "ErrMissingValue"
		if i+1 < len(keyvals) {
			v = keyvals[i+1]
		}
		mergeKeyval(m, k, v)
	}
	return json.NewEncoder(os.Stdout).Encode(m)
}

func mergeKeyval(dst map[string]interface{}, k, v interface{}) {
	var key string
	switch x := k.(type) {
	case string:
		key = x
	case fmt.Stringer:
		key = x.String()
	default:
		key = fmt.Sprint(x)
	}

	dst[key] = v
}
