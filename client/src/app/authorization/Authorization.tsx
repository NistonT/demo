"use client";

import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { authService } from "@/service/auth.service";
import { isAdminAtom, isAuthAtom } from "@/store/auth";
import { IAuthForm } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const Authorization = () => {
	// хук для формы
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<IAuthForm>({
		mode: "onChange",
	});

	const setIsAuth = useSetAtom(isAuthAtom);
	const setIsAdmin = useSetAtom(isAdminAtom);

	// хук для редиректа
	const { push } = useRouter();

	// хук для запроса
	const { mutate } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: IAuthForm) => authService.loginMain(data),
		onSuccess: response => {
			toast.success("Авторизация прошла успешно");
			reset();
			setIsAuth(true);

			console.log(response.data.user.roleId);

			if (response.data.user.roleId === 2) {
				setIsAdmin(true);
				push(DASHBOARD_PAGES.ADMIN_PANEL);
			} else {
				push(DASHBOARD_PAGES.PROFILE);
			}
		},
		onError: error => {
			toast.error("Произошла ошибка!");
			console.log(error);
		},
	});

	// функция для оправление запроса
	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data);
	};

	return (
		<div className='flex items-center justify-center p-4'>
			<div className='w-full max-w-md bg-white rounded-xl overflow-hidden'>
				<div className='p-8 space-y-6'>
					<div className='text-center'>
						<h1 className='text-2xl font-bold text-gray-800'>
							Добро пожаловать
						</h1>
						<p className='text-gray-500 mt-1'>Введите свои данные для входа</p>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
						<div>
							<label
								htmlFor='login'
								className='block text-sm font-medium text-gray-700 mb-1'
							>
								Логин
							</label>
							<input
								id='login'
								type='text'
								placeholder='Введите ваш логин'
								className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
								{...register("login", { required: "Логин обязателен" })}
							/>
							{errors.login && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.login.message}
								</p>
							)}
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700 mb-1'
							>
								Пароль
							</label>
							<input
								id='password'
								type='password'
								placeholder='Введите ваш пароль'
								className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
								{...register("password", { required: "Пароль обязателен" })}
							/>
							{errors.password && (
								<p className='mt-1 text-sm text-red-500'>
									{errors.password.message}
								</p>
							)}
						</div>

						<button
							type='submit'
							className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
						>
							Войти
						</button>
					</form>

					<div className='text-center text-sm text-gray-500'>
						Нет аккаунта?{" "}
						<Link
							href={DASHBOARD_PAGES.REGISTRATION}
							className='text-indigo-600 hover:text-indigo-800 font-medium transition-colors'
						>
							Зарегистрироваться
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
