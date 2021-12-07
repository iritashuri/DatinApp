package nextlog

import (
	"io"
)

const (
	LoggerNameSQL         = "sql"
	LoggerNameMongo       = "mongo"
	LoggerNameLegacyMongo = "legacyMongo"
	LoggerNameWebClient   = "WebClient"
	LoggerNameTransport   = "transport"
	LoggerNameWebAccess   = "WebAccess"
	loggerNameAudit       = "audit"
)

type loggerator struct {
	level string
	out   io.Writer
}

func NewLoggerator(level string, out io.Writer) *loggerator {
	return &loggerator{
		level: level,
		out:   out,
	}
}

func (l *loggerator) SQLLogger() Logger         { return l.NewLogger(LoggerNameSQL) }
func (l *loggerator) MongoLogger() Logger       { return l.NewLogger(LoggerNameMongo) }
func (l *loggerator) LegacyMongoLogger() Logger { return l.NewLogger(LoggerNameLegacyMongo) }
func (l *loggerator) TransportLogger() Logger   { return l.NewLogger(LoggerNameTransport) }
func (l *loggerator) APILogger() Logger         { return l.NewLogger(LoggerNameWebAccess) }
func (l *loggerator) AuditLogger() Logger       { return l.NewLogger(loggerNameAudit) }

// private

var NameColors = map[string]string{
	LoggerNameSQL:         ColorBlueBG,
	LoggerNameMongo:       ColorGreenBG,
	LoggerNameWebClient:   ColorCyanBG,
	LoggerNameLegacyMongo: ColorGreenBG,
	LoggerNameTransport:   ColorWhiteBG,
	LoggerNameWebAccess:   ColorMagentaBG,
}

var APIMethodColors = map[string]string{
	"GET":     ColorPurple,
	"POST":    ColorCyan,
	"PUT":     ColorYellow,
	"PATCH":   ColorGreen,
	"DELETE":  ColorRed,
	"HEAD":    ColorMagenta,
	"OPTIONS": ColorWhite,
}
var APIStatusColors = map[string]string{
	"2..": ColorGreen,
	"3..": ColorPurple,
	"4..": ColorRed,
	"5..": ColorRedBG,
}

func (l *loggerator) NewLogger(name string) Logger {
	c := Config{
		Level: l.level,
	}

	logger := NewLogger(c, l.out,
		"name", name,
	)

	if color, ok := NameColors[name]; ok {
		logger.AddColor("name", name, color)
	}

	if name == LoggerNameWebAccess {
		AddAPIColors(logger)
	}

	return logger
}

func AddAPIColors(l Logger) {
	for method, color := range APIMethodColors {
		l.AddColor("verb", method, color)
	}

	for status, color := range APIStatusColors {
		l.AddColor("response", status, color)
	}
}
