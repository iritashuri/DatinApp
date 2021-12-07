# package log
`package log` provides an interface for structured logging in the mmservices ecosystem. \
For using this package all you need is a config and some output source


## Table of contents
* [Structured vs unstructured logging](#structured-logging)
* [Usage](#usage)
  * [Exmaple of use](#exmaple-of-use)
  * [Keyvals ...interface{}](#keyvals-interface)
  * [Fixed Fields](#fixed-fields)
  * [Function value](#func-as-value)
* [Config](#config)
  * [Config json](#config)
  * [Levels](#levels)
  * [logfmt vs json](#logfmt-vs-json)
* [Good Practices](#good-practices)

***
## Structured logging

A structured log message is not only a simple plain text message for a human to read, but a collection of key-values attributes which can be processed and analysed.

```golang
// Unstructred
log.Printf("Didn't find user with id: %s, err: %s", user.id, err)
// output
// "Didn't find user with id: 3241, err: no table named users"

// Structured
logger.Log("msg", "Didn't find user", "userID", user.id, "err", err)
// output
// msg="Didn't find user", userID=3241, err="no table named users"
```
Treating logs as data gives us greater insight into the operational activity of the systems we build
***
## Usage
The foundation package `log` main use case is to provide a logger of an interface Logger:
```golang
type Logger interface {
    Debug(msg string, keyvals ...interface{})
    Info(msg string, keyvals ...interface{})
    Warn(msg string, keyvals ...interface{})
    Error(msg string, keyvals ...interface{})
}
``` 
Exmaple of use
```golang
import "github.com/FTBpro/mmservices/foundation/log"

func main() {
    loggerConfig := log.Config{
        Level: "debug",
        Tenant: "dev",
    }

    logger := log.NewLogger(loggerConfig, os.Stdout)
    logger.Debug("Some Debug Msg",
      "firstKey": "firstValue",
      "secondKey": "secondValue",
      "num": 32,
    )
}

// output
// level=debug time=2018-12-06T12:35:53.371938Z tenant=dev msg="Some Debug Msg" "firstKey"="firstValue" "secondKey"="secondValue" "num"=32
```
***
### `keyvals ...interface{}`
Since we strongly believe in **_structured logging_**, the _keyvals_ argument should be an even number values. \
If there is a value missing, the logger will add `MISSING VALUE!`. \
\
While this may seem like a strange behaviour (to enforce the user to send an even number of parameters), we hope this will become a fundamental known thing, and the readability of the code will outweigh the temporary confusion. \
\
For example, using a structured argument may look like this:
```golang
logger.Debug("Something went wrong", map[string]interface{}{
    "id": "someID",
    "location": "someLocation",
    "errCount": 164,
}
```
Or with a typed structure (like in logrus):
```golang
// package log

type Fields map[string]interface{}


// package main

import "path/to/log"

logger.Debug("Something went wrong", log.Fields{
    "id": "someID",
    "location": "someLocation",
    "errCount": 164,
```
it makes the code less readably, and in the later case forces the consumer to import the log package on every logging. \
This is an extra detail, which may be unnecessary since the call without the structured data will look like this:,
```golang
logger.Debug("Something went wrong",
    "id": "someID",
    "location": "someLocation",
    "errCount": 164,
```
Which is basically the same code, but without the 'dirty' part.
### Fixed Fields
The `NewLogger` method also receives keyvals argument:
```golang
func NewLogger(c Config, out io.Writer, keyvals ...interface{}) Logger
```
This args will be logged on every call to the logger, meaning that one can init the logger and pass it around, and be sure that its data will be logged as well.\
\
Also there is another package function to create a logger:
```golang
func With(l Logger, keyvals ...interface{}) Logger
```
This function returns a **new** logger from an existing onw, which will have these keyvals as fixed fields, plus all the fields the previous logger has.\
This function doesn't change the logger which is passed as argument.
 
Example, how to use this method:

```golang
import "github.com/FTBpro/mmservices/foundation/log"

func main() {
    loggerConfig := log.Config{
        Level: "debug",
        Tenant: "dev",
    }

    logger := log.NewLogger(loggerConfig, os.Stdout)

    // sql
    sqlLogger := log.With(logger, "name", "sql")
    sqlDB := sql.NewWithLogger(sqlConfig, sqlLogger)

    // mongo
    mongoLogger := log.With(logger, "name", "mongo")
    mongoDB := mongo.NewWithLogger(mongoConfig, sqlLogger)

    // other setup
    ...
}


// package foundation/sql

logger.Debug("New Query",
    "query", "select * from ... ",
    "args", args,
)


// package mongo

logger.Debug("InsertOne",
    "collection", "some-collection",
    "document", document,
)

// Output
// name=sql level=debug time=2018-12-06T12:35:53.371938Z tenant=dev msg="New Query" query="select * from ... " args=map("userID": 123)"
// name=mongo level=debug time=2018-12-06T12:35:53.370107Z tenant=dev msg=InsertOne collection=some-collection document=(the document)
```
Note that the sql package didn't add the name parameter which appears in the output as `name=sql` \
and that the mongo package didn't add the name parameter which appears in the output as `name=mongo` 

### func as value
There is a support to pass a function as a valuer to the logger.\
To achieve this, pass a `Valuer` as the value
```golang
type Valuer func() interface{}
```

For example:
```golang
import "github.com/FTBpro/mmservices/foundation/log"

var logsCount = 0

func countLogs() interface{} {
	logsCount++
	return logsCount
}

func main() {
    logger := log.NewLogger(loggerConfig, os.Stdout)
    logger = log.With(logger,
        "logCount", log.Value(countLogs),
    }

    logger.Debug("counting")
    logger.Debug("counting")
    logger.Debug("counting")
}

// output
name=sql level=debug time=2018-12-08T15:41:32.201326Z msg=counting logCount=1
name=sql level=debug time=2018-12-08T15:41:32.201326Z msg=counting logCount=2
name=sql level=debug time=2018-12-08T15:41:32.201326Z msg=counting logCount=3
```
***
## Config
For creating a new logger need to provide a config of type log.Config:
```golang
type Config struct {
    Level       string
    Tenant      string
}
```

The `log package` will add default key values:
- tenant=_tenant as specified in the config_
- serviceName=_service name as specified in the config_
- time=_current time in `RFC3339Nano` format_ **(TODO: discuss)**
- level="debug"/"info"/"error"/"warn"
***
### Levels
The 'log package` provides 4 log levels methods as stated before:
```
Debug(...)
Info(...)
Error(...)
Warn(...)
````

The level parameter in the config can have the following values:\
`debug`, `info`, `error`
The level parameter in the config enables messages as follows:\
- debug level - enables all (debug/info/error/warn messages)
- info level - enables info/error/warn messages (disables only warn messages)
- error level - enables error/warn messages (disables only warn messages)
conventions

### logfmt vs json
When logging to terminal the output is in logfmt format 
```
level=debug time=2018-12-06T12:35:53.371938Z tenant=dev msg="Some Debug Msg" "firstKey"="firstValue" "secondKey"="secondValue" "num"=32
```
When logging to a file, the output is in json format 
```
{"level":"debug", "time":"2018-12-06T12:35:53.371938Z", "tenant":"dev", "msg":"Some Debug Msg" , "firstKey":"firstValue", "secondKey":"secondValue", "num"=32}
```
The logfmt is more convenient when looking at the terminal, and the json format is more convenient when logging in qa/production, it's easier to parse the logs in elastic-search

In addition, if the output is terminal, there is a custom writer which add colours, align and add some extra format. This writer will never be executed in production, since we always write to file

## Good Practices

### Using a decorator
if you need to add logs to your service, think if you can use a decorator.\
For example, we have this interface, and a service which implements it:
```golang
// package client
type Doer interface{
    Do(arg string) error
}

// package service
func (s *service) Do(arg string) error {
    //do stuff
    return err
}
```

Create a file named `logger.go` in the service package create a decorator for the logging
```golang
// package service

// Declare the Logger interface for not importing the foundation/log package
// (not mandatory, but good practice)
type Logger interface {
    Debug(msg string, keyvals ...interface{})
    Info(msg string, keyvals ...interface{})
    Warn(msg string, keyvals ...interface{})
    Error(msg string, keyvals ...interface{})
}

type logger struct {
    logger Logger
    next Doer
}

func WithLogger(l Logger, next Doer) *logger {
    return &logger{
        logger: l,
        next: next,
    }
}

func (l *logger) Do(arg string) error {
    l.Logger.Debug("do",
        "arg", arg,
    )
    
    if err := l.next.Do(arg); err != nil {
        l.Logger.Error("do failed",
            "err": err,
        )
        return err
    )

    l.Logger.Debug("do finish")
    return nil
}
```

***
