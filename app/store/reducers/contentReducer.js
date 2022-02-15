import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentStory: null,
	currentChapter: null,
	currentChapters: null,
};

const contentSlice = createSlice({
	name: "content",
	initialState,
	reducers: {
		setCurrentStory(state, { payload }) {
			state.currentStory = payload;
		},
		setCurrentChapters(state, { payload }) {
			state.currentChapters = payload;
		},
		setCurrentChapter(state, { payload }) {
			state.currentChapter = state.currentChapters.find(
				(chapter) => chapter.contentChapterId === payload
			);
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
	setCurrentStory,
	setCurrentChapter,
	setCurrentChapters,
	unsetCurrentStory,
	unsetCurrentChapter,
	unsetCurrentChapters,
} = contentSlice.actions;

/**Selectors */
export const getCurrentStory = (state) => state.content.currentStory;
export const getCurrentStoryChapter = (state) => state.content.currentChapter;
export const getCurrentStoryChapters = (state) => state.content.currentChapters;

/**Reducers */
export default contentSlice.reducer;
