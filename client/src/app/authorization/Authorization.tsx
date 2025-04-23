"use client";

import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { authService } from "@/service/auth.service";
import { IAuthForm } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
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

	// хук для редиректа
	const { push } = useRouter();

	// хук для запроса
	const { mutate } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: IAuthForm) => authService.loginMain(data),
		onSuccess: () => {
			toast.success("Авторизация прошла успешно");
			reset();
			push(DASHBOARD_PAGES.PROFILE);
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
		<div className='min-h-screen flex items-center justify-center'>
			<div className='w-full max-w-md p-8 space-y-3  backdrop-blur-lg'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<input
						type='text'
						placeholder='почта'
						{...register("email", { required: true })}
					/>
					<input
						type='text'
						placeholder='пароль'
						{...register("password", { required: true })}
					/>
					<input type='submit' value='Войти' />
				</form>
			</div>
			<Link href={DASHBOARD_PAGES.REGISTRATION}>Регистрация</Link>
		</div>
	);
};
