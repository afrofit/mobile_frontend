import { checkAPIErrors } from "../../utilities/apifuncs";
import apiClient from "../client";

const SUBSCRIPTION_ENDPOINT_PREFIX = "/subscription";

export const fetchCurrentUserSubscription = async () => {
	const result = await apiClient.get(
		`${SUBSCRIPTION_ENDPOINT_PREFIX}/get-subscription`
	);
	return checkAPIErrors(result);
};

export const expireCurrentUserSubscription = async (subId) => {
	const result = await apiClient.post(
		`${SUBSCRIPTION_ENDPOINT_PREFIX}/expire-subscription`,
		{ subscriptionId: subId }
	);
	return checkAPIErrors(result);
};

export const createCurrentUserSubscription = async (subscriptionData) => {
	const result = await apiClient.post(
		`${SUBSCRIPTION_ENDPOINT_PREFIX}/create-subscription`,
		{ subscriptionData }
	);
	return checkAPIErrors(result);
};
