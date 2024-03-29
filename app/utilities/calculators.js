export const calculateSubscriptionEnd = (startDate, duration) => {
	const date = new Date(startDate);
	const result = date.setDate(date.getDate() + duration);
	return new Date(result).toDateString();
};

export const calculateDanceDuration = (
	targetBodyMovements,
	returnType = null
) => {
	const resultInSeconds = targetBodyMovements * 3 * 0.75;
	switch (returnType) {
		case "minutes":
			return Math.ceil(resultInSeconds / 60);
		case "millis":
			return Math.ceil(resultInSeconds * 1000);
		default:
			return resultInSeconds;
	}
};

export const calculatePercentageCompleted = (partial, total) => {
	if (partial > total) return null;
	const result = (100 * partial) / total;
	return Math.floor(result);
};

export const calculateTargetTime = (targetMoves) => {
	return Math.ceil(targetMoves * 3 * 0.75 * 1000);
};

export const calculateTargetSteps = (targetMoves) => {
	return targetMoves * 3;
};

export const calculateActualSteps = (displaySteps) => {
	return Math.floor(displaySteps / 3);
};

export const calculateCaloriesBurned = (bodyMovesCount) => {
	const CAL_BURN_RATE_PER_MOVE = 0.00175;
	console.log(
		"Body Moves Received",
		bodyMovesCount,
		bodyMovesCount * CAL_BURN_RATE_PER_MOVE
	);

	return bodyMovesCount * CAL_BURN_RATE_PER_MOVE;
};
