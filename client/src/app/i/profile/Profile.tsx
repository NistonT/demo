"use client";
import { useProfile } from "@/hook/useProfile";

export const Profile = () => {
	const { data } = useProfile();

	return (
		<>
			<div className='w-11/12 mx-auto'>
				<div className='flex items-center justify-between mb-8'>
					<h1 className='text-3xl font-bold text-indigo-600 flex items-center gap-1'>
						<span>{data?.name}</span>
						{data?.email}
					</h1>
				</div>
			</div>
		</>
	);
};
