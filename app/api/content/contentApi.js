import apiClient from "../client";

const getStories = () => apiClient.get("/content/get-stories");

const getStoryDetails = (storyId) =>
	apiClient.get(`/content/get-story-detail/${storyId}`);

export default {
	getStories,
	getStoryDetails,
};
