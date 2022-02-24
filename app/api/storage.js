import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

const key = "authToken";
const resetKey = "authResetToken";

const storeToken = async (authToken) => {
	try {
		SecureStore.setItemAsync(key, authToken);
	} catch (error) {
		console.error("Error storing AuthToken!", error);
	}
};

const getToken = async () => {
	try {
		return await SecureStore.getItemAsync(key);
	} catch (error) {
		console.error("Error fetching AuthToken!", error);
	}
};

const getUser = async () => {
	const token = await getToken();
	if (token) {
		const user = jwtDecode(token);
		return user;
	}
	return null;
};

const removeToken = async () => {
	try {
		await SecureStore.deleteItemAsync(key);
	} catch (error) {
		console.error("Error Removing AuthToken!");
	}
};

/** Reset Token Flow */

const getResetToken = async () => {
	try {
		return await SecureStore.getItemAsync(resetKey);
	} catch (error) {
		console.error("Error fetching AuthResetToken!", error);
	}
};

const storeResetToken = async (authResetToken) => {
	try {
		SecureStore.setItemAsync(resetKey, authResetToken);
	} catch (error) {
		console.error("Error storing ResetAuthToken!", error);
	}
};

const removeResetToken = async () => {
	try {
		await SecureStore.deleteItemAsync(resetKey);
	} catch (error) {
		console.error("Error removing ResetAuthToken!");
	}
};

export default {
	getToken,
	getUser,
	removeToken,
	storeToken,
	getResetToken,
	storeResetToken,
	removeResetToken,
};
