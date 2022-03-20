import apiClient from "../client";
import { create } from "apisauce";

import { REVCAT_API_KEY } from "@env";

/** RevenueCat API Stuff */

const revenueCatApiClient = create({
	baseURL: "https://api.revenuecat.com/v1/subscribers",
	timeout: 10000,
	timeoutErrorMessage: "RevenueCat Network Error",
});

revenueCatApiClient.addAsyncRequestTransform(async (request) => {
	request.headers["Authorization"] = `Bearer ${REVCAT_API_KEY}`;
	request.headers["Content-Type"] = "application/json";
});

export const subscriptionCreate = (subscriptionData) =>
	apiClient.post("/subscription/create-subscription", { subscriptionData });

export const subscriptionCancel = (subscriptionId) =>
	apiClient.post("/subscription/expire-subscription", {
		subscriptionId,
	});

export const subscriptionCancelAndroid = (userId, productIdentifier) => {
	revenueCatApiClient.post(
		`${userId}/subscriptions/${productIdentifier}/revoke`,
		{}
	);
};

export const getCurrentUserSubscription = () =>
	apiClient.get("/subscription/get-subscription");

export default {
	subscriptionCreate,
	subscriptionCancel,
	getCurrentUserSubscription,
	subscriptionCancelAndroid,
};
