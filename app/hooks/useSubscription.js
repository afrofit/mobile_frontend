import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import {
	setSubscription,
	resetSubscription,
} from "../store/reducers/subscriptionReducer";

import authStorage from "../api/storage";
import { setCurrentUser } from "../store/reducers/userReducer";

const useSubscription = () => {
	const dispatch = useDispatch();

	const updateSubscribedUser = (authToken) => {
		const newUser = jwtDecode(authToken);
		try {
			dispatch(setCurrentUser(newUser));
			authStorage.storeToken(authToken);
		} catch (error) {
			console.error(error);
		}
	};

	const createSubscription = (subscription) => {
		dispatch(setSubscription(subscription));
	};

	const resetCurrentSubscription = () => {
		dispatch(resetSubscription());
	};
	return { createSubscription, resetCurrentSubscription, updateSubscribedUser };
};

export default useSubscription;
