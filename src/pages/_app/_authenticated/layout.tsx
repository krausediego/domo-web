import { createFileRoute, Outlet } from "@tanstack/react-router";

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";

export const Route = createFileRoute("/_app/_authenticated")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AdminPanelLayout>
      <Outlet />
    </AdminPanelLayout>
  );
}
