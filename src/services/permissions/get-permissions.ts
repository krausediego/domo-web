import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/axios";
import type { PaginatedProps } from "@/types";

interface PermissionsResponse {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const getPermissionsService = async () => {
  const { data } = await api.get<PaginatedProps<PermissionsResponse[]>>(
    "/permission",
    {
      headers: {
        Authorization: useAuth.getState().getToken(),
      },
    },
  );

  return data;
};

export { getPermissionsService };
export type { PermissionsResponse };
