import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import {
	setSubscription,
	resetSubscription,
	UNSUBSCRIBED,
} from "../store/reducers/subscriptionReducer";

import authStorage from "../api/storage";
import { setCurrentUser } from "../store/reducers/userReducer";

const useSubscription = () => {
	const dispatch = useDispatch();

	const blankSubscription = {
		amountInGBP: 0,
		endDate: "",
		id: "",
		isExpired: true,
		name: UNSUBSCRIBED,
		createdAt: "",
	};

	const createSubscription = (authToken, subscription = blankSubscription) => {
		const newUser = jwtDecode(authToken);
		try {
			dispatch(setCurrentUser(newUser));
			dispatch(setSubscription(subscription));
			authStorage.storeToken(authToken);
		} catch (error) {
			console.error(error);
		}
	};

	const resetCurrentSubscription = () => {
		dispatch(resetSubscription());
	};
	return { resetCurrentSubscription, createSubscription };
};

export default useSubscription;
