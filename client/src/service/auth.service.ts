import { axiosClassic } from "@/api/interceptors";
import { IAuthForm, IAuthResponse, IRegForm } from "@/types/auth.types";
import { removeFromStorage, saveTokenStorage } from "./auth-token.service";

export enum EnumTokens {
	"ACCESS_TOKEN" = "accessToken",
	"REFRESH_TOKEN" = "refreshToken",
}

class AuthService {
	public async loginMain(data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/login`,
			data
		);

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken);
		console.log(response);
		return response;
	}

	public async registerMain(data: IRegForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/register`,
			data
		);

		return response;
	}

	public async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/login/access-token`
		);

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken);

		return response;
	}

	public async logout() {
		const response = await axiosClassic.post<boolean>("auth/logout");

		if (response.data) removeFromStorage();

		return response;
	}
}

export const authService = new AuthService();
