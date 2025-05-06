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
		<div className='min-h-screen flex items-center justify-center'>
			<div className='w-full max-w-md p-8 space-y-3 backdrop-blur-lg text-black'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type='text'
						placeholder='ФИО'
						{...register("name", { required: true })}
					/>
					<input
						type='text'
						placeholder='Логин'
						{...register("login", { required: true })}
					/>
					<input
						type='email'
						placeholder='Почта'
						{...register("email", { required: true })}
					/>
					<input
						type='text'
						placeholder='Номер телефона'
						{...register("number", { required: true })}
					/>
					<input
						type='text'
						placeholder='Пароль'
						{...register("password", { required: true })}
					/>
					<input
						type='text'
						placeholder='Повтор пароля'
						{...register("passwordConfirm", { required: true })}
					/>
					<input type='submit' value='Зарегистрироваться' />
				</form>
			</div>
			<Link href={DASHBOARD_PAGES.AUTHORIZATION}>Авторизация</Link>
		</div>
	);
};
