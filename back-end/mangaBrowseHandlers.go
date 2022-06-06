package main

import (
	"MangaCatalogue/models"
	"errors"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/gocolly/colly"
	"github.com/julienschmidt/httprouter"
)

func (app *Application) updateLibrary(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: Crawl MangaNato")
	app.mangas = make(chan models.Manga)
	app.moreInfo = make(map[string]models.Manga)
	// app.mangaInfo = make(sync.Map)

	startTime := time.Now()
	var wg1, wg2, wg3 sync.WaitGroup
	go app.crawlManganato(&wg1)
	go app.CollectMangaInfo(&wg2)
	wg1.Add(1)
	wg2.Add(1)
	wg1.Wait()
	wg2.Wait()

	fmt.Println("Time taken for Web Crawling:", time.Since(startTime))

	mergeTime := time.Now()
	wg3.Add(1)
	go app.GetMoreInfo(&wg3)
	wg3.Wait()
	fmt.Println("Time taken for merging data:", time.Since(mergeTime))

	err := app.writeJson(w, http.StatusOK, app.mangaData, "")
	// err := app.writeJson(w, http.StatusOK, app.moreInfo, "manga")
	if err != nil {
		app.errorJson(w, err)
		return
	}

}

func (app *Application) browseManga(w http.ResponseWriter, r *http.Request) {
	fmt.Println("Endpoint Hit: browseManga")
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
		app.errorJson(w, err)
		return
	}

	browseResponse := models.BrowseManga{Mangas: []models.Manga{}, CurrentPage: id}

	app.collector.OnHTML(".content-genres-item", func(element *colly.HTMLElement) {
		// return list of manga
		manga := models.Manga{}
		manga.URL = element.ChildAttr("a", "href")
		manga.ImageURL = element.ChildAttr("img", "src")
		manga.Name = element.DOM.Children().Find("h3").Children().Text()
		manga.Author = strings.Split(element.DOM.Find(".genres-item-author").Text(), ",")
		manga.ReleaseDate = element.DOM.Find(".genres-item-time").Text()
		rating, err := strconv.ParseFloat(element.DOM.Find(".genres-item-rate").Text(), 32)
		if err != nil {
			app.logger.Print("Cannot parse rating: ", err)
		} else {
			manga.Rating = float32(rating)
		}

		chaps := strings.Split(element.DOM.Find(".genres-item-chap").Text(), " ")[1]
		// findStr := "Chapter"
		// start := strings.Index(chaps, findStr)
		// end := strings.Index(chaps, ":")
		// if start == -1 || end == -1 {
		// 	chaps = chaps[start+len(findStr):]
		// } else {
		// 	chaps = chaps[start+len(findStr) : end]
		// }
		if chaps[len(chaps)-1] == ':' {
			chaps = chaps[:len(chaps)-1]
		}
		totalChaps, err := strconv.ParseFloat(chaps, 32)
		// totalChaps, err := strconv.ParseFloat(strings.Split(element.DOM.Find(".genres-item-chap").Text(), " ")[1], 32)
		if err != nil {
			app.logger.Print("Cannot parse total chapters: ", err)
		} else {
			manga.ChapterNum = float32(totalChaps)
		}

		// release_date, err := strconv.Atoi(element.DOM.Find(".genres-item-time").Text())
		// if err != nil {
		// 	app.logger.Print("Cannot parse release date", err)
		// } else {
		// 	manga.ReleaseDate = time.Unix(int64(release_date), 0)
		// }

		app.collector.Visit(manga.URL)

		browseResponse.Mangas = append(browseResponse.Mangas, manga)
	})

	// app.collector.OnHTML(".panel-story-info", func(element *colly.HTMLElement) {
	// 	moreInfo := models.Manga{}
	// 	title := element.DOM.Find(".story-info-right > h1")
	// moreInfo.Name = title.Text()
	// fmt.Println(moreInfo.Name)
	// rightInfo := element.DOM.Children()
	// })

	// app.collector.OnHTML(".table-value > .a-h", func(h *colly.HTMLElement) {
	// manga.Genre = append(manga.Genre, element.Text)
	// app.moreInfo
	// })

	app.collector.OnHTML(".group-page", func(element *colly.HTMLElement) {
		last := element.DOM.Children().Last().Text()
		num, err := strconv.Atoi(last[5 : len(last)-1])
		if err != nil {
			fmt.Println(err)
		}
		browseResponse.LastPage = num
	})

	if id == 0 {
		app.collector.Visit("https://manganato.com/genre-all")
	} else {
		app.collector.Visit("https://manganato.com/genre-all/" + strconv.Itoa(id))
	}

	app.collector.Wait()

	// browseResponse.Mangas = app.fetchRemainingInfo(browseResponse)

	err = app.writeJson(w, http.StatusOK, browseResponse, "manga")
	if err != nil {
		app.errorJson(w, err)
		return
	}
}

func (app *Application) browseByGenre(w http.ResponseWriter, r *http.Request) {
}

func (app *Application) fetchRemainingInfo(browseResponse models.BrowseManga) []models.Manga {
	res := make([]models.Manga, 0)
	// for _, manga := range browseResponse.Mangas {
	for i := 0; i < len(browseResponse.Mangas); i++ {
		app.collector.Visit(browseResponse.Mangas[i].URL)
		app.collector.OnHTML(".table-value > .a-h", func(h *colly.HTMLElement) {
			info := browseResponse.Mangas[i]
			info.Genre = append(info.Genre, h.Text)
			browseResponse.Mangas[i] = info
		})
		app.collector.Wait()
		// app.collector.OnHTML(".panel-story-info-description", func(h *colly.HTMLElement) {
		// 	info := browseResponse.Mangas[i]
		// 	info.Synopsis = h.Text
		// 	browseResponse.Mangas[i] = info
		// })
		// res = append(res, info)
	}

	fmt.Println(res)
	return res
}
