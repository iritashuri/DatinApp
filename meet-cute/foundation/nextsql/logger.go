package nextsql

import (
	"context"
	"fmt"
)

type logger struct {
	logger Logger
	next   DB
}

func WithLogger(next DB, l Logger) DB {
	return &logger{
		logger: l,
		next:   next,
	}
}

func (l *logger) Query(ctx context.Context, query string, args ...interface{}) ([]map[string]interface{}, error) {
	argsF := fmt.Sprintf("%v", args)
	l.logger.Debug("Query", "query", query, "args", argsF)
	return l.next.Query(ctx, query, args...)
}

func (l *logger) StructQuery(ctx context.Context, types interface{}, q string, args ...interface{}) ([]interface{}, error) {
	argsF := fmt.Sprintf("%v", args)
	l.logger.Debug("StructQuery", "types", types, "query", q, "args", argsF)
	return l.next.StructQuery(ctx, types, q, args...)
}

func (l *logger) IsExists(ctx context.Context, q string, args ...interface{}) (bool, error) {
	argsF := fmt.Sprintf("%s", args)
	l.logger.Debug("IsExist", "query", q, "args", argsF)
	return l.next.IsExists(ctx, q, args...)
}

func (l *logger) Exec(ctx context.Context, q string, args ...interface{}) (int64, error) {
	argsF := fmt.Sprintf("%s", args)
	l.logger.Debug("Exec", "query", q, "args", argsF)
	return l.next.Exec(ctx, q, args...)
}
