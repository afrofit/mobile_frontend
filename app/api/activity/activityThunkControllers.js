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

export const fetchUserActivity = async () => {
	const result = await apiClient.get(
		`${ACTIVITY_ENDPOINT_PREFIX}/get-user-activity`
	);
	return checkAPIErrors(result);
};

export const saveUserActivity = async (activityData) => {
	const result = await apiClient.post(
		`${ACTIVITY_ENDPOINT_PREFIX}/save-user-activity`,
		{ activityData }
	);
	return checkAPIErrors(result);
};
