import { createRouter } from "@tanstack/react-router";

import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/axios";
import { routeTree } from "@/routeTree.gen";

interface SignInResponse {
  token: string;
  tokenExpires: number;
  user: {
    id: string;
    enterpriseId: string;
    email: string;
  };
}

interface SignInRequest {
  email: string;
  password: string;
}

const router = createRouter({ routeTree });

const signInService = async ({
  email,
  password,
}: SignInRequest): Promise<void> => {
  const { data } = await api.post<SignInResponse>("/auth/login", {
    email,
    password,
  });

  useAuth.getState().setToken(`Bearer ${data.token}`);

  router.navigate({ to: "/users" });
};

export { signInService };
export type { SignInRequest, SignInResponse };
