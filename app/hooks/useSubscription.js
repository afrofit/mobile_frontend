import { useDispatch } from "react-redux";
import { startSubscription } from "../store/reducers/subscriptionReducer";

const useSubscription = () => {
	const dispatch = useDispatch();

	const createSubscription = (subscription) => {
		dispatch(startSubscription(subscription));
	};
	return { createSubscription };
};

export default useSubscription;
