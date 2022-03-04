import {
	getChapterDetails,
	getStories,
	getStoryDetails,
} from "../../api/content/contentApi";
import {
	setAllStories,
	setCurrentChapter,
	setCurrentChapters,
	setCurrentStory,
} from "../reducers/contentReducer";
import {
	finishedRequest,
	hideGenericErrorDialog,
	newRequest,
	showGenericErrorDialog,
} from "../reducers/uiReducer";

/** Fetch details for story intro */

export function storyDetailsFetch(storyId) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		getStoryDetails(storyId)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;
				dispatch(finishedRequest());
				if (data && ok) {
					const { data } = response;

					const { story } = data;

					return dispatch(setCurrentStory(story));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't fetch data. Retry?"));
					throw new Error("Error. Cannot fetch data.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

export function storyChaptersFetch(storyId) {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		getStoryDetails(storyId)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;
				dispatch(finishedRequest());
				if (data && ok) {
					const { data } = response;

					const { chapters } = data;

					const sortedChapters = chapters.sort((a, b) =>
						a.chapterOrder < b.chapterOrder
							? -1
							: Number(a.chapterOrder > b.chapterOrder)
					);

					return dispatch(setCurrentChapters(sortedChapters));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't fetch data. Retry?"));
					throw new Error("Error. Cannot fetch data.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

export function chapterDetailsFetch(storyId, chapterId) {
	return async (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		getChapterDetails(storyId, chapterId)
			.then((response) => {
				dispatch(finishedRequest());
				return response;
			})
			.then((response) => {
				const { data, ok } = response;
				if (data && ok) {
					const { data } = response;
					return dispatch(setCurrentChapter(data));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't fetch data. Retry?"));
					throw new Error("Error. Cannot fetch data.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}

/** Fetch all stories for home page */
export function storiesFetchAll() {
	return (dispatch) => {
		dispatch(newRequest());
		dispatch(hideGenericErrorDialog());
		getStories()
			.then((response) => {
				const { data, ok } = response;
				dispatch(finishedRequest());
				if (data && ok) {
					const { data } = response;

					const sortedStories = data.sort((a, b) =>
						a.storyOrderNumber < b.storyOrderNumber
							? -1
							: Number(a.storyOrderNumber > b.storyOrderNumber)
					);

					return dispatch(setAllStories(sortedStories));
				} else if (!ok && data) {
					throw new Error(data);
				} else {
					dispatch(showGenericErrorDialog("Can't fetch data. Retry?"));
					throw new Error("Error. Cannot fetch data.");
				}
			})
			.catch((error) => {
				dispatch(showGenericErrorDialog(error.message));
				console.error(error);
			});
	};
}
