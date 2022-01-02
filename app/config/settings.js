import Constants from "expo-constants";

const settings = {
	dev: {
		apiUrl: "http://192.168.1.102:4040/api",
	},
	staging: {
		apiUrl: "https://afrofit-server-new-rgef3.ondigitalocean.app/api",
	},
	prod: {
		apiUrl: "https://afrofit-server-new-rgef3.ondigitalocean.app/api",
	},
};

const getCurrentSettings = () => {
	if (__DEV__) return settings.dev;
	if (Constants.manifest.releaseChannel === "staging") return settings.staging;
	return settings.prod;
};

export default getCurrentSettings();
