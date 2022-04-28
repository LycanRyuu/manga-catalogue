package main

import (
	"MangaCatalogue/models"
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gocolly/colly"
	"github.com/julienschmidt/httprouter"
)

func (app *Application) browseManga(w http.ResponseWriter, r *http.Request) {
	// err := app.SetupCollector()
	// if err != nil {
	// 	panic(err)
	// }
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
		manga := models.Manga{URL: element.ChildAttr("a", "href")}
		browseResponse.Mangas = append(browseResponse.Mangas, manga)
	})

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

	err = app.writeJson(w, http.StatusOK, browseResponse, "manga")
	if err != nil {
		app.errorJson(w, err)
		return
	}
}

func (app *Application) browseByGenre(w http.ResponseWriter, r *http.Request) {
}
