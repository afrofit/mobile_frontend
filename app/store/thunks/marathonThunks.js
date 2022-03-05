import activityApi from "../../api/activity/activityApi";
import { setContentUpdated } from "../reducers/activityReducer";
import {
	setCorePerformers,
	setPeakPerformers,
	setRookiePerformers,
	setSuperPerformers,
	setSuperstartPerformers,
	setTopPerformers,
} from "../reducers/marathonReducer";

export function fetchTopPerformers() {
	return (dispatch) => {
		activityApi
			.getCurrentMarathonData()
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;

				if (data && ok) {
					//separate the data and put in the right buckets
					dispatch(setRookiePerformers(data));
					dispatch(setCorePerformers(data));
					dispatch(setSuperPerformers(data));
					dispatch(setPeakPerformers(data));
					dispatch(setSuperstartPerformers(data));
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

export function updateTopPerformers() {
	return (dispatch) => {
		activityApi
			.saveMarathonData()
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
