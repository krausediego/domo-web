import { createRouter } from "@tanstack/react-router";

import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/axios";
import { routeTree } from "@/routeTree.gen";

const router = createRouter({ routeTree });

const signOutService = async (): Promise<void> => {
  const { data } = await api.post("/auth/logout");

  useAuth.getState().setToken(`Bearer ${data.token}`);

  router.navigate({ to: "/sign-in" });
};

export { signOutService };
