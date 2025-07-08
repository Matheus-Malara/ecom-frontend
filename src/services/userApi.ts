import api from "./axiosInstance";
import type {User} from "@/types/user";
import type {StandardResponse} from "@/types/api-response";

export async function getAccount(): Promise<User> {
    const response = await api.get<StandardResponse<User>>("/users/me");
    return response.data.data;
}

export async function updateAccount(data: Partial<Pick<User, "firstName" | "lastName">>): Promise<User> {
    const response = await api.put<StandardResponse<User>>("/users/me", data);
    return response.data.data;
}
