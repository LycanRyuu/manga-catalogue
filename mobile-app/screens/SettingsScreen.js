import { useTheme } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Settings = ({ navigation }) => {
	const { font } = useTheme();

	return (
		<View style={styles.container}>
			<Text
				style={{
					...styles.text,
					fontWeight: "bold",
					fontSize: 20,
					fontFamily: font.bold,
				}}>
				Settings
			</Text>
			<Text
				style={{
					...styles.text,
					margin: 10,
					fontFamily: font.regular,
				}}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
				sequi soluta cum culpa porro provident? Reiciendis vero vel cum
				natus minima blanditiis. Voluptatibus, consectetur doloremque?
				Repellendus tenetur rerum id officiis?
			</Text>
			<Text
				style={{
					...styles.text,
					margin: 10,
					fontFamily: font.regular,
				}}>
				Reprehenderit magni, sint consequatur enim minus animi, dolorum
				architecto exercitationem iste, nobis commodi eius corporis
				pariatur facere. Aliquam voluptatum id aliquid reprehenderit
				nostrum est autem labore aut, voluptatem tempora repellendus!
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#212121",
	},
	text: {
		color: "#fff",
		textAlign: "justify",
		// fontFamily: "Montserrat-Regular",
		// fontFamily: "OpenSans-Regular",
		fontFamily: "RobotoCondensed-Regular",
		// fontFamily: "RobotoFlex-Regular",
	},
});

export default Settings;
