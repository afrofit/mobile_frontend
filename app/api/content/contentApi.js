import apiClient from "../client";

export const getStories = () => apiClient.get("/content/get-stories");

export const getStoryDetails = (storyId) =>
	apiClient.get(`/content/get-story-detail/${storyId}`);

export default {
	getStories,
	getStoryDetails,
};
