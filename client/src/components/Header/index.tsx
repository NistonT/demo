"use client";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { useLogout } from "@/hook/useLogout";
import { useProfile } from "@/hook/useProfile";
import Link from "next/link";

export const Header = () => {
	const { data } = useProfile();
	const { logout, isAdmin, isAuth } = useLogout();
	return (
		<header className='w-full sticky top-0 z-50'>
			<div className='container mx-auto px-6 py-4'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-2'>
						<span className='text-xl font-bold text-gray-800 hidden sm:inline'>
							ДЕМО ЭКЗАМЕН
						</span>
					</div>

					<div className='flex-1 flex justify-center'>
						{data?.roleId === 2 && (
							<Link
								href={DASHBOARD_PAGES.ADMIN_PANEL}
								className='px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md font-medium hover:bg-indigo-100 transition-colors'
							>
								Админ панель
							</Link>
						)}
					</div>

					<div className='flex items-center space-x-4'>
						{!isAdmin && !isAuth ? (
							<Link
								href={DASHBOARD_PAGES.AUTHORIZATION}
								className='px-4 py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors'
							>
								Войти
							</Link>
						) : (
							<div className='flex items-center space-x-4'>
								<div className='hidden sm:block text-sm text-gray-600'>
									Привет, {data?.login || "Пользователь"}!
								</div>
								<button
									onClick={() => logout()}
									className='px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors'
								>
									Выйти
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
};
