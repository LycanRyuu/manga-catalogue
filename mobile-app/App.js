import { StatusBar } from "expo-status-bar";
import BottomTabs from "./routes/BottomTabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import AppContext from "./shared/AppContext";
// import AppTheme from "./shared/AppTheme";

// build app for internal use
// docs.expo.dev/build/internal-distribution/
// https://expo.dev/accounts/lycan/projects/mobile-app/builds/5b7d72f0-e315-4a78-b909-d49f32cbdbba

// build
// https://expo.dev/accounts/lycan/projects/mobile-app/builds/b5d5518e-e5f8-4d28-8474-66a2cd23a4ea

https: SplashScreen.preventAutoHideAsync().catch(console.warn);

export default function App() {
	const [isReady, setIsReady] = useState(false);

	// Setting up global context
	const [darkTheme, setDarkTheme] = useState(true);
	const [columnCount, setColumnCount] = useState(2);

	const userSettings = {
		darkTheme: darkTheme,
		toggleTheme: () => setDarkTheme(!darkTheme),
		columnCount: columnCount,
		toggleColumns: () => setColumnCount(columnCount === 2 ? 3 : 2),
	};

	// const fontName = "Montserrat";
	// const fontName = "OpenSans";
	const fontName = "RobotoCondensed";
	// const fontName = "RobotoFlex";

	const AppTheme = {
		...DefaultTheme,
		dark: userSettings.darkTheme,
		colors: {
			...DefaultTheme.colors,
			accent: "tomato",
			// accent: "blue",
			primary: "rgb(255, 45, 85)",
			secondary: "#333333",
			background: "rgb(242, 242, 242)",
			card: "rgb(255, 255, 255)",
			text: "#fff",
			border: "rgb(199, 199, 204)",
			notification: "rgb(255, 69, 58)",
		},
		font: {
			regular: `${fontName}-Regular`,
			bold: `${fontName}-Bold`,
		},
	};

	const loadFonts = async () => {
		try {
			await Font.loadAsync({
				"Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
				"Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
				"OpenSans-Regular": require("./assets/fonts/OpenSans-Regular.ttf"),
				"OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
				"RobotoCondensed-Regular": require("./assets/fonts/RobotoCondensed-Regular.ttf"),
				"RobotoCondensed-Bold": require("./assets/fonts/RobotoCondensed-Bold.ttf"),
				"RobotoFlex-Regular": require("./assets/fonts/RobotoFlex-Regular.ttf"),
			});
		} catch (e) {
			console.warn(e);
		} finally {
			setIsReady(true);
			await SplashScreen.hideAsync();
		}
	};

	useEffect(() => {
		loadFonts();
	}, []);

	if (!isReady) {
		return null;
	}

	console.log("AppTheme.dark", AppTheme.dark);
	return (
		<AppContext.Provider value={userSettings}>
			<NavigationContainer theme={AppTheme}>
				<BottomTabs />
				<StatusBar style={AppTheme.dark === true ? "light" : "dark"} />
			</NavigationContainer>
		</AppContext.Provider>
	);
}

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#212121",
// 		color: "#fff",
// 	},
// });

/* blackColours {
	dark to light
	#333333
	#282c34
	#212121
	#181818
} */

// #888
// #555
