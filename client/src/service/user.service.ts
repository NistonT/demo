import { axiosWithAuto } from "@/api/interceptors";
import { IUser, TypeUserForm } from "@/types/auth.types";
class UserService {
	private BASE_URL = "/user";

	public async getUserId() {
		const response = await axiosWithAuto.get<IUser>(`${this.BASE_URL}/user_id`);
		return response;
	}

	public async update(data: TypeUserForm) {
		const response = await axiosWithAuto.put(`${this.BASE_URL}/update`, data);
		return response;
	}

	public async updateApi() {
		const response = await axiosWithAuto.put(`${this.BASE_URL}/api_key`);
		return response;
	}
}

export const userService = new UserService();
