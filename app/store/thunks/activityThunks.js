import activityApi from "../../api/activity/activityApi";
import { saveUserActivity } from "../../api/activity/activityThunkControllers";
import {
	initializeTotalUserActivity,
	resetUserDailyActivity,
	setContentUpdated,
	setUserDailyActivity,
	setUserPerformanceData,
} from "../reducers/activityReducer";
import {
	setCurrentStory,
	updateCurrentChapter,
	updateCurrentChapters,
	updateCurrentStory,
} from "../reducers/contentReducer";
import { finishedRequest, showGenericErrorDialog } from "../reducers/uiReducer";

/**Thunks */

export function fetchUserDailyActivity() {
	return (dispatch) => {
		activityApi
			.getUserdailyActivity()
			.then((response) => {
				// console.log("Save Daily Data", response.data);
				const { data, ok } = response;

				if (data && ok) {
					const { bodyMoves, caloriesBurned } = data;
					// console.log("DAily Activity Data", bodyMoves, caloriesBurned);
					return dispatch(
						setUserDailyActivity({
							bodyMoves,
							caloriesBurned,
						})
					);
				} else if (!ok && data) {
					dispatch(resetUserDailyActivity());
					throw new Error(data);
				} else {
					dispatch(resetUserDailyActivity());
					dispatch(showGenericErrorDialog("Can't save your daily activity."));
					throw new Error("Error. Cannot log in.");
				}
			})

			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

export function storeUserDailyActivityData(payload) {
	return (dispatch) => {
		activityApi
			.saveUserDailyActivity(payload)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				// console.log("Save Daily Data", response.data);
				const { data, ok } = response;

				if (data && ok) {
					const { bodyMoves, caloriesBurned } = data;
					return dispatch(setUserDailyActivity({ bodyMoves, caloriesBurned }));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't save your daily activity."));
					throw new Error("Error. Cannot log in.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

export function fetchUserPerformanceData() {
	return (dispatch) => {
		activityApi
			.getUserPerformanceData()
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				// console.log("Performance Data", response.data);
				const { data, ok } = response;

				if (data && ok) {
					return dispatch(setUserPerformanceData(response.data));
				} else if (!ok && data) {
					dispatch(resetUserDailyActivity());
					throw new Error(data);
				} else {
					dispatch(resetUserDailyActivity());
					dispatch(showGenericErrorDialog("Can't save your daily activity."));
					throw new Error("Error. Cannot log in.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

export function storeUserPerformanceData(payload) {
	return (dispatch) => {
		activityApi
			.saveUserPerformanceActivity(payload)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				// console.log("Save Performance Data", response.data);
				const { data, ok } = response;

				if (data && ok) {
					const {
						bodyMoves,
						caloriesBurned,
						totalTimeDancedInMilliseconds,
						totalDaysActive,
					} = data;
					return dispatch(
						setUserPerformanceData({
							bodyMoves,
							caloriesBurned,
							totalTimeDancedInMilliseconds,
							totalDaysActive,
						})
					);
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't save your daily activity."));
					throw new Error("Error. Cannot log in.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}
export function storeUserContentActivityData(payload) {
	return (dispatch) => {
		console.log("Chapter Order Number", payload.chapterOrderNumber);
		activityApi
			.saveUserContentPlayedActivity(payload)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;

				if (data && ok) {
					dispatch(updateCurrentStory(data.story));
					dispatch(updateCurrentChapters(data.chapter));
					return dispatch(setContentUpdated(true));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't save your daily activity."));
					throw new Error("Error. Cannot log in.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

export function resetStoryContentActivityData(payload) {
	return (dispatch) => {
		console.log("Chapter Order Number", payload.chapterOrderNumber);
		activityApi
			.resetStoryContentActivity(payload)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;

				if (data && ok) {
					dispatch(updateCurrentStory(data.story));
					dispatch(updateCurrentChapters(data.chapters));
					return dispatch(setContentUpdated(true));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't reset this story."));
					throw new Error("Cannot reset this story.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

export function saveUserActivityData(payload) {
	return (dispatch) => {
		saveUserActivity(payload)
			.then((response) => {
				// console.log("Activity response from Thunk", res);
				const { chapter, daily, story, performance } = response;
				// console.log("Story from Thunk", story);
				console.log("For upstreaming...");
				const {
					totalCaloriesBurned,
					totalBodyMoves,
					totalTimeDancedInMilliseconds,
					totalDaysActive,
				} = performance;
				const { bodyMoves, caloriesBurned } = daily;
				dispatch(updateCurrentChapters(payload));
				dispatch(
					initializeTotalUserActivity({
						totalCaloriesBurned,
						totalBodyMoves,
						totalTimeDancedInMilliseconds,
						totalDaysActive,
					})
				);
				dispatch(
					setUserDailyActivity({
						bodyMoves,
						caloriesBurned,
					})
				);
				return dispatch(updateCurrentChapter(chapter));
			})
			.catch((error) => console.error(error));
	};
}
