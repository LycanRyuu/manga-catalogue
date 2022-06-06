package main

import (
	"fmt"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *Application) routes() http.Handler {
	router := httprouter.New()
	// router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)
	// router.HandlerFunc(http.MethodGet, "/v1/movie/:id", app.getOneMovie)
	// router.HandlerFunc(http.MethodGet, "/v1/movies", app.getAllMovies)
	// router.HandlerFunc(http.MethodGet, "/v1/movies/:genre_id", app.getAllMoviesByGenres)
	// router.HandlerFunc(http.MethodGet, "/v1/genres", app.getAllGenres)

	router.HandlerFunc(http.MethodGet, "/", homePage)
	// router.HandlerFunc(http.MethodGet, "/manga/genre/:id", app.browseByGenre)
	router.HandlerFunc(http.MethodGet, "/mangas", app.updateLibrary)
	router.HandlerFunc(http.MethodGet, "/manga/:id", app.browseManga)

	return app.enableCors(router)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
	fmt.Println("Endpoint Hit: homePage")
}
