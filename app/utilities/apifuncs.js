export const checkAPIErrors = (result) => {
	if (!result.ok) {
		if (result.data) {
			return result.data;
		} else {
			return "An unexpected error occurred.";
		}
	}
	return result.data;
};
