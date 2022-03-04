import * as React from "react";

import { BackHandler } from "react-native";

const useDisableHardwareBack = () => {
	const backDisabled = React.useCallback(() => {
		const onBackPress = () => {
			return true;
		};

		BackHandler.addEventListener("hardwareBackPress", onBackPress);

		return () =>
			BackHandler.removeEventListener("hardwareBackPress", onBackPress);
	}, []);
	return { backDisabled };
};

export default useDisableHardwareBack;
