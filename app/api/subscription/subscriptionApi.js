import apiClient from "../client";

export const subscriptionCreate = (subscriptionData) =>
	apiClient.post("/subscription/create-subscription", { subscriptionData });

export const subscriptionCancel = (subId) =>
	apiClient.post("/subscription/expire-subscription", {
		subscriptionId: subId,
	});

export const getCurrentSubscription = () =>
	apiClient.get("/subscription/get-subscription");

export default {
	subscriptionCreate,
	subscriptionCancel,
	getCurrentSubscription,
};
