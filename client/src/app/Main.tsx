import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import Link from "next/link";

export const Main = () => {
	return (
		<div>
			<h1>Демо экзамен</h1>
			<Link href={DASHBOARD_PAGES.AUTHORIZATION}>Страница авторизации</Link>
			<Link href={DASHBOARD_PAGES.REGISTRATION}>Страница регистрации</Link>
		</div>
	);
};
