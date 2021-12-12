# Foundation SQL

## TypedQueryContext 

TypedQueryContext is a method for specifying the exact type you expect a column to be parsed into. 
It uses a `map[string]interface{}` as the template.  

### Example

Assume we have the following test table

```mysql
CREATE TABLE `test` (
  `num` int(11) unsigned
)
```

There are many go types that can be used to parse these SQL types.
For example, `num` can be parsed into `int`, `uint`, `uint64`, `[]byte` and even `bool` if it makes sense for your app.
However, the standard `QueryContext()` method will (probably) just use `int`. In order to guarantee it will be parsed as,
for example, a `uint64`, we can use `TypedQueryContext()` in the following way   

```go
q := "select num from test"
types := map[string]interface{}{
  "num":  uint64(0),
}
res, err := db.TypedQueryContext(ctx, types, q)
// error handling
num := res[0]["num"].(uint64)
```

Notice that if there was no error from `TypedQueryContext()`, 
the values in `res` will always be of the same type as requested.

## StructQueryContext

`StructQueryContext` is similar to `TypedQueryContext`, but it uses a `struct` with `sql:"<columnName>"` tags instead of a `map[string]interface`.

### Example 

Assume we have the same test table

```mysql
CREATE TABLE `test` (
  `num` int(11) unsigned
)
```

We use the following:

```go
type numRow struct {
  Number uint64 `sql:"num"`
}

q := "select num from test"
res, err := db.StructQueryContext(ctx, numRow{}, q)
// error handling
num := res[0].(numRow).Number
```

## Valid types for TypedQueryContext and StructQueryContext

The Valid types are similar to what is passed to `database/sql.(*Rows).Scan()` (https://golang.org/pkg/database/sql/#Rows.Scan).
However, don't pass the values as pointers because the pointers are created by `foundation/sql`. Specifically, if you
implement the `sql.Scanner` interface on a struct, implement it as a pointer receiver but don't pass the struct as a
pointer, just pass it as it is. Let's look at `database/sql.NullInt64` (https://golang.org/pkg/database/sql/#NullInt64):

```go
package sql
// NullInt64 represents an int64 that may be null.
// NullInt64 implements the Scanner interface so
// it can be used as a scan destination, similar to NullString.
type NullInt64 struct {
	Int64 int64
	Valid bool // Valid is true if Int64 is not NULL
}

// Scan implements the Scanner interface.
func (n *NullInt64) Scan(value interface{}) error {
	if value == nil {
		n.Int64, n.Valid = 0, false
		return nil
	}
	n.Valid = true
	return convertAssign(&n.Int64, value)
}
``` 

As you can see, the `Scan()` method is implemented on `*NullInt64`.
However, you should use it without the pointer when using `TypedQueryContext()`:

```go
q := "select num from test"
types := map[string]interface{}{
  "num":  sql.NullInt64,
}
res, err := db.TypedQueryContext(ctx, types, q)
// error handling
num := res["num"].(sql.NullInt64)
```

