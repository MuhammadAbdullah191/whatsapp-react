export const errHandler = (err) => {
	console.log(err)
	if (err?.response?.status == 401) {
		localStorage.clear();
		window.location.href = '/login';
	}
};
