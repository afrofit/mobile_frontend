import apiClient from "../client";

// Create a new subscription
const createSubscription = (subscriptionData) =>
	apiClient.post("/subscription/create-subscription", { subscriptionData });

const cancelSubscription = (subId) =>
	apiClient.post("/subscription/expire-subscription", {
		subscriptionId: subId,
	});

const getCurrentSubscription = () =>
	apiClient.get("/subscription/get-subscription");

export default {
	createSubscription,
	cancelSubscription,
	getCurrentSubscription,
};
