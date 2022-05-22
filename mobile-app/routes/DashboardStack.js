import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import BrowseScreen from "../screens/BrowseScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

function Header(props) {
	return (
		<Text
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			{props.title}
		</Text>
	);
}

const DashboardStack = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName='Browse'
				// screenOptions={{
				// 	headerStyle: {
				// 		// backgroundColor: "#f4511e",
				// 		backgroundColor: "#212121",
				// 	},
				// 	headerTintColor: "#fff",
				// 	headerTitleStyle: {
				// 		fontWeight: "bold",
				// 	},
				// }}
			>
				<Stack.Screen
					name='Browse'
					component={BrowseScreen}
					// options={{ title: "Browse" }}
					options={{
						headerTitle: () => <Header title='Browse' />,
					}}
				/>
				<Stack.Screen name='Login' component={LoginScreen} />
				{/* To give dynamic header */}
				{/* options={({ route }) => ({ title: route.params.name })} */}
			</Stack.Navigator>
		</NavigationContainer>
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
