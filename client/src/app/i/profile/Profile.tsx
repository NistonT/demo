"use client";
import { useProfile } from "@/hook/useProfile";

export const Profile = () => {
	const { data } = useProfile();

	return (
		<>
			<div className='w-11/12 mx-auto'>
				<div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 p-6 bg-white rounded-xl shadow-sm'>
					<div className='flex items-center gap-4'>
						<div className='w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center'>
							<span className='text-2xl font-bold text-indigo-600'>
								{data?.name?.charAt(0).toUpperCase()}
							</span>
						</div>

						<div>
							<h1 className='text-2xl font-bold text-gray-800 flex items-center gap-2'>
								{data?.name}
								{data?.roleId === 2 && (
									<span className='text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full'>
										Администратор
									</span>
								)}
							</h1>

							<div className='flex flex-wrap items-center gap-3 mt-2 text-gray-600'>
								<div className='flex items-center gap-1 text-sm'>
									<span>{data?.email}</span>
								</div>

								<div className='flex items-center gap-1 text-sm'>
									<span>{data?.number || "Не указан"}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
