package main

import (
	"encoding/json"
	"net/http"
)

func (app *Application) writeJson(w http.ResponseWriter, status int, data interface{}, wrap string) error {
	var js []byte
	var err error
	if wrap != "" {
		wrapper := make(map[string]interface{})
		wrapper[wrap] = data
		js, err = json.Marshal(wrapper)
		if err != nil {
			return err
		}
	} else {
		wrapper := data
		js, err = json.Marshal(wrapper)
		if err != nil {
			return err
		}
	}

	// js, err := json.Marshal(wrapper)
	// if err != nil {
	// 	return err
	// }

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(js)

	return nil
}

func (app *Application) errorJson(w http.ResponseWriter, err error) {
	type jsonError struct {
		Message string `json:"message"`
	}

	theError := jsonError{
		Message: err.Error(),
	}

	app.writeJson(w, http.StatusBadRequest, theError, "error")
}
