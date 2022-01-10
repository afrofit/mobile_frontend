import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

import { COLORS } from "../theme/colors";
import routes from "../theme/routes";

//Screens
import HomeScreen from "../screens/app/home/HomeScreen";
import StoryScreen from "../screens/app/home/StoryScreen";
import ChapterScreen from "../screens/app/home/ChapterScreen";
import ProfileScreen from "../screens/app/profile/ProfileScreen";
import MarathonScreen from "../screens/app/marathon/MarathonScreen";
import DanceScreen from "../screens/app/home/DanceScreen";
import StoryIntroScreen from "../screens/app/home/StoryIntroScreen";
import PerformanceResultScreen from "../screens/app/home/PerformanceResultScreen";
import FinishStoryScreen from "../screens/app/home/FinishStoryScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ICON_SIZE = 30;

const ScreensWithTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				gestureEnabled: false,
				tabBarShowLabel: false,
				tabBarActiveTintColor: COLORS.yellow,
				tabBarStyle: {
					backgroundColor: COLORS.black,
					borderColor: COLORS.black,
				},
			}}
		>
			<Tab.Screen
				name={routes.tabs.HOME}
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="home" color={color} size={ICON_SIZE} />
					),
				}}
			></Tab.Screen>
			<Tab.Screen
				name={routes.tabs.MARATHON}
				component={MarathonScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="Trophy" color={color} size={ICON_SIZE} />
					),
				}}
			></Tab.Screen>
			<Tab.Screen
				name={routes.tabs.PROFILE}
				component={ProfileScreen}
				options={{
					tabBarIcon: ({ color, size }) => (
						<AntDesign name="user" color={color} size={ICON_SIZE} />
					),
				}}
			></Tab.Screen>
		</Tab.Navigator>
	);
};

const AppNavigator = () => {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false, gestureEnabled: false }}
		>
			<Stack.Screen
				name={routes.ROOT}
				component={ScreensWithTabs}
			></Stack.Screen>
			<Stack.Screen
				name={routes.home.STORY}
				component={StoryScreen}
			></Stack.Screen>
			<Stack.Screen
				name={routes.home.STORY_INTRO}
				component={StoryIntroScreen}
			></Stack.Screen>
			<Stack.Screen
				name={routes.home.CHAPTER}
				component={ChapterScreen}
			></Stack.Screen>
			<Stack.Screen
				name={routes.home.DANCE}
				component={DanceScreen}
			></Stack.Screen>
			<Stack.Screen
				name={routes.home.PERFORMANCE_RESULTS_SCREEN}
				component={PerformanceResultScreen}
			></Stack.Screen>
			<Stack.Screen
				name={routes.home.STORY_FINISHED_SCREEN}
				component={FinishStoryScreen}
			></Stack.Screen>
		</Stack.Navigator>
	);
};

export default AppNavigator;
