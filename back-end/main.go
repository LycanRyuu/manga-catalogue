package main

import (
	"context"
	"database/sql"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gocolly/colly"
	_ "github.com/lib/pq"
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
	dbCon     *sql.DB
	config    config
	logger    *log.Logger
	collector *colly.Collector
}

// var app Application

func main() {
	var cfg config
	flag.IntVar(&cfg.port, "port", 10000, "Server port to listen on")
	flag.StringVar(&cfg.env, "env", "development", "Application environment (Development|Production)")
	flag.StringVar(&cfg.db.dsn, "dsn", "postgres://postgres:postgres@localhost/go_movies?sslmode=disable", "Database connection string")
	// postgres://username:password@url/database?sslmode=disable
	flag.Parse()

	logger := log.New(os.Stdout, "", log.Ldate|log.Ltime)

	// app:=Application{}

	db, err := openDB(cfg)
	if err != nil {
		logger.Fatal(err)
	}
	defer db.Close()

	collector := colly.NewCollector(colly.Async(true))

	app := &Application{
		config:    cfg,
		logger:    logger,
		dbCon:     db,
		collector: collector,
	}

	logger.Println("Starting server on port", cfg.port)

	srv := &http.Server{
		Addr:         fmt.Sprintf(":%d", cfg.port),
		Handler:      app.routes(),
		IdleTimeout:  time.Minute,
		ReadTimeout:  10 * time.Second,
		WriteTimeout: 30 * time.Second,
	}

	err = srv.ListenAndServe()
	if err != nil {
		log.Println(err)
	}
}

func openDB(cfg config) (*sql.DB, error) {
	db, err := sql.Open("postgres", cfg.db.dsn)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err = db.PingContext(ctx)
	if err != nil {
		return nil, err
	}

	return db, nil
}
