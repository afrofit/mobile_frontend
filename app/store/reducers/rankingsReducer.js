import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUserRank: 1,
};

const rankingsSlice = createSlice({
	name: "rankings",
	initialState,
	reducers: {
		setCurrentUserRank(state, { payload }) {
			state.currentUserRank = payload;
		},
	},
});

export const { setCurrentUserRank } = rankingsSlice.actions;

/* *Selectors */
export const getCurrentUserRank = (state) => state.rankings.currentUserRank;

export default rankingsSlice.reducer;
