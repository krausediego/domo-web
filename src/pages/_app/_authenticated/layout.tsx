import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useLayoutEffect } from "react";

import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/axios";

export const Route = createFileRoute("/_app/_authenticated")({
  component: RouteComponent,
});

interface RefreshTokenResponse {
  token: string;
  tokenExpires: number;
  user: {
    id: string;
    enterpriseId: string;
    email: string;
  };
}

async function refresh(): Promise<string> {
  const resp = await fetch("http://localhost:3000/api/v1/auth/refresh", {
    method: "POST",
    credentials: "include",
  });
  if (!resp.ok) throw new Error("Refresh failed");
  const { token } = await resp.json();
  const bearer = `Bearer ${token}`;
  useAuth.getState().setToken(bearer);
  return bearer;
}

function RouteComponent() {
  const navigate = useNavigate();

  const failedRequestQueue: any[] = [];
  let isRefreshing = false;

  useLayoutEffect(() => {
    const interceptorId = api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const status = error.response?.status;
        const originalConfig = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (status !== 401) {
          return Promise.reject(error);
        }

        const url = (originalConfig?.url ?? "").toLowerCase();
        if (url.includes("/auth/refresh")) {
          navigate({ to: "/sign-in" });
          return Promise.reject(error);
        }

        if (originalConfig._retry) {
          navigate({ to: "/sign-in" });
          return Promise.reject(error);
        }
        originalConfig._retry = true;

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (newToken: string) => {
                originalConfig.headers = originalConfig.headers ?? {};
                originalConfig.headers["Authorization"] = newToken;
                resolve(api(originalConfig));
              },
              onFailure: (err) => reject(err),
            });
          });
        }

        isRefreshing = true;
        try {
          const newToken = await refresh();

          failedRequestQueue.forEach((req) => req.onSuccess(newToken));
          failedRequestQueue.length = 0;

          originalConfig.headers = originalConfig.headers ?? {};
          originalConfig.headers["Authorization"] = newToken;
          return api(originalConfig);
        } catch (refreshErr) {
          failedRequestQueue.forEach((req) => req.onFailure(refreshErr));
          failedRequestQueue.length = 0;

          navigate({ to: "/sign-in" });
          return Promise.reject(refreshErr);
        } finally {
          isRefreshing = false;
        }
      },
    );

    return () => {
      api.interceptors.response.eject(interceptorId);
    };
  }, []);

  return (
    <AdminPanelLayout>
      <Outlet />
    </AdminPanelLayout>
  );
}
