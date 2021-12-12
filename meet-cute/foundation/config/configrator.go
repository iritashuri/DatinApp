package config

import (
	"fmt"
	"strings"

	"github.com/RevitalS/someone-to-run-with-app/backend/foundation/nextsql"
)

const (
	sqlConfigFilePath = "/sql.json"
)

type Configurator struct {
	ConfigFolder string
}

func NewConfigurator(configFolder string) *Configurator {
	return &Configurator{configFolder}
}

func (c *Configurator) LoadJSON(filename string, out interface{}) {
	filename = strings.TrimPrefix(filename, "/")
	path := c.ConfigFolder + "/" + filename

	err := LoadJson(path, out)
	if err != nil {
		panic(fmt.Errorf("error loading json config file %q", path))
	}
}

func (c *Configurator) SQLConfig() nextsql.Config {
	var dbConfig nextsql.Config
	path := c.ConfigFolder + sqlConfigFilePath
	err := LoadJson(path, &dbConfig)

	if err != nil {
		panic(fmt.Sprintf("Can't Fetch DB config: %s", err))
	}
	return dbConfig
}
