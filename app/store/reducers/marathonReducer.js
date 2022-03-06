import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	topPerformers: null, //should be 200 in total
	userMarathonScore: null,
};

const marathonSlice = createSlice({
	name: "marathon",
	initialState,
	reducers: {
		setTopPerformers(state, { payload }) {
			state.topPerformers = payload;
		},
		setUserMarathonScore(state, { payload }) {
			state.userMarathonScore = payload;
		},
		unsetTopPerformeers(state, { payload }) {
			state.topPerformers = null;
		},
	},
});

/** Actions */
export const { setTopPerformers, unsetTopPerformeers, setUserMarathonScore } =
	marathonSlice.actions;

/** Selectors */
export const getTopPerformers = (state) => state.marathon.topPerformers;
export const getUserMarathonScore = (state) => state.marathon.userMarathonScore;

/** Reducer */
export default marathonSlice.reducer;
