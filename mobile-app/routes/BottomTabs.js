import * as React from "react";
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DashboardStack from "./DashboardStack";
import Settings from "../screens/SettingsScreen";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
	const { colors, font } = useTheme();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;
					if (route.name === "Home") {
						iconName = focused ? "home" : "home";
					} else if (route.name === "Settings") {
						iconName = focused ? "settings" : "settings";
					}

					return (
						<MaterialIcons
							name={iconName}
							size={size}
							color={color}
							// color={colors.accent}
						/>
					);
				},
				tabBarActiveTintColor: colors.accent,
				tabBarInactiveTintColor: "gray",
				tabBarActiveBackgroundColor: "black",
				tabBarInactiveBackgroundColor: "black",
				tabBarAllowFontScaling: true,
				tabBarStyle: { borderTopWidth: 0 },
				tabBarTextFontFamily: font.bold,
				topTabTextFontFamily: font.bold,
				headerStyle: {
					backgroundColor: "#212121",
				},
				tabBarLabelStyle: {
					fontFamily: font.regular,
					fontSize: 16,
				},
				headerTintColor: "#fff",
				headerTitleStyle: {
					fontFamily: font.bold,
				},
			})}>
			<Tab.Screen
				name='Home'
				component={DashboardStack}
				options={{
					headerShown: false,
					// tabBarBadge: 3,
				}}
			/>
			<Tab.Screen name='Settings' component={Settings} />
		</Tab.Navigator>
	);
}
