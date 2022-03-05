import apiClient from "../client";

// Save user activity
const saveUserActivity = (activityData) =>
	apiClient.post("/performance/save-user-activity", { activityData });

const saveUserDailyActivity = (dailyActivityData) =>
	apiClient.post("/performance/save-user-daily-activity", {
		dailyActivityData,
	});

const saveUserPerformanceActivity = (performanceData) =>
	apiClient.post("/performance/save-user-performance-data", {
		performanceData,
	});

const saveUserContentPlayedActivity = (contentPlayedData) =>
	apiClient.post("/performance/save-user-content-played", {
		contentPlayedData,
	});

const resetStoryContentActivity = (resetContentData) =>
	apiClient.post("/performance/reset-story-content-activity", {
		resetContentData,
	});

const getUserActivity = () => apiClient.get("/performance/get-user-activity");

const getUserdailyActivity = () =>
	apiClient.get("/performance/get-user-daily-activity");

const getUserPerformanceData = () =>
	apiClient.get("/performance/get-user-performance-data");

// Marathon Stuff
const getCurrentMarathonData = () =>
	apiClient.get("/marathon/get-current-marathon-data");

const saveMarathonData = (data) =>
	apiClient.save("/marathon/save-user-marathon-activity", { data });

export default {
	saveUserDailyActivity,
	saveUserPerformanceActivity,
	saveUserActivity,
	saveUserContentPlayedActivity,
	getUserActivity,
	getUserdailyActivity,
	getUserPerformanceData,
	resetStoryContentActivity,
	getCurrentMarathonData,
	saveMarathonData,
};
