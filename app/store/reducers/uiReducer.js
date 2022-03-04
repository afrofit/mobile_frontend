import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	requestsLoading: 0,
	showGenericErrorDialog: undefined,
	videoLoading: false,
};

const uiSlice = createSlice({
	name: "ui",
	initialState,
	reducers: {
		newRequest(state, { payload }) {
			state.requestsLoading = state.requestsLoading + 1;
		},
		finishedRequest(state, { payload }) {
			state.requestsLoading = state.requestsLoading - 1;
		},
		showGenericErrorDialog(state, { payload }) {
			state.showGenericErrorDialog = payload;
		},
		hideGenericErrorDialog(state, { payload }) {
			state.showGenericErrorDialog = undefined;
		},
		setVideoLoading(state, { payload }) {
			state.videoLoading = payload;
		},
	},
});

export const {
	newRequest,
	setVideoLoading,
	finishedRequest,
	showGenericErrorDialog,
	hideGenericErrorDialog,
} = uiSlice.actions;

export const selectUiIsLoading = (state) => state.ui.requestsLoading > 0;
export const selectVideoLoading = (state) => state.ui.videoLoading;

export const selectShowGenericErrorDialog = (state) =>
	state.ui.showGenericErrorDialog;

export default uiSlice.reducer;
