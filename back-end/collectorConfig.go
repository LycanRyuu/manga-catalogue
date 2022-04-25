package main

import (
	"fmt"
	"strconv"

	"github.com/gocolly/colly"
)

func (app *Application) SetupCollector() error {

	collector := colly.NewCollector(colly.Async(true))

	// collector.OnHTML(".content-genres-item", func(element *colly.HTMLElement) {
	// 	app.mangaLinks = append(app.mangaLinks, element.ChildAttr("a", "href"))
	// })

	collector.OnHTML(".group-page", func(element *colly.HTMLElement) {
		last := element.DOM.Children().Last().Text()
		fmt.Println(last)
		num, err := strconv.Atoi(last[5 : len(last)-1])
		if err != nil {
			fmt.Println(err)
		}
		app.pages.genre = num
	})

	// for i := 0; i < 1305; i++ {
	// 	if i == 0 {
	// 		collector.Visit("https://manganato.com/genre-all")
	// 	} else {
	// 		collector.Visit("https://manganato.com/genre-all/" + strconv.Itoa(i))
	// 	}
	// }

	collector.Visit("https://manganato.com/genre-all")

	collector.Wait()
	return nil
}
