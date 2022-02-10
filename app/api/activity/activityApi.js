import apiClient from "../client";

// Save user activity
const saveUserActivity = (activityData) =>
	apiClient.post("/performance/save-user-activity", { activityData });

const getUserActivity = () => {
	apiClient.get("/performance/get-user-activity");
};

export default { saveUserActivity, getUserActivity };
