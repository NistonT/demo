export interface IAuthForm {
	email?: string;
	login?: string;
	password: string;
}

export type TypeUserForm = Omit<IUser, "id"> & { password?: string };

export interface IRegForm {
	name: string;
	number: string;
	email: string;
	password: string;
}

export interface IRegisterForm {
	name: string;
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
	login?: string;
	CreatedAt: string;
	UpdatedAt: string;
}

export interface IAuthResponse {
	id: number;
	name: string;
	email: string;
	login?: string;
	number: string;
	password: string;
	CreatedAt: string;
	UpdatedAt: string;
	accessToken: string;
}
