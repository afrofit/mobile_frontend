import apiClient from "../client";

// Save user activity
const saveUserActivity = (activityData) =>
	apiClient.post("/performance/save-user-activity", { activityData });

export default { saveUserActivity };
