"use client";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { useProfile } from "@/hook/useProfile";
import { authService } from "@/service/auth.service";
import { isAdminAtom, isAuthAtom } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { toast } from "sonner";

export const Profile = () => {
	const { data } = useProfile();
	const { push } = useRouter();
	const [isAuth, setIsAuth] = useAtom(isAuthAtom);
	const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);

	useEffect(() => {
		if (!data) {
			Cookies.remove("refreshToken");
			return;
		}
	}, [data]);

	const { mutate } = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			toast("Вы вышли из профиля!");
			setIsAuth(false);
			setIsAdmin(false);
			push(DASHBOARD_PAGES.HOME);
			location.reload();
		},
	});

	const submitLogout = () => {
		mutate();
	};

	return (
		<>
			<div className='w-11/12 mx-auto'>
				<div className='flex items-center justify-between mb-8'>
					<h1 className='text-3xl font-bold text-indigo-600 flex items-center gap-1'>
						<span>{data?.name}</span>
						{data?.email}
					</h1>
					<button type='button' onClick={submitLogout}>
						Выйти
					</button>
				</div>
			</div>
		</>
	);
};
