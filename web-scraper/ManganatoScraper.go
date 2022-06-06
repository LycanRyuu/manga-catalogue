package main

import (
	"UpdateDB/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"sync"
	"time"
)

func (app *Application) updateLibrary() {
	fmt.Println("Endpoint Hit: Crawl MangaNato")
	app.mangas = make(chan models.Manga)
	// app.moreInfo = make(map[string]models.Manga)
	// app.mangaInfo = make(sync.Map)

	startTime := time.Now()
	var wg1, wg2, wg3 sync.WaitGroup
	go app.crawlManganato(&wg1)
	go app.CollectMangaInfo(&wg2)
	wg1.Add(1)
	wg2.Add(1)

	app.logger.Println("Web crawling started")

	wg1.Wait()
	wg2.Wait()

	app.logger.Println("Web crawling completed")
	app.logger.Println("Time taken for Web Crawling:", time.Since(startTime))

	mergeTime := time.Now()
	wg3.Add(1)
	go app.GetMoreInfo(&wg3)
	wg3.Wait()
	app.logger.Println("Time taken for merging data:", time.Since(mergeTime))

	// err := app.writeJson(w, http.StatusOK, app.mangaData, "")
	// // err := app.writeJson(w, http.StatusOK, app.moreInfo, "manga")
	// if err != nil {
	// 	app.errorJson(w, err)
	// 	return
	// }

	app.logger.Println("Saving data to file")
	writingStarted := time.Now()
	file, _ := json.MarshalIndent(app.mangaData, "", "")
	err := ioutil.WriteFile(app.config.workingDir+"/data/"+app.config.dataFileName, file, 0644)
	if err != nil {
		app.logger.Println("Error saving data to file:", err)
	}
	app.logger.Println("Data Saved to file")
	app.logger.Println("Time taken for writing data to file:", time.Since(writingStarted))
}
