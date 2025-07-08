import api from "./axiosInstance";

interface LoginRequest {
    email: string;
    password: string;
}

interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post("/auth/login", data, {
        headers: {
            "X-Anonymous-Id": localStorage.getItem("anonymousId") || "",
        },
    });
    return response.data.data;
}
