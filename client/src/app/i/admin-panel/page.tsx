import { NO_INDEX_PAGE } from "@/constants/seo.constants";
import { Metadata } from "next";
import { AdminPanel } from "./AdminPanel";

export const metadata: Metadata = {
	title: "Админ панель",
	...NO_INDEX_PAGE,
};
export default function AdminPanelPage() {
	return <AdminPanel />;
}
