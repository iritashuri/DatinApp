package nextlog

import (
	"os"
	"testing"

	"github.com/stretchr/testify/require"
)

type loggerMock struct {
	kv        []interface{}
	wasCalled bool
}

func (l *loggerMock) Log(kv ...interface{}) error {
	l.kv = kv
	l.wasCalled = true
	return nil
}

func (l *loggerMock) Reset() {
	l.kv = []interface{}{}
	l.wasCalled = false
}

func TestNewLogger(t *testing.T) {
	level := "debug"
	tenant := "some-tenant"

	c := Config{
		Level:  level,
		Tenant: tenant,
	}

	out := os.Stdout
	kv := []interface{}{
		"firstKey", "firstValue",
	}

	l := NewLogger(c, out, kv...)
	mmLogger, ok := l.(*logger)
	require.True(t, ok, "expected 'NewLogger' to return 'logger'")
	require.Equal(t, level, mmLogger.level)
	require.Equal(t, out, mmLogger.w)

	mock := loggerMock{}
	mmLogger.kitLogger = &mock
	mmLogger.Debug("some msg",
		"firstKey", "first value",
	)

	expectedKV := []interface{}{
		"level", "debug",
		"msg", "some msg",
		"firstKey", "first value",
	}

	require.True(t, mock.wasCalled)
	require.Equal(t, expectedKV, mock.kv)

	mock.Reset()
	mmLogger.level = "info"

	mmLogger.Debug("some msg",
		"key", "value",
		"key2", "value2",
		)
	require.False(t, mock.wasCalled)
}
