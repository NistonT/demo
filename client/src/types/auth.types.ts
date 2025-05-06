export interface IAuthForm {
	email?: string;
	login?: string;
	password: string;
}

export type TypeUserForm = Omit<IUser, "id"> & { password?: string };

export interface IRegForm {
	name: string;
	login: string;
	number: string;
	email: string;
	password: string;
}

export interface IRegisterForm {
	name: string;
	login: string;
	email: string;
	number: string;
	password: string;
	passwordConfirm: string;
}

export interface IUser {
	id: number;
	name: string;
	email: string;
	number: string;
	password: string;
	login: string;
	roleId: number;
	CreatedAt: string;
	UpdatedAt: string;
}

export interface IAuthResponse {
	accessToken: string;
	user: {
		id: number;
		name: string;
		email: string;
		login: string;
		number: string;
		roleId: number;
		password: string;
		CreatedAt: string;
		UpdatedAt: string;
		accessToken: string;
	};
}
