package main

import (
	"UpdateDB/models"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"sync"
	"time"

	"github.com/gocolly/colly"
)

type config struct {
	workingDir   string
	logFileName  string
	dataFileName string
	// port int
	// env  string
	// db   struct {
	// 	dsn string
	// }
}

type Application struct {
	pages struct {
		genre int
	}
	config    config
	logger    *log.Logger
	collector *colly.Collector
	mangaData models.BrowseManga
	mangas    chan models.Manga
	moreInfo  sync.Map
}

func main() {
	currentTime := time.Now().Format("2006_01_02_15_04_05")
	var cfg config
	flag.StringVar(&cfg.logFileName, "logfile", "/UpdateDB-"+currentTime+".log", "Log File Name")
	flag.StringVar(&cfg.dataFileName, "datafile", "/MangaInfo-"+currentTime+".json", "Data File Name")
	// flag.StringVar(&cfg.env, "env", "development", "Application environment (Development|Production)")
	// flag.StringVar(&cfg.db.dsn, "dsn", "postgres://postgres:postgres@localhost/go_movies?sslmode=disable", "Database connection string")
	flag.Parse()

	path, err := os.Getwd()
	if err != nil {
		panic(err)
	}

	cfg.workingDir = path
	collector := colly.NewCollector(colly.Async(true))

	app := &Application{
		config: cfg,
		// logger:    logger,
		collector: collector,
	}

	fmt.Println(app.config.logFileName)
	f, err := os.OpenFile(app.config.workingDir+"/logs/"+app.config.logFileName, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer f.Close()

	fileWriter := io.MultiWriter(os.Stdout, f)
	logger := log.New(fileWriter, "", log.Ldate|log.Ltime)

	app.logger = logger

	app.updateLibrary()
}
