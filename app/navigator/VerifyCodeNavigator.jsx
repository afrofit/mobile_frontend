import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// import SuccessScreen from "./../screens/notification/SuccessScreen";
import routes from "../theme/routes";
import VerifyCodeScreen from "../screens/auth/VerifyCodeScreen";
import VerifiedNotifyScreen from "../screens/notifications/VerifiedNotifyScreen";

const Stack = createStackNavigator();

const VerifyEmailNavigator = () => (
	<Stack.Navigator screenOptions={{ headerShown: false }}>
		<Stack.Screen
			name={routes.auth.VERIFY_EMAIL}
			component={VerifyCodeScreen}
		/>
		<Stack.Screen
			name={routes.notifications.SUCCESS_VERIFY}
			component={VerifiedNotifyScreen}
		/>
	</Stack.Navigator>
);

export default VerifyEmailNavigator;
