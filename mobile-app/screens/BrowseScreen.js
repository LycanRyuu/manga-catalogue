import React from "react";
import {
	Dimensions,
	FlatList,
	ImageBackground,
	StyleSheet,
	Text,
	TouchableHighlight,
	View,
} from "react-native";
import response from "../Response";
import { useTheme } from "@react-navigation/native";
// import Tiles from "react-native-tiles";
import { useContext } from "react";
import AppContext from "../shared/AppContext";

const padding = 5;

const BrowseScreen = ({ navigation }) => {
	const { colors, font } = useTheme();
	const appContext = useContext(AppContext);

	return (
		<FlatList
			style={{
				flex: 1,
				backgroundColor: "#000",
			}}
			data={response.manga.mangas}
			numColumns={appContext.columnCount}
			key={appContext.columnCount}
			renderItem={({ item }) => (
				<TouchableHighlight
					onPress={() => navigation.navigate("MangaInfo", item)}>
					<ImageBackground
						source={{ uri: item.image_url }}
						resizeMode='cover'
						style={styles.tile}
						imageStyle={{ borderRadius: 6 }}>
						<View
							style={{
								...styles.tile,
								// backgroundColor: colors.secondary,
								width:
									Dimensions.get("window").width /
										appContext.columnCount -
									padding * (appContext.columnCount - 1),
								...(appContext.columnCount === 2 && {
									height:
										Dimensions.get("window").height /
											appContext.columnCount -
										padding * (appContext.columnCount - 1),
								}),
							}}>
							<ImageBackground
								blurRadius={10}
								style={{
									backgroundColor: "#555",
									borderRadius: 6,
									marginBottom: 10,
								}}>
								<Text
									style={{
										...styles.containerText,
										fontFamily: font.regular,
										textAlign: "center",
									}}>
									{item.name}
								</Text>
							</ImageBackground>
						</View>
					</ImageBackground>
				</TouchableHighlight>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
	},
	container: {
		flex: 1,
		backgroundColor: "#333333",
		flexDirection: "row",
		// flexGrow: 0,
		flexWrap: "wrap",
		padding: 2,
	},
	containerText: {
		fontSize: 18,
		color: "#fff",
		padding: 6,
		textAlign: "center",
		// borderRadius: 6,
		// backgroundColor: "black",
	},
	tile: {
		margin: padding,
		height: 320,
		justifyContent: "flex-end",
		alignItems: "center",
	},
});

export default BrowseScreen;
