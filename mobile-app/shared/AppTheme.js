import { DefaultTheme } from "@react-navigation/native";
import { useContext } from "react";
import AppContext from "./AppContext";

function AppTheme() {
	const myContext = useContext(AppContext);
	return {
		...DefaultTheme,
		dark: myContext.darkTheme,
		colors: {
			...DefaultTheme.colors,
			primary: "rgb(255, 45, 85)",
			secondary: "#333333",
			background: "rgb(242, 242, 242)",
			card: "rgb(255, 255, 255)",
			text: "#fff",
			border: "rgb(199, 199, 204)",
			notification: "rgb(255, 69, 58)",
		},
		font: {
			regular: "RobotoCondensed-Regular",
			bold: "RobotoCondensed-Bold",
		},
	};
}

export default AppTheme;
