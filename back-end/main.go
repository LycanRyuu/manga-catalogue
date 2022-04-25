package main

import "fmt"

var app Application

func main() {
	err := app.SetupCollector()
	if err != nil {
		panic(err)
	}

	fmt.Println(app)
}
