export const checkUserPerformance = async (
	timeDanced,
	targetTimeInMillis,
	targetBodyMoves,
	currentBodyMoves
) => {
	if (
		timeDanced >= targetTimeInMillis / 4 &&
		timeDanced <= targetTimeInMillis / 2
	) {
		//Has the user gone past 25%?
		return;
	} else if (
		timeDanced > targetTimeInMillis / 2 &&
		timeDanced <= targetTimeInMillis * 0.75
	) {
		//Has the user gone past 50%?
		return;
	} else if (
		timeDanced > targetTimeInMillis * 0.75 &&
		timeDanced <= targetTimeInMillis
	) {
		//Has the user gone past 75%
		return;
	}
};
