import { createSlice } from "@reduxjs/toolkit";

// const currentStory = {
//     storyOrderNumber: null,
//     thumb: "",
//     url: "",
//     introVideo: {
//         width: null,
//         height: null,
//     },
//     chapters: [],
//     description: "",
// }

const initialState = {
	currentStory: null,
};

const contentSlice = createSlice({
	name: "content",
	initialState,
	reducers: {
		setCurrentStory(state, { payload }) {
			state.currentStory = payload;
		},
		unsetCurrentStory(state, { payload }) {
			state.currentStory = null;
		},
	},
});

export const { setCurrentStory, unsetCurrentStory } = contentSlice.actions;

/**Selectors */
export const getCurrentStory = (state) => state.content.currentStory;

/**Reducers */
export default contentSlice.reducer;
