import apiClient from "../client";

// Create a new subscription
const createSubscription = (subscriptionData) =>
	apiClient.post("/subscription/create-subscription", { subscriptionData });

const cancelSubscription = (subscriptionId) =>
	apiClient.delete("/subscription/expire-subscription", { subscriptionId });

const getCurrentSubscription = () =>
	apiClient.get("/subscription/get-subscription");

export default {
	createSubscription,
	cancelSubscription,
	getCurrentSubscription,
};
