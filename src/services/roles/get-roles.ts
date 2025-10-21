import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/axios";
import type { PaginatedProps } from "@/types";

interface RolesResponse {
  id: string;
  name: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  permissions: {
    id: string;
    slug: string;
    name: string;
  }[];
}

const getRolesService = async (): Promise<PaginatedProps<RolesResponse[]>> => {
  const { data } = await api.get<PaginatedProps<RolesResponse[]>>(`/roles`, {
    headers: {
      Authorization: useAuth.getState().getToken(),
    },
  });

  return data;
};

export { getRolesService };
export type { RolesResponse };
