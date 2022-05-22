import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import DashboardStack from "./routes/DashboardStack";

export default function App() {
	return (
		<View style={styles.container}>
			<DashboardStack />
			{/* <StatusBar style='auto' /> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#212121",
		color: "#fff",
		// alignItems: "center",
		// justifyContent: "center",
	},
});

/* blackColours {
	dark to light
	#333333
	#282c34
	#212121
	#181818
} */

// #888
// #555
