package config

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

func LoadJson(path string, out interface{}) error {
	var conf []byte
	var err error
	if conf, err = ioutil.ReadFile(path); err != nil {
		return fmt.Errorf("error reading configuration file: %s", err)
	}

	if err = json.Unmarshal(conf, out); err != nil {
		return fmt.Errorf("error parsing configuration file: %s", err)
	}
	return nil
}
