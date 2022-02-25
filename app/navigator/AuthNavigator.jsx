import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/welcome/WelcomeScreen";
import SignupScreen from "../screens/auth/SignupScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";
import routes from "../theme/routes";
import FullNotifyScreen from "../screens/notifications/FullNotifyScreen";
import SuccessSignupNotifyScreen from "../screens/notifications/SignUpSuccessNotifyScreen";
import ActionNotifyScreen from "../screens/notifications/ActionNotifyScreen";
// import VerifyCodeScreen from "../screens/auth/VerifyCodeScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => (
	<Stack.Navigator
		screenOptions={{ headerShown: false, gestureEnabled: false }}
	>
		<Stack.Screen name={routes.auth.WELCOME} component={WelcomeScreen} />
		<Stack.Screen name={routes.auth.LOGIN} component={LoginScreen} />
		<Stack.Screen name={routes.auth.SIGNUP} component={SignupScreen} />
		<Stack.Screen
			name={routes.auth.RESET_PASSWORD}
			component={ResetPasswordScreen}
		/>
		<Stack.Screen
			name={routes.notifications.SUCCESS_SIGNUP}
			component={ActionNotifyScreen}
		/>
		<Stack.Screen
			name={routes.notifications.SUCCESS_PASSWORD_CHANGE}
			component={ActionNotifyScreen}
		/>
	</Stack.Navigator>
);

export default AuthNavigator;
