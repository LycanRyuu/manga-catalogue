package main

import (
	"MangaCatalogue/models"
	"fmt"
	"strconv"
	"strings"
	"sync"

	"github.com/PuerkitoBio/goquery"
	"github.com/gocolly/colly"
)

func (app *Application) CollectMangaInfo(wg *sync.WaitGroup) {
	defer wg.Done()
	for data := range app.mangas {
		app.mangaData.Mangas = append(app.mangaData.Mangas, data)
	}
	// fmt.Println(app.mangaData)
}

// wait on channel to get details on all manga and adding to mangas channel
func (app *Application) GetMoreInfo(wg *sync.WaitGroup) {
	defer wg.Done()

	mangaData := app.mangaData.Mangas
	for i := 0; i < len(mangaData); i++ {
		title := app.mangaData.Mangas[i].Name
		// moreInfo := app.moreInfo[title]
		// app.mangaData.Mangas[i].Genre = moreInfo.Genre
		// app.mangaData.Mangas[i].Ongoing = moreInfo.Ongoing
		// app.mangaData.Mangas[i].AlternateName = moreInfo.AlternateName
		// app.mangaData.Mangas[i].LastUpdated = moreInfo.LastUpdated
		// app.mangaData.Mangas[i].Reads = moreInfo.Reads
		// app.mangaData.Mangas[i].Synopsis = moreInfo.Synopsis
		// app.mangaData.Mangas[i].ChapterNum = moreInfo.ChapterNum
		result, ok := app.mangaInfo.Load(title)
		if ok {
			app.mangaData.Mangas[i].Genre = result.(models.Manga).Genre
			app.mangaData.Mangas[i].Ongoing = result.(models.Manga).Ongoing
			app.mangaData.Mangas[i].AlternateName = result.(models.Manga).AlternateName
			app.mangaData.Mangas[i].LastUpdated = result.(models.Manga).LastUpdated
			app.mangaData.Mangas[i].Reads = result.(models.Manga).Reads
			app.mangaData.Mangas[i].Synopsis = result.(models.Manga).Synopsis
			app.mangaData.Mangas[i].ChapterNum = result.(models.Manga).ChapterNum
		}
	}
}

func (app *Application) crawlManganato(wg *sync.WaitGroup) {
	defer wg.Done()
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

		// chaps := strings.Split(element.DOM.Find(".genres-item-chap").Text(), " ")[1]

		// findStr := "Chapter"
		// start := strings.Index(chaps, findStr)
		// end := strings.Index(chaps, ":")
		// if start == -1 || end == -1 {
		// 	chaps = chaps[start+len(findStr):]
		// } else {
		// 	chaps = chaps[start+len(findStr) : end]
		// }

		// if chaps[len(chaps)-1] == ':' {
		// 	chaps = chaps[:len(chaps)-1]
		// }
		// totalChaps, err := strconv.ParseFloat(chaps, 32)
		// // totalChaps, err := strconv.ParseFloat(strings.Split(element.DOM.Find(".genres-item-chap").Text(), " ")[1], 32)
		// if err != nil {
		// 	app.logger.Print("Cannot parse total chapters: ", err)
		// } else {
		// 	manga.ChapterNum = float32(totalChaps)
		// }

		// release_date, err := strconv.Atoi(element.DOM.Find(".genres-item-time").Text())
		// if err != nil {
		// 	app.logger.Print("Cannot parse release date", err)
		// } else {
		// 	manga.ReleaseDate = time.Unix(int64(release_date), 0)
		// }

		app.collector.Visit(manga.URL)
		// manga.Genre = make([]string, 0)
		// app.collector.OnHTML(".table-value > .a-h", func(h *colly.HTMLElement) {
		// 	manga.Genre = append(manga.Genre, element.Text)
		// })

		// app.mangaData = append(app.mangaData, manga)
		app.mangas <- manga
	})

	app.collector.OnHTML(".group-page", func(element *colly.HTMLElement) {
		last := element.DOM.Children().Last().Text()
		num, err := strconv.Atoi(last[5 : len(last)-1])
		if err != nil {
			fmt.Println(err)
		}
		app.mangaData.LastPage = num
	})

	app.collector.OnHTML(".panel-story-info", func(element *colly.HTMLElement) {
		moreInfo := models.Manga{}
		title := element.DOM.Find(".story-info-right > h1")
		// moreInfo.Name = title.Text()
		tabulatedContent := element.DOM.Find(".story-info-right tr")

		previousLabel := ""
		tabulatedContent.Children().Each(func(i int, s *goquery.Selection) {
			// fmt.Printf("%d, Sibling text: %s\n", i, s.Text())
			if i%2 == 0 {
				previousLabel = strings.TrimSpace(s.Text())
			} else {
				switch strings.Split(previousLabel, " :")[0] {
				case "Alternative":
					moreInfo.AlternateName = strings.Split(s.Text(), " ; ")
				case "Genres":
					moreInfo.Genre = strings.Split(strings.ReplaceAll(s.Text(), "\n", ""), " - ")
				case "Status":
					if s.Text() == "Ongoing" {
						moreInfo.Ongoing = true
					} else {
						moreInfo.Ongoing = false
					}
				}
			}
		})

		storyInfo := element.DOM.Find(".story-info-right-extent p")
		storyInfo.Children().Each(func(i int, s *goquery.Selection) {
			// fmt.Printf("%d, Sibling text: %s\n", i, s.Text())
			if i%2 == 0 {
				previousLabel = strings.TrimSpace(s.Text())
			} else {
				switch strings.Split(previousLabel, " :")[0] {
				case "Updated":
					moreInfo.LastUpdated = strings.Split(s.Text(), " - ")[0]
				case "View":
					reads, err := strconv.Atoi(strings.ReplaceAll(s.Text(), ",", ""))
					if err != nil {
						app.logger.Print("Cannot parse views: ", err)
					}
					moreInfo.Reads = reads
				}
			}
		})

		synopsis := element.DOM.Find(".panel-story-info-description").Text()
		synopsis = strings.Split(synopsis, "\n")[2]
		synopsis = strings.TrimSpace(synopsis)
		moreInfo.Synopsis = synopsis

		// lastChapter := element.DOM.Siblings().Find(".panel-story-chapter-list li a").First()
		// fmt.Println(strings.Split(lastChapter.Text(), " "))

		// a := strings.Split(lastChapter.Text(), " ")
		// for i := 0; i < len(a); i++ {
		// 	if a[i] == "Chapter" {
		// 		f, err := strconv.ParseFloat(strings.ReplaceAll(a[i+1], ":", ""), 32)
		// 		if err != nil {
		// 			app.logger.Print("Cannot parse chapter number: ", err)
		// 		} else {
		// 			moreInfo.ChapterNum = float32(f)
		// 		}
		// 		break
		// 	}
		// }

		moreInfo.Name = title.Text()
		// app.moreInfo[title.Text()] = moreInfo
		app.mangaInfo.Store(title.Text(), moreInfo)
	})

	for i := 1; i <= 1316; i++ {
		// for i := 1; i < 100; i++ {
		if i == 1 {
			app.collector.Visit("https://manganato.com/genre-all")
		} else {
			fmt.Printf("%dth page\n", i)
			app.collector.Visit("https://manganato.com/genre-all/" + strconv.Itoa(i))
		}
	}
	app.collector.Wait()
	close(app.mangas)

	// err := app.writeJson(w, http.StatusOK, app.mangaData, "manga")
	// if err != nil {
	// 	app.errorJson(w, err)
	// 	return
	// }
}
