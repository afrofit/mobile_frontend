import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { performanceReducer } from "./reducers/activityReducer";
import { rankingsReducer } from "./reducers/rankingsReducer";
import { subscriptionReducer } from "./reducers/subscriptionReducer";
import { userReducer } from "./reducers/userReducer";

const rootReducer = combineReducers({
	user: userReducer,
	activity: performanceReducer,
	rankings: rankingsReducer,
	subscription: subscriptionReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
