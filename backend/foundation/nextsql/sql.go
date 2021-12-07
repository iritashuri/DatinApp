package nextsql

import (
	"context"
	"database/sql"
	"fmt"
	"reflect"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

const (
	DefaultMaxOpenConns = 60
	defaultTimeout      = 20 * time.Second
)

type DB interface {
	Query(ctx context.Context, q string, args ...interface{}) ([]map[string]interface{}, error)
	StructQuery(ctx context.Context, types interface{}, q string, args ...interface{}) ([]interface{}, error)
	IsExists(ctx context.Context, q string, args ...interface{}) (bool, error)
	Exec(ctx context.Context, q string, args ...interface{}) (int64, error)
}

type Logger interface {
	Debug(msg string, keyvals ...interface{})
}

type Config struct {
	Adapter  string `json:"adapter"`
	Host     string `json:"host"`
	Port     int    `json:"port"`
	Database string `json:"database"`
	Username string `json:"username"`
	Password string `json:"password"`
}

func (c Config) ConnectionString() string {
	return fmt.Sprintf("%s:%s@tcp(%s:%d)/%s?parseTime=true", c.Username, c.Password, c.Host, c.Port, c.Database)
}

type db struct {
	db *sql.DB
}

func NewDB(c Config, logger Logger) (DB, error) {
	sqlDB, err := sql.Open(c.Adapter, c.ConnectionString())
	if err != nil {
		return nil, fmt.Errorf("error opening a connection to mysql server: %s", err)
	}

	if err := sqlDB.Ping(); err != nil {
		return nil, fmt.Errorf("error pinging db: %s", err)
	}

	sqlDB.SetMaxOpenConns(DefaultMaxOpenConns)

	d := &db{
		db: sqlDB,
	}

	return WithLogger(d, logger), nil
}

func (d *db) Query(ctx context.Context, query string, args ...interface{}) ([]map[string]interface{}, error) {
	ctx, _ = context.WithTimeout(ctx, defaultTimeout)
	rows, err := d.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("sql.StructQueryContext failed: %w", err)
	}
	defer func() {
		err := rows.Close()
		_ = err
	}()

	results := make([]map[string]interface{}, 0)

	cols, _ := rows.Columns()

	for rows.Next() {
		r, err := d.parseRow(rows, cols)
		if err != nil {
			continue
		}
		results = append(results, r)
	}

	return results, nil
}

func (d *db) StructQuery(ctx context.Context, types interface{}, q string, args ...interface{}) ([]interface{}, error) {
	ctx, _ = context.WithTimeout(ctx, defaultTimeout)
	rows, err := d.db.QueryContext(ctx, q, args...)
	if err != nil {
		return nil, fmt.Errorf("sql.StructQueryContext failed: %s", err)
	}
	defer rows.Close()

	reflectedTypes := reflect.ValueOf(types).Type()
	if reflectedTypes.Kind() != reflect.Struct {
		return nil, fmt.Errorf("types object should be a struct")
	}

	fieldsMap, err := fieldsMapBySQLTag(reflectedTypes)
	if err != nil {
		return nil, err
	}

	cols, err := rows.Columns()
	if err != nil {
		return nil, fmt.Errorf("error getting colums from rows: %s", err)
	}
	err = validateExpectedColumnsWithResultColumns(cols, fieldsMap)
	if err != nil {
		return nil, err
	}

	var results []interface{}
	for rows.Next() {
		pointers := make([]interface{}, len(cols))
		for i := range pointers {
			ptrToNewValueOfSameType := reflect.New(fieldsMap[cols[i]].Type)
			pointers[i] = ptrToNewValueOfSameType.Interface()
		}

		err := rows.Scan(pointers...)
		if err != nil {
			return nil, fmt.Errorf("error scanning row: %w", err)
		}

		r := reflect.New(reflectedTypes).Elem()
		for i, col := range cols {
			dereferencedValue := reflect.ValueOf(pointers[i]).Elem()
			r.FieldByName(fieldsMap[col].Name).Set(dereferencedValue)
		}
		results = append(results, r.Interface())
	}
	return results, nil
}

func (d *db) IsExists(ctx context.Context, query string, args ...interface{}) (bool, error) {
	var exists bool
	q := fmt.Sprintf("SELECT exists (%s)", query)
	ctx, _ = context.WithTimeout(ctx, defaultTimeout)
	err := d.db.QueryRowContext(ctx, q, args...).Scan(&exists)
	if err != nil && err != sql.ErrNoRows {
		return false, fmt.Errorf("sql.IsExistsContext failed: %s", err)
	}

	return exists, nil
}

func (d *db) Exec(ctx context.Context, query string, args ...interface{}) (int64, error) {
	ctx, _ = context.WithTimeout(ctx, defaultTimeout)
	result, err := d.db.ExecContext(ctx, query, args...)
	if err != nil {
		return -1, fmt.Errorf("sql.ExecContext failed: %s", err)
	}

	num, err := result.LastInsertId()
	if num == 0 && err == nil {
		// not an insert, get rows affected instead
		num, err = result.RowsAffected()
	}

	return num, err
}

func (d *db) parseRow(rows *sql.Rows, cols []string) (map[string]interface{}, error) {
	pointers := make([]interface{}, len(cols))
	container := make([]interface{}, len(cols))
	for i, _ := range cols {
		pointers[i] = &container[i]
	}

	err := rows.Scan(pointers...)
	if err != nil {
		return nil, err
	}

	r := make(map[string]interface{})
	for i, col := range cols {
		r[col] = container[i]
	}
	return r, nil
}

func fieldsMapBySQLTag(reflectType reflect.Type) (map[string]reflect.StructField, error) {
	fieldsBySQLTag := make(map[string]reflect.StructField, reflectType.NumField())
	for i := 0; i < reflectType.NumField(); i++ {
		field := reflectType.Field(i)
		colName, ok := field.Tag.Lookup("sql")
		if !ok || colName == "" {
			return nil, fmt.Errorf("field %s in types object doesn't have a `sql` tag", field.Name)
		}
		fieldsBySQLTag[colName] = field
	}
	return fieldsBySQLTag, nil
}

func validateExpectedColumnsWithResultColumns(resultColumns []string, expectedColumns map[string]reflect.StructField) error {
	for _, col := range resultColumns {
		if _, ok := expectedColumns[col]; !ok {
			return fmt.Errorf("the column `%s` exists in the sql result, but it is not defined in the types object", col)
		}
	}
	for typeName := range expectedColumns {
		var ok bool
		for _, col := range resultColumns {
			if typeName == col {
				ok = true
				break
			}
		}
		if !ok {
			return fmt.Errorf("the types object defines a field `%s`, but it doesn't exist in the sql result", typeName)
		}
	}
	return nil
}
