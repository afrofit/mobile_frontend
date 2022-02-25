import { combineReducers } from "redux";

import performanceReducer from "./reducers/activityReducer";
import subscriptionReducer from "./reducers/subscriptionReducer";
import userReducer from "./reducers/userReducer";
import rankingsReducer from "./reducers/rankingsReducer";
import contentReducer from "./reducers/contentReducer";
import uiReducer from "./reducers/uiReducer";
import resetPasswordReducer from "./reducers/resetPasswordReducer";

export const rootReducer = combineReducers({
	user: userReducer,
	activity: performanceReducer,
	subscription: subscriptionReducer,
	rankings: rankingsReducer,
	content: contentReducer,
	ui: uiReducer,
	resetPassword: resetPasswordReducer,
});
