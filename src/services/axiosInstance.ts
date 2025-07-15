import axios from "axios";

const api = axios.create({
    baseURL: "/api",
});

let isRefreshing = false;
let failedQueue: {
    resolve: (value?: unknown) => void;
    reject: (error: unknown) => void;
}[] = [];

function processQueue(error: unknown, token: string | null = null) {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });

    failedQueue = [];
}

api.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");
        const anonymousId = localStorage.getItem("anonymousId");

        const isAuthRequest =
            config.url?.includes("/auth/login") || config.url?.includes("/auth/refresh");

        if (!isAuthRequest && accessToken && config.headers) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        if (anonymousId && config.headers) {
            config.headers["X-Anonymous-Id"] = anonymousId;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            localStorage.getItem("refreshToken")
        ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            isRefreshing = true;
            const refreshToken = localStorage.getItem("refreshToken");

            try {
                const response = await axios.post("/api/auth/refresh", {
                    refreshToken,
                });

                const newAccessToken = response.data.data.accessToken;
                const newRefreshToken = response.data.data.refreshToken;

                localStorage.setItem("accessToken", newAccessToken);
                localStorage.setItem("refreshToken", newRefreshToken);

                processQueue(null, newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);
            } catch (err) {
                processQueue(err, null);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;
