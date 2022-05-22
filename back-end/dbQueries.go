package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func (app *Application) openDB() {
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		app.logger.Fatal(err)
	}

	app.dbCon = client.Database("MangaCatalogue")
	app.mangaCollection = app.dbCon.Collection("Manga")
}

func (app *Application) getAllManga() {
	cursor, err := app.mangaCollection.Find(context.TODO(), bson.D{})
	if err != nil {
		panic(err)
	}

	// convert the cursor result to bson
	var results []bson.M
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}

	// display the documents retrieved
	fmt.Println("displaying all results in a collection")
	for _, result := range results {
		fmt.Println(result)
	}
}
