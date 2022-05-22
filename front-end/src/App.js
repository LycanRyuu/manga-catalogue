import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import BrowseManga from "./components/BrowseManga";
import BrowseMangaByGenre from "./components/BrowseMangaByGenre";
import { Button, Typography } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import AppTheme from "./AppThemes";

function App() {
	return (
		<ThemeProvider theme={AppTheme}>
			<div className='App'>
				<ButtonGroup>
					<Button component={Link} to={"/manga/all"} color='primary'>
						Manga
					</Button>
					<Button
						component={Link}
						to={"/manga/BrowseByGenre"}
						color='secondary'>
						Genre
					</Button>
				</ButtonGroup>

				<Routes>
					<Route path='/manga'>
						<Route path='/manga/all' element={<BrowseManga />} />
						<Route
							path='/manga/BrowseByGenre'
							element={<BrowseMangaByGenre />}
						/>
					</Route>
				</Routes>
				<Typography variant='h4' gutterBottom>
					Footer
				</Typography>
			</div>
		</ThemeProvider>
	);
}

export default App;
