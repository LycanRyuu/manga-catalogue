package models

type Manga struct {
	Id            string   `json:"-"`
	Name          string   `json:"name"`
	AlternateName []string `json:"alternate_name"`
	URL           string   `json:"url"`
	ImageURL      string   `json:"image_url"`
	Genre         []string `json:"genre"`
	Rating        float32  `json:"rating"`
	Author        []string `json:"author"`
	ReleaseDate   string   `json:"release_date"`
	LastUpdated   string   `json:"last_updated"`
	Ongoing       bool     `json:"ongoing"`
	Reads         int      `json:"reads"`
	Synopsis      string   `json:"synopsis"`
	ChapterNum    float32  `json:"chapter_num"`
	ChapterURLs   []string `json:"chapter_urls"`
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
