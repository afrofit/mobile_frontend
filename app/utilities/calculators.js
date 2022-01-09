export const calculateSubscriptionEnd = (startDate, duration) => {
	const date = new Date(startDate);
	const result = date.setDate(date.getDate() + duration);
	return new Date(result).toDateString();
};
