import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentStory: null,
	currentChapter: null,
	currentChapters: null,
	stories: null,
};

const contentSlice = createSlice({
	name: "content",
	initialState,
	reducers: {
		setAllStories(state, { payload }) {
			state.stories = payload;
		},
		setCurrentStory(state, { payload }) {
			state.currentStory = payload;
		},

		setCurrentChapters(state, { payload }) {
			state.currentChapters = payload;
		},
		setCurrentChapter(state, { payload }) {
			const result = state.currentChapters.find(
				(chapter) => chapter.contentChapterId === payload
			);
			state.currentChapter = result;
		},
		updateCurrentChapters(state, { payload }) {
			if (payload) {
				const currentChapters = state.currentChapters;

				const filterQuery = payload.contentChapterId;

				const chapterToUpdate = currentChapters.find(
					(chapter) => chapter.contentChapterId === filterQuery
				);

				const updatedChapter = { ...chapterToUpdate, ...payload };

				const remainingChapters = state.currentChapters.filter(
					(chapter) => chapter.contentChapterId != filterQuery
				);

				const newArray = [...remainingChapters, updatedChapter].sort((a, b) =>
					a.chapterOrder < b.chapterOrder
						? -1
						: Number(a.chapterOrder > b.chapterOrder)
				);

				state.currentChapters = newArray;
			} else {
				state.currentChapters = state.currentChapters;
			}
		},
		updateCurrentChapter(state, { payload }) {
			state.currentChapter = { ...state.currentChapter, ...payload };
		},
		updateCurrentStory(state, { payload }) {
			state.currentStory = { ...state.currentStory, ...payload };
		},
		unsetCurrentStory(state, { payload }) {
			state.currentStory = null;
		},
		unsetCurrentChapters(state, { payload }) {
			state.currentChapters = null;
		},
		unsetCurrentChapter(state, { payload }) {
			state.currentChapters = null;
		},
	},
});

export const {
	setAllStories,
	setCurrentStory,
	setCurrentChapter,
	setCurrentChapters,
	updateCurrentChapter,
	updateCurrentChapters,
	updateCurrentStory,
	unsetCurrentStory,
	unsetCurrentChapter,
	unsetCurrentChapters,
} = contentSlice.actions;

/** Selectors */

export const getAllStories = (state) => state.content.stories;
export const getCurrentStory = (state) => state.content.currentStory;
export const getCurrentStoryChapter = (state) => state.content.currentChapter;
export const getCurrentStoryChapters = (state) => state.content.currentChapters;

/** Reducers */

export default contentSlice.reducer;
