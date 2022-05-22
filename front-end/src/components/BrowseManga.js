import React, { useEffect, useState } from "react";
import {
	Typography,
	Pagination,
	Card,
	Button,
	CardActionArea,
	CardMedia,
	CardContent,
	CardActions,
} from "@mui/material";
import axios from "axios";
import styles from "../styles/BrowseManga.module.css";

const BrowseManga = () => {
	// useEffect(() => {
	// async function fetchData() {
	// 	const response = axios.get("http://localhost:10000/manga/0");
	// 	// setMovieData(response.data.manga);
	// 	setMovieData(response.manga);
	// }
	// fetchData();

	// fetch("http://localhost:10000/manga/0")
	// 	.then((response) => response.json())
	// 	.then((data) => {
	// 		setMovieData(data.manga);
	// 	});

	// .then((data) => setMovieData(data.data))
	// .catch((error) => console.log(error));
	// }, []);

	// const [movieData, setMovieData] = useState({
	// 	currentPage: 0,
	// 	totalPages: 0,
	// 	mangas: [],
	// });
	const [movieData, setMovieData] = useState({
		current_page: 0,
		last_page: 1306,
		mangas: [
			{
				name: "Party Kara Tsuihou Sareta Sono Chiyushi, Jitsu Wa Saikyou Nitsuki",
				url: "https://readmanganato.com/manga-ji986843",
				image_url:
					"https://avt.mkklcdnv6temp.com/23/e/22-1601604720.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.2,
				author: ["Kage Kinoko", "Narumi Miwa"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 22.3,
			},
			{
				name: "A Second Chance At Love",
				url: "https://readmanganato.com/manga-nu990555",
				image_url:
					"https://avt.mkklcdnv6temp.com/29/m/25-1646240309.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 3.5,
				author: ["Ake Culture"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 65,
			},
			{
				name: "My Wechat Links The Three Realms!",
				url: "https://readmanganato.com/manga-nk990719",
				image_url:
					"https://avt.mkklcdnv6temp.com/36/b/25-1649755107.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 1.6,
				author: ["Yuririn"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 86,
			},
			{
				name: "Nito's Lazy Foreign World Syndrome",
				url: "https://readmanganato.com/manga-gv983530",
				image_url:
					"https://avt.mkklcdnv6temp.com/42/b/19-1583500710.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.8,
				author: ["Fujimi Shoubou"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 20,
			},
			{
				name: "Kyoukai Meikyuu To Ikai No Majutsushi",
				url: "https://readmanganato.com/manga-ce979561",
				image_url:
					"https://avt.mkklcdnv6temp.com/46/d/16-1583495128.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.4,
				author: ["Bau", " Eiji Onosaki"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 43,
			},
			{
				name: "The Wrong Way To Use Healing Magic",
				url: "https://readmanganato.com/manga-zp977298",
				image_url:
					"https://avt.mkklcdnv6temp.com/39/z/15-1583493103.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.6,
				author: ["Kurokata"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 50,
			},
			{
				name: "The Reincarnation Magician Of The Inferior Eyes",
				url: "https://manganato.com/manga-eq981551",
				image_url:
					"https://avt.mkklcdnv6temp.com/19/b/18-1583497836.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.5,
				author: ["Hiro Touge", " Yusura Citrus"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 73,
			},
			{
				name: "Gunjou Senki",
				url: "https://manganato.com/manga-xf953688",
				image_url:
					"https://avt.mkklcdnv6temp.com/32/b/2-1583466935.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.3,
				author: ["Kasahara Masaki"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 38,
			},
			{
				name: "I Became The Villain's Mother",
				url: "https://readmanganato.com/manga-hw985279",
				image_url:
					"https://avt.mkklcdnv6temp.com/9/d/21-1588734711.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.8,
				author: ["Yuliji"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 66,
			},
			{
				name: "Komi-San Wa Komyushou Desu",
				url: "https://readmanganato.com/manga-va953509",
				image_url:
					"https://avt.mkklcdnv6temp.com/25/s/2-1583466695.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.9,
				author: ["Oda Tomohito"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 353,
			},
			{
				name: "Mercenary Enrollment",
				url: "https://readmanganato.com/manga-jz987182",
				image_url:
					"https://avt.mkklcdnv6temp.com/36/y/22-1605087752.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.6,
				author: ["YC"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 83,
			},
			{
				name: "Rikudou",
				url: "https://manganato.com/manga-ou952777",
				image_url: "https://avt.mkklcdnv6temp.com/1/g/1-1583465737.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.7,
				author: ["Rikudou Shuusai"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 0,
			},
			{
				name: "Dreamland",
				url: "https://readmanganato.com/manga-ch951642",
				image_url:
					"https://avt.mkklcdnv6temp.com/11/t/1-1583464120.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.5,
				author: ["Reno (ii)", "Reno Lemaire"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 133,
			},
			{
				name: "City Of Dead Sorcerer",
				url: "https://readmanganato.com/manga-kl952420",
				image_url:
					"https://avt.mkklcdnv6temp.com/38/r/1-1583465216.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.1,
				author: ["Carnby", "Team Getname"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 235,
			},
			{
				name: "Dandadan",
				url: "https://readmanganato.com/manga-lp988998",
				image_url:
					"https://avt.mkklcdnv6temp.com/11/w/24-1620229945.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.8,
				author: ["Tatsu Yukinobu"],
				release_date: "May 03,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 55,
			},
			{
				name: "My Wife Is Niizuma-Chan",
				url: "https://readmanganato.com/manga-dh980842",
				image_url:
					"https://avt.mkklcdnv6temp.com/43/o/17-1583496829.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.6,
				author: ["ruch_f"],
				release_date: "May 02,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 26,
			},
			{
				name: "Bungou Stray Dogs Beast",
				url: "https://readmanganato.com/manga-ht984928",
				image_url:
					"https://avt.mkklcdnv6temp.com/44/u/20-1584286467.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.7,
				author: ["Asagiri Kafka", "Hoshikawa Shiwasu"],
				release_date: "May 02,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 22,
			},
			{
				name: "Itoshi No Sakura-San",
				url: "https://manganato.com/manga-xk974445",
				image_url:
					"https://avt.mkklcdnv6temp.com/44/i/14-1583491286.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4,
				author: ["Orihara Sachiko"],
				release_date: "May 02,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 51,
			},
			{
				name: "Eternal Club",
				url: "https://readmanganato.com/manga-nz990408",
				image_url:
					"https://avt.mkklcdnv6temp.com/23/i/25-1642319244.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.2,
				author: ["Yu"],
				release_date: "May 02,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 69,
			},
			{
				name: "The Beast Must Die",
				url: "https://manganato.com/manga-gq984351",
				image_url:
					"https://avt.mkklcdnv6temp.com/22/w/20-1583501903.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 3.9,
				author: ["Lee Hyeon Sook"],
				release_date: "May 02,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 84,
			},
			{
				name: "The Grandmaster Of Demonic Cultivation",
				url: "https://readmanganato.com/manga-ct980354",
				image_url:
					"https://avt.mkklcdnv6temp.com/25/n/17-1583496172.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.5,
				author: ["Mo Xiang Tong Xiu", " Unknown"],
				release_date: "May 02,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 232,
			},
			{
				name: "Lookism",
				url: "https://readmanganato.com/manga-zw952131",
				image_url:
					"https://avt.mkklcdnv6temp.com/28/v/1-1583464823.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.6,
				author: ["Park Tae Joon"],
				release_date: "May 02,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 394,
			},
			{
				name: "The Undefeatable Swordsman",
				url: "https://readmanganato.com/manga-ii986065",
				image_url:
					"https://avt.mkklcdnv6temp.com/41/y/21-1596254876.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.8,
				author: ["TUS"],
				release_date: "May 02,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 115,
			},
			{
				name: "Infinite Apostles And Twelve War Girls",
				url: "https://readmanganato.com/manga-hn984596",
				image_url:
					"https://avt.mkklcdnv6temp.com/32/c/20-1583502263.jpg",
				genre: [],
				mal_rating: 0,
				manganato_rating: 4.7,
				author: ["酸奶丸子/SF轻小说", " Lukezrc"],
				release_date: "May 02,22",
				ongoing: false,
				synopsis: "",
				chapter_num: 236,
			},
		],
	});

	const handlePageChange = (page) => {
		axios
			.get(`http://localhost:10000/manga/${page}`)
			.then((data) => setMovieData(data.data))
			.catch((error) => console.log(error));
	};

	return (
		<div style={{ height: "100%" }}>
			<Typography variant='h3' gutterBottom>
				Browse Manga
			</Typography>

			<div className={styles.catalogue}>
				{movieData.mangas &&
					movieData.mangas.map((movie) => (
						<Card className={styles.cards}>
							<CardActionArea
								style={
									{
										// display: "flex",
										// placeContent: "left",
									}
								}>
								<CardMedia
									component='img'
									image={movie.image_url}
									title={movie.name}
									style={{
										height: "140px",
										// width: "100px",
										aspectRatio: "5/9",
									}}
								/>
								<CardContent>
									<Typography
										gutterBottom
										variant='h5'
										component='h2'>
										{movie.name}
									</Typography>
									<Typography
										variant='body2'
										color='textSecondary'
										component='p'>
										{movie.author}
									</Typography>
									<Typography
										variant='body2'
										color='textSecondary'
										component='p'>
										{movie.release_date}
									</Typography>
									<Typography
										variant='body2'
										color='textSecondary'
										component='p'>
										{movie.manganato_rating}
									</Typography>
								</CardContent>
							</CardActionArea>
							{/* <CardActions>
								<Button size='small' color='primary'>
									Learn More
								</Button>
							</CardActions> */}
						</Card>
					))}
			</div>
			<Pagination
				count={movieData.total_pages}
				color='primary'
				onChange={(event, page) => handlePageChange(page)}
			/>
		</div>
	);
};

export default BrowseManga;
