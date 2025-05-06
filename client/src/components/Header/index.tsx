"use client";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { useLogout } from "@/hook/useLogout";
import { useProfile } from "@/hook/useProfile";
import Link from "next/link";

export const Header = () => {
	const { data } = useProfile();
	const { logout, isAdmin, isAuth } = useLogout();
	return (
		<header className='w-full px-6 py-4'>
			<div className='flex justify-between'>
				<div>
					<span>ДЕМО ЭКЗАМЕН</span>
				</div>
				<div>{data?.roleId === 2 && <div>Админ панель</div>}</div>
				<div>
					{!isAdmin && !isAuth && (
						<Link href={DASHBOARD_PAGES.AUTHORIZATION}>Войти</Link>
					)}
					{(isAdmin || isAuth) && (
						<div>
							<button onClick={() => logout()}>Выйти</button>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};
