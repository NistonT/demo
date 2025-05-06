"use client";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { authService } from "@/service/auth.service";
import { IRegForm, IRegisterForm } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export const Registration = () => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<IRegisterForm>({
		mode: "onChange",
	});

	const [message, setMessage] = useState<string>("");
	const [isError, setIsError] = useState<boolean>(false);

	const { mutate } = useMutation({
		mutationKey: ["reg"],
		mutationFn: (data: IRegForm) => authService.registerMain(data),
		onSuccess: () => {
			toast.success("Регистрация прошла успешно");
			reset();
		},
		onError: error => {
			console.log(error);
			setMessage(error.message);
		},
	});

	const onSubmit: SubmitHandler<IRegisterForm> = data => {
		const { passwordConfirm, ...result } = data;
		setIsError(false);
		setMessage("");
		if (passwordConfirm !== result.password) {
			setMessage("Пароли не совпадают");
			setIsError(true);
			return;
		}

		console.log(result);
		mutate(result);
	};

	return (
		<div className='flex flex-col items-center justify-center p-4'>
			<div className='w-full max-w-md bg-white rounded-xl overflow-hidden'>
				<div className='p-8'>
					<div className='text-center mb-6'>
						<h2 className='text-2xl font-bold text-gray-800'>Регистрация</h2>
						<p className='text-gray-500 mt-2'>Создайте новый аккаунт</p>
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
						<div className='space-y-4'>
							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									ФИО
								</label>
								<input
									type='text'
									placeholder='Фамилия имя отчество'
									className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
									{...register("name", { required: "Обязательное поле" })}
								/>
								{errors.name && (
									<p className='mt-1 text-sm text-red-500'>
										{errors.name.message}
									</p>
								)}
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Логин
								</label>
								<input
									type='text'
									placeholder='Придумайте логин'
									className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
									{...register("login", { required: "Обязательное поле" })}
								/>
								{errors.login && (
									<p className='mt-1 text-sm text-red-500'>
										{errors.login.message}
									</p>
								)}
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Email
								</label>
								<input
									type='email'
									placeholder='example@mail.com'
									className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
									{...register("email", {
										required: "Обязательное поле",
										pattern: {
											value: /^\S+@\S+$/i,
											message: "Некорректный email",
										},
									})}
								/>
								{errors.email && (
									<p className='mt-1 text-sm text-red-500'>
										{errors.email.message}
									</p>
								)}
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Телефон
								</label>
								<input
									type='tel'
									placeholder='+7 (999) 123-45-67'
									className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
									{...register("number", {
										required: "Обязательное поле",
										pattern: {
											value: /^\+?[\d\s\-\(\)]+$/,
											message: "Некорректный номер",
										},
									})}
								/>
								{errors.number && (
									<p className='mt-1 text-sm text-red-500'>
										{errors.number.message}
									</p>
								)}
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Пароль
								</label>
								<input
									type='password'
									placeholder='Не менее 6 символов'
									className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
									{...register("password", {
										required: "Обязательное поле",
										minLength: {
											value: 6,
											message: "Минимум 6 символов",
										},
									})}
								/>
								{errors.password && (
									<p className='mt-1 text-sm text-red-500'>
										{errors.password.message}
									</p>
								)}
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700 mb-1'>
									Подтверждение пароля
								</label>
								<input
									type='password'
									placeholder='Повторите пароль'
									className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition'
									{...register("passwordConfirm", {
										required: "Обязательное поле",
										validate: value =>
											value === watch("password") || "Пароли не совпадают",
									})}
								/>
								{errors.passwordConfirm && (
									<p className='mt-1 text-sm text-red-500'>
										{errors.passwordConfirm.message}
									</p>
								)}
							</div>
						</div>

						<button
							type='submit'
							className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
						>
							Зарегистрироваться
						</button>
					</form>

					<div className='mt-6 text-center text-sm text-gray-500'>
						Уже есть аккаунт?{" "}
						<Link
							href={DASHBOARD_PAGES.AUTHORIZATION}
							className='text-indigo-600 hover:text-indigo-800 font-medium transition-colors'
						>
							Войти
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
