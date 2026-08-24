import { createFileRoute } from "@tanstack/react-router";

import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { useAdminAuth } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Panel kapitanki — Pożegluj sobie ze mną" },
      { name: "description", content: "Panel administracyjny do edycji treści i terminów babskich rejsów." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Panel kapitanki" },
      { property: "og:description", content: "Panel administracyjny babskich rejsów." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? <AdminDashboard /> : <AdminLogin />;
}
