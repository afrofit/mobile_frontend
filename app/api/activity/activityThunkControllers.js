import apiClient from "../client";

const ACTIVITY_ENDPOINT_PREFIX = "/performance";

const checkAPIErrors = (result) => {
	if (!result.ok) {
		if (result.data) {
			return result.data;
		} else {
			return "An unexpected error occurred.";
		}
	}
	return result.data;
};

export const fetchCurrentUserDailyActivity = async () => {
	const result = await apiClient.get(
		`${ACTIVITY_ENDPOINT_PREFIX}/get-user-daily-activity`
	);
	return checkAPIErrors(result);
};

export const fetchCurrentUserPerformanceData = async () => {
	const result = await apiClient.get(
		`${ACTIVITY_ENDPOINT_PREFIX}/get-user-performance-data`
	);
	return checkAPIErrors(result);
};

export const saveUserPerformanceData = async (activityData) => {
	const result = await apiClient.post(
		`${ACTIVITY_ENDPOINT_PREFIX}/save-user-activity`,
		{ activityData }
	);
	return checkAPIErrors(result);
};

// export const expireCurrentUserSubscription = async (subId) => {
// 	const result = await apiClient.post(
// 		`${SUBSCRIPTION_ENDPOINT_PREFIX}/expire-subscription`,
// 		{ subscriptionId: subId }
// 	);
// 	return checkAPIErrors(result);
// };

// export const createCurrentUserSubscription = async (subscriptionData) => {
// 	const result = await apiClient.post(
// 		`${SUBSCRIPTION_ENDPOINT_PREFIX}/create-subscription`,
// 		{ subscriptionData }
// 	);
// 	return checkAPIErrors(result);
// };
