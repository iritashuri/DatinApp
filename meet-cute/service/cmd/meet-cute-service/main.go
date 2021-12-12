package main

import (
	"datingApp/service/sql"
	"datingApp/service/usermanaging"
	"fmt"
	"net/http"
	"os"

	"github.com/RevitalS/someone-to-run-with-app/backend/foundation/config"
	"github.com/RevitalS/someone-to-run-with-app/backend/foundation/nextlog"
	"github.com/RevitalS/someone-to-run-with-app/backend/foundation/nextsql"

	userhttp "datingApp/service/http"
)

const (
	port = ":8080"
)

func main() {
	configurator := config.NewConfigurator("/Users/irit/GolandProjects/meetCute/DatingApp/backend/service/config/development")

	loggerator := nextlog.NewLoggerator("debug", os.Stdout)
	mainLogger := loggerator.NewLogger("main")

	// sql
	sqlConfig := configurator.SQLConfig()
	sqlLogger := loggerator.SQLLogger()
	sqlDB, err := nextsql.NewDB(sqlConfig, sqlLogger)
	if err != nil {
		mainLogger.Error(err, "failed to open db connection")
	}

	userRepo := sql.NewUserRepo(sqlDB)
	userService := usermanaging.NewService(userRepo)

	if err != nil {
		mainLogger.Error(err, "failed to insert some ducky")
	}

	// starting the http server
	router := userhttp.NewRouter()
	userhttp.AddUserRoutes(router, userService)
	userhttp.AddSignInRout(router, userService)

	mainLogger.Info(fmt.Sprintf("start server on port: %s. if development - http://localhost%s", port, port))
	if err := http.ListenAndServe(port, router); err != nil {
		mainLogger.Error(err, "failed http listening and serving")
	}
}
