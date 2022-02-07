import apiClient from "../client";

const getStories = () => apiClient.get("/content/get-stories-content");

const getStoryDetails = () =>
	apiClient.get(`/content/get-story-detail/${storyId}`);

export default {
	getStories,
	getStoryDetails,
};
