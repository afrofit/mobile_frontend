import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	topPerformers: null, //should be 200 in total
	rookiePerformers: null,
	corePerformers: null,
	superPerformers: null,
	peakPerformers: null,
	superstarPerformers: null,
};

const marathonSlice = createSlice({
	name: "marathon",
	initialState,
	reducers: {
		setTopPerformers(state, { payload }) {
			state.topPerformers = payload;
		},
		setRookiePerformers(state, { payload }) {
			state.rookiePerformers = payload;
		},
		setCorePerformers(state, { payload }) {
			state.corePerformers = payload;
		},
		setSuperPerformers(state, { payload }) {
			state.superPerformers = payload;
		},
		setPeakPerformers(state, { payload }) {
			state.peakPerformers = payload;
		},
		setSuperstartPerformers(state, { payload }) {
			state.superstarPerformers = payload;
		},
		unsetTopPerformeers(state, { payload }) {
			state.topPerformers = null;
		},
	},
});

/** Actions */
export const {
	setTopPerformers,
	setRookiePerformers,
	setCorePerformers,
	setSuperPerformers,
	setPeakPerformers,
	setSuperstartPerformers,
	unsetTopPerformeers,
} = marathonSlice.actions;

/** Selectors */
export const getTopPerformers = (state) => state.marathon.topPerformers;
export const getRookiePerformers = (state) => state.marathon.rookiePerformers;
export const getCorePerformers = (state) => state.marathon.corePerformers;
export const getSuperPerformers = (state) => state.marathon.superPerformers;
export const getPeakPerformers = (state) => state.marathon.peakPerformers;
export const getSuperstartPerformers = (state) =>
	state.marathon.superstarPerformers;

/** Reducer */
export default marathonSlice.reducer;
