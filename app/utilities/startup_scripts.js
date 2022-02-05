import authStorage from "../api/storage";

export const restoreStoredCurrentUser = async () => {
	const user = await authStorage.getUser();
	return user ? user : null;
};
