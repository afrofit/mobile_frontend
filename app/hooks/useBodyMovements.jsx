import * as React from "react";
import { Pedometer } from "expo-sensors";

const useBodyMovements = () => {
	const [bodyMovementCount, setBodyMovementCount] = React.useState(0);
	const [pedometerIsAvailable, setPedometerIsAvailable] = React.useState(false);
	let movementsSubscription;

	React.useState(() => {
		Pedometer.isAvailableAsync().then((result) => {
			console.log("Pedometer Status: ", result);
			return setPedometerIsAvailable(result);
		});
	}, []);

	const startMoving = () => {
		movementsSubscription = Pedometer.watchStepCount((result) =>
			setBodyMovementCount(result.steps)
		);
	};

	const stopMoving = async () => {
		movementsSubscription && (await movementsSubscription.remove());
		movementsSubscription = null;
	};

	return {
		bodyMovementCount,
		setBodyMovementCount,
		startMoving,
		stopMoving,
		pedometerIsAvailable,
	};
};

export default useBodyMovements;
