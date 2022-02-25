import { getStories, getStoryDetails } from "../../api/content/contentApi";
import {
	setAllStories,
	setCurrentChapters,
	setCurrentStory,
} from "../reducers/contentReducer";
import {
	finishedRequest,
	hideGenericErrorDialog,
	newRequest,
	showGenericErrorDialog,
} from "../reducers/uiReducer";

/** Fetch home screen stories */

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

					const { chapters, story } = data;

					const sortedChapters = chapters.sort((a, b) =>
						a.chapterOrder < b.chapterOrder
							? -1
							: Number(a.chapterOrder > b.chapterOrder)
					);

					dispatch(setCurrentChapters(sortedChapters));
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
