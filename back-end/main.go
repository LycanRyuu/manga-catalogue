package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gocolly/colly"
	"go.mongodb.org/mongo-driver/mongo"
)

type config struct {
	port int
	env  string
	db   struct {
		dsn string
	}
}

type Application struct {
	pages struct {
		genre int
	}
	// dbCon     *sql.DB
	dbCon           *mongo.Database
	mangaCollection *mongo.Collection
	config          config
	logger          *log.Logger
	collector       *colly.Collector
}

func main() {
	var cfg config
	flag.IntVar(&cfg.port, "port", 10000, "Server port to listen on")
	flag.StringVar(&cfg.env, "env", "development", "Application environment (Development|Production)")
	// flag.StringVar(&cfg.db.dsn, "dsn", "postgres://postgres:postgres@localhost/go_movies?sslmode=disable", "Database connection string")
	flag.Parse()

	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	collector := colly.NewCollector(colly.Async(true))

	app := &Application{
		config:    cfg,
		logger:    logger,
		collector: collector,
		// dbCon:     db,
	}

	// db, err := openDB(cfg)
	// if err != nil {
	// 	logger.Fatal(err)
	// }
	// defer db.Close()

	app.openDB()
	defer app.dbCon.Client().Disconnect(context.TODO())

	logger.Println("Starting server on port", cfg.port)

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.port),
		Handler:      app.routes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	err := srv.ListenAndServe()
	if err != nil {
		log.Println(err)
	}
}
