import activityApi from "../../api/activity/activityApi";
import { setContentUpdated } from "../reducers/activityReducer";
import {
	setTopPerformers,
	setUserMarathonScore,
} from "../reducers/marathonReducer";
import {
	finishedRequest,
	hideGenericErrorDialog,
	newRequest,
	showGenericErrorDialog,
} from "../reducers/uiReducer";

export function fetchTopPerformers() {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		activityApi
			.getCurrentMarathonData()
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;

				if (data && ok) {
					return dispatch(setTopPerformers(data));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't fetch marathon data."));
					throw new Error("Cannot fetch marathon data.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

export function saveUserMarathonData(data) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		activityApi
			.saveMarathonData(data)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;

				if (data && ok) {
					return dispatch(setContentUpdated(true));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't update marathon scores."));
					throw new Error("Cannot update marathon scoress.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

export function initializeUserMarathonScore() {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		activityApi
			.initializeCurrentUserMarathonData()
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;

				if (data && ok) {
					// console.log("Marathon Initialized?", data);
					return dispatch(setUserMarathonScore(data));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't fetch marathon data."));
					throw new Error("Cannot fetch marathon data.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}
