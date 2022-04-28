package models

type BrowseManga struct {
	CurrentPage int     `json:"current_page"`
	LastPage    int     `json:"last_page"`
	Mangas      []Manga `json:"mangas"`
}
