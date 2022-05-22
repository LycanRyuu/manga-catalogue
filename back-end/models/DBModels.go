package models

type Manga struct {
	Id              string   `json:"-"`
	Name            string   `json:"name"`
	URL             string   `json:"url"`
	ImageURL        string   `json:"image_url"`
	Genre           []string `json:"genre"`
	MALRating       float32  `json:"mal_rating"`
	MangaNatoRating float32  `json:"manganato_rating"`
	Author          []string `json:"author"`
	ReleaseDate     string   `json:"release_date"`
	Ongoing         bool     `json:"ongoing"`
	Synopsis        string   `json:"synopsis"`
	ChapterNum      float32  `json:"chapter_num"`
}

type User struct {
	Id              string       `json:"id"`
	Name            string       `json:"name"`
	Email           string       `json:"email"`
	Password        string       `json:"password"`
	MangaReadStatus []ReadStatus `json:"read_status"`
}

type ReadStatus struct {
	MangaId   string `json:"manga_id"`
	Read      bool   `json:"read"`
	ReadUntil int    `json:"read_until"`
	Favorite  bool   `json:"favorite"`
}
