import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { authService } from "@/service/auth.service";
import { isAdminAtom, isAuthAtom } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
	const { push } = useRouter();
	const [isAuth, setIsAuth] = useAtom(isAuthAtom);
	const [isAdmin, setIsAdmin] = useAtom(isAdminAtom);

	const { mutate: logout } = useMutation({
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

	return { logout, isAdmin, isAuth };
};
