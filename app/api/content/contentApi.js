import apiClient from "../client";

export const getStories = () => apiClient.get("/content/get-stories");

export const getStoryDetails = (storyId) =>
	apiClient.get(`/content/get-story-detail/${storyId}`);

export const getChapterDetails = (storyId, chapterId) =>
	apiClient.get(`/content/get-chapter-detail/${storyId}/${chapterId}`);

export default {
	getChapterDetails,
	getStories,
	getStoryDetails,
};
