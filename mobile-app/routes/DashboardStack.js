import { useTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext, useState } from "react";
import { Button, Switch, Text, View } from "react-native";
import BrowseScreen from "../screens/BrowseScreen";
import MangaInfoScreen from "../screens/MangaInfoScreen";
import AppContext from "../shared/AppContext";

const Stack = createNativeStackNavigator();

const DashboardStack = () => {
	const { font } = useTheme();
	const [isEnabled, setIsEnabled] = useState(false);
	const myContext = useContext(AppContext);

	return (
		<Stack.Navigator
			initialRouteName='Browse'
			screenOptions={{
				headerStyle: {
					// backgroundColor: "#f4511e",
					backgroundColor: "black",
					// backgroundColor: "#212121",
					height: 50,
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					fontFamily: font.bold,
				},
				// headerShown: false,
			}}>
			<Stack.Screen
				name='Browse'
				component={BrowseScreen}
				// children={() => <BrowseScreen showTabHeader={showTabHeader} />}
				options={{
					title: "Browse",
					headerRight: () => (
						<View style={{ flexDirection: "row" }}>
							<Switch
								trackColor={{
									false: "#767577",
									true: "#81b0ff",
								}}
								thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
								ios_backgroundColor='#3e3e3e'
								onValueChange={() => {
									setIsEnabled(!isEnabled);
									// myContext.toggleTheme();
									myContext.toggleColumns();
								}}
								value={isEnabled}
							/>
							{/* <Button
								onPress={() => alert("This is a button!")}
								title='Info'
							/> */}
						</View>
					),
				}}
			/>
			<Stack.Screen
				name='MangaInfo'
				component={MangaInfoScreen}
				options={{ title: "Manga Info" }}
			/>
			{/* To give dynamic header */}
			{/* options={({ route }) => ({ title: route.params.name })} */}
		</Stack.Navigator>
	);
};

export default DashboardStack;

// const screens = {
// 	BrowseScreen: {
// 		// screen: () => <BrowseScreenreen />,
// 		screen: BrowseScreen,
// 		navigationOptions: {
// 			title: "Browse",
// 		},
// 	},
// 	// MangaScreen: {
// 	// 	screen: MangaScreen,
// 	// 	navigationOptions: {
// 	// 		title: "Manga",
// 	// 	},
// 	// },
// 	// ChapterScreen: {
// 	// 	screen: ChapterScreen,
// 	// 	navigationOptions: {
// 	// 		title: "Chapter",
// 	// 	},
// 	// },
// 	// PageScreen: {
// 	// 	screen: PageScreen,
// 	// 	navigationOptions: {
// 	// 		title: "Page",
// 	// 	},
// 	// },
// };

// const DashboardStack = createStackNavigator(screens, {
// 	defaultNavigationOptions: {
// 		headerStyle: {
// 			backgroundColor: "#212121",
// 		},
// 		headerTintColor: "#fff",
// 		headerTitleStyle: {
// 			fontWeight: "bold",
// 		},
// 	},
// });

// export default createAppContainer(DashboardStack);
