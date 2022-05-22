import { createTheme } from "@mui/material/styles";

const AppTheme = createTheme({
	palette: {
		primary: {
			main: "#00bcd4",
		},
		secondary: {
			main: "#ff9800",
		},
	},
	typography: {
		fontFamily: "Oswald",
		// fontFamily: "Montserrat",
		fontWeightLight: 400,
		fontWeightRegular: 500,
		fontWeightMedium: 600,
		fontWeightBold: 700,
	},
});

export default AppTheme;
