import apiClient from "../client";

export const subscriptionCreate = (subscriptionData) =>
	apiClient.post("/subscription/create-subscription", { subscriptionData });

export const subscriptionCancel = (subscriptionId) =>
	apiClient.post("/subscription/expire-subscription", {
		subscriptionId,
	});

export const getCurrentUserSubscription = () =>
	apiClient.get("/subscription/get-subscription");

export default {
	subscriptionCreate,
	subscriptionCancel,
	getCurrentUserSubscription,
};
