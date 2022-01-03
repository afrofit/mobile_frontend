import apiClient from "../client";

// Create a new subscription
const createSubscription = (subscriptionData) =>
	apiClient.post("/subscription/create-subscription", { subscriptionData });

export default {
	createSubscription,
};
