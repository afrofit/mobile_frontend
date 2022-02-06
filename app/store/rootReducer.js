import { combineReducers } from "redux";

import performanceReducer from "./reducers/activityReducer";
import subscriptionReducer from "./reducers/subscriptionReducer";
import userReducer from "./reducers/userReducer";
import rankingsReducer from "./reducers/rankingsReducer";

export const rootReducer = combineReducers({
	user: userReducer,
	activity: performanceReducer,
	subscription: subscriptionReducer,
	rankings: rankingsReducer,
});
