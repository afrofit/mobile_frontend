import useApi from "../../hooks/useApi";
import subscriptionApi from "./subscriptionApi";

export const getCurrentUserSubscription = async () => {
	const result = await getSubscriptionApi.request();

	if (!result.ok) {
		if (result.data) {
			setError(result.data);
			console.error("error", result.data);
		} else {
			setError("An unexpected error occurred.");
			console.error("error", result.data);
		}
		return;
	}
	return result.data;
};

export const expireUserSubscription = async (subscriptionId) => {
	const result = await expireSubscriptionApi.request(subscriptionId);

	if (!result.ok) {
		if (result.data) {
			setError(result.data);
			console.error("error", result.data);
		} else {
			setError("An unexpected error occurred.");
			console.error("error", result.data);
		}
		return;
	}
	return result.data;
};
