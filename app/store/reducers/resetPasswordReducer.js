import { createSlice } from "@reduxjs/toolkit";

export const stages = Object.freeze({
	REQUEST_LINK: "REQUEST_LINK",
	VERIFY: "VERIFY",
	RESET: "RESET",
});

const initialState = {
	stage: stages.REQUEST_LINK,
};

const resetPasswordSlice = createSlice({
	name: "resetPassword",
	initialState,
	reducers: {
		switchStage(state, { payload }) {
			state.stage = payload;
		},
	},
});

export const { switchStage } = resetPasswordSlice.actions;

export const getStage = (state) => state.resetPassword.stage;

/** Reducers */
export default resetPasswordSlice.reducer;
