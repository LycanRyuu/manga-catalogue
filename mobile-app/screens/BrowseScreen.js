import React from "react";
import {
	Button,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import response from "../Response";

const BrowseScreen = ({ navigation }) => {
	return (
		// <View style={styles.container}>
		<View>
			<Button
				title='Login'
				onPress={() => navigation.navigate("Login")}
			/>
			<FlatList
				data={response.manga.mangas}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity>
						<View style={styles.listItem}>
							<Image
								source={{
									uri: item.image_url,
									height: 120,
									width: 100,
								}}
								style={styles.image}
							/>
							<Text style={styles.listItemText}>{item.name}</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	// container: { marginTop: 25 },
	listItem: {
		flex: 1,
		backgroundColor: "#333333",
		borderBottomColor: "#bbb",
		borderBottomWidth: 1,
		// alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
	listItemText: {
		flex: 5,
		color: "#fff",
		paddingLeft: 10,
	},
});

export default BrowseScreen;
