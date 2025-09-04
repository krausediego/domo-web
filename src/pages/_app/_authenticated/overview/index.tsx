import { createFileRoute } from "@tanstack/react-router";

import { ContentLayout } from "@/components/admin-panel/content-layout";

export const Route = createFileRoute("/_app/_authenticated/overview/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ContentLayout title="Visão geral">
      <span>AQUI</span>
    </ContentLayout>
  );
}
