import React, { useContext } from "react";
import AppContext from "../shared/AppContext";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";

const MangaInfoScreen = ({ navigation, route }) => {
	// extract params from route
	const item = route.params;
	const myContext = useContext(AppContext);
	const { font } = useTheme();

	const addCommas = (num) => {
		return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	return (
		<View style={styles.body}>
			<View style={styles.container}>
				<Image
					source={{
						uri: item.image_url,
						height: 200,
						width: 150,
					}}
				/>
				<View style={styles.info}>
					<Text
						style={{
							...styles.text,
							fontFamily: font.bold,
							fontSize: 20,
							marginBottom: 5,
							textAlign: "left",
						}}>
						{item.name}
					</Text>
					<Text style={{ ...styles.text, fontFamily: font.regular }}>
						<Text
							style={{
								fontFamily: font.bold,
							}}></Text>
						{item.ongoing ? "Ongoing" : "Completed"}
					</Text>
					<Text style={{ ...styles.text, fontFamily: font.regular }}>
						<Text
							style={{
								fontFamily: font.bold,
							}}>
							Rating:{" "}
						</Text>
						{item.rating}
					</Text>
					<Text style={{ ...styles.text, fontFamily: font.regular }}>
						<Text
							style={{
								fontFamily: font.bold,
							}}>
							Author(s):{" "}
						</Text>
						{item.author.join(", ")}
					</Text>
					<Text style={{ ...styles.text, fontFamily: font.regular }}>
						<Text
							style={{
								fontFamily: font.bold,
							}}>
							Genres:{" "}
						</Text>
						{item.genre.join(", ")}
					</Text>
					<Text style={{ ...styles.text, fontFamily: font.regular }}>
						<Text
							style={{
								fontFamily: font.bold,
							}}>
							Last Released Chapter:{" "}
						</Text>
						{item.chapter_num}
					</Text>
					<Text style={{ ...styles.text, fontFamily: font.regular }}>
						<Text
							style={{
								fontFamily: font.bold,
							}}>
							Release Date:{" "}
						</Text>
						{item.release_date}
					</Text>
					<Text style={{ ...styles.text, fontFamily: font.regular }}>
						<Text
							style={{
								fontFamily: font.bold,
							}}>
							Last Updated:{" "}
						</Text>
						{item.last_updated}
					</Text>
					<Text style={{ ...styles.text, fontFamily: font.regular }}>
						<Text
							style={{
								fontFamily: font.bold,
							}}>
							Reads:{" "}
						</Text>
						{/* {item.reads} */}
						{addCommas(item.reads)}
					</Text>
					{/* <Text style={{ ...styles.text, fontFamily: font.regular }}>
						<Text
							style={{
								flex: 1,
								fontFamily: font.bold,
							}}>
							Summary:{" "}
						</Text>
						{item.summary}
					</Text> */}

					{/* Custom button */}
					{/* <Pressable
						// style={styles.button}
						style={({ pressed }) => [
							{
								...styles.button,
								backgroundColor: pressed ? "#212121" : "black",
								// backgroundColor: pressed ? "black" : "#212121",
								marginTop: 10,
							},
						]}
						onPress={() => myContext.toggleTheme()}>
						<Text style={styles.buttonText}>Show Context</Text>
					</Pressable> */}
				</View>
			</View>
			<Text
				style={{
					...styles.text,
					fontFamily: font.regular,
					fontSize: 16,
					marginTop: 10,
				}}>
				<Text
					style={{
						flex: 1,
						fontFamily: font.bold,
					}}>
					Summary:{" "}
				</Text>
				{item.synopsis}
			</Text>
			<Text
				style={{
					...styles.text,
					fontFamily: font.regular,
					// fontSize: 16,
					marginTop: 10,
				}}>
				<Text
					style={{
						flex: 1,
						fontFamily: font.bold,
					}}>
					Alternate Names:{" "}
				</Text>
				{item.alternate_name.join(", ")}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	body: {
		flex: 1,
		backgroundColor: "#212121",
	},
	container: {
		// flex: 1,
		// alignItems: "center",
		// justifyContent: "center",
		flexDirection: "row",
	},
	info: {
		flex: 1,
		padding: 10,
		flexDirection: "column",
		// textAlign: "justify",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		backgroundColor: "black",
	},
	buttonText: {
		fontSize: 16,
		lineHeight: 21,
		letterSpacing: 0.25,
		color: "white",
		textTransform: "uppercase",
	},
	text: {
		color: "#fff",
		textAlign: "justify",
	},
});

export default MangaInfoScreen;
