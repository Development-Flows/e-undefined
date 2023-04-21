import axios from "axios";

function setupAxios(store) {
	const baseUrl = "https://e-undefined-service.onrender.com";

	axios.interceptors.request.use((config) => {
		const { accessToken } = store.getState().user;
		config.baseURL = baseUrl;
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	});

	axios.interceptors.response.use(
		(response) => {
			return response.data;
		},
		(err) => {
			if (err?.response?.status === 401) {
				// Token verify edilemedi, kullancıyı logout yap.
				try {
				} catch (e) {
					console.log("logout olurken hata oluştu");
				}
			} else {
				return err;
			}
		}
	);
}

export default setupAxios;
