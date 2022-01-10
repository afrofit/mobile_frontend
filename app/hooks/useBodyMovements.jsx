import * as React from "react";
import { Pedometer } from "expo-sensors";

const useBodyMovements = () => {
	// Pedometer.isAvailableAsync().then((result) =>
	// 	console.log("Pedometer Status: ", result)
	// );
	const [bodyMovementCount, setBodyMovementCount] = React.useState(25);
	let movementsSubscription;

	const handleMoving = (result) => {
		setBodyMovementCount(result.steps);
	};

	const startMoving = () => {
		movementsSubscription = Pedometer.watchStepCount((result) =>
			// handleMoving(result)
			setBodyMovementCount(result.steps)
		);
	};

	const stopMoving = async () => {
		movementsSubscription && (await movementsSubscription.remove());
		movementsSubscription = null;
	};

	return { bodyMovementCount, setBodyMovementCount, startMoving, stopMoving };
};

export default useBodyMovements;
