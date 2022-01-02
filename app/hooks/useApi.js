import * as React from "react";

export default useApi = (apiFunc) => {
	const [data, setData] = React.useState([]);
	const [error, setError] = React.useState(false);
	const [loading, setLoading] = React.useState(false);

	const request = async (...args) => {
		setLoading(true);
		const response = await apiFunc(...args);
		setLoading(false);

		setError(!response.ok);
		setData(response.data);
		return response;
	};
	return { data, error, loading, request };
};
