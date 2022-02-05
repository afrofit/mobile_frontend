import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import authStorage from "../../api/storage";

const initialState = {
	currentUser: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCurrentUser(state, { payload }) {
			state.currentUser = payload;
		},
		setCurrentUserAsync(state, { payload }) {
			setTimeout(() => (state.currentUser = payload), 2000);
		},
		unsetCurrentUser(state, { payload }) {
			state.currentUser = payload;
		},
	},
});

export const { setCurrentUser, setCurrentUserAsync, unsetCurrentUser } =
	userSlice.actions;

/**Selectors */
export const getCurrentUser = (state) => state.user.currentUser;

/**Reducers */
export default userSlice.reducer;
