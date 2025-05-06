import { axiosWithAuto } from "@/api/interceptors";
import { CreateRoleResponse, RoleResponse } from "@/types/role.types";
import { AxiosResponse } from "axios";

class RoleService {
	private BASE_URL = "/role";
	private QUERY_ID = "?id=";

	public async createRole(
		data: CreateRoleResponse
	): Promise<AxiosResponse<RoleResponse>> {
		const response = await axiosWithAuto.post<RoleResponse>(
			`${this.BASE_URL}`,
			data
		);

		return response;
	}

	public async getRole(): Promise<AxiosResponse<RoleResponse[]>> {
		const response = await axiosWithAuto.get<RoleResponse[]>(
			`${this.BASE_URL}`
		);

		return response;
	}

	public async deleteRole(id: number): Promise<AxiosResponse<RoleResponse>> {
		const response = await axiosWithAuto.delete<RoleResponse>(
			`${this.BASE_URL}${this.QUERY_ID}${id}`
		);
		return response;
	}
}

export const roleService = new RoleService();
