import { useAuth } from "@/hooks/use-auth";
import { api } from "@/lib/axios";
import type { PaginatedProps } from "@/types";

interface EnterpriseUserResponse {
  id: string;
  enterpriseId: string;
  email: string;
  blocked: boolean;
  tempPassword: boolean;
  isSuperUser: boolean;
  emailConfirmed: boolean;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  enterpriseUserProfile: {
    id: string;
    userId: string;
    name: string;
    cellPhone: string;
    avatarUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  roles: RolesProps[];
}

export interface RolesProps {
  id: string;
  slug: string;
  name: string;
}

interface GetEnterpriseUsersServiceProps {
  search: string | null;
}

const getEnterpriseUsersService = async ({
  search,
}: GetEnterpriseUsersServiceProps): Promise<
  PaginatedProps<EnterpriseUserResponse[]>
> => {
  const { data } = await api.get<PaginatedProps<EnterpriseUserResponse[]>>(
    `/enterprise_users?search=${search || ""}`,
    {
      headers: {
        Authorization: useAuth.getState().getToken(),
      },
    },
  );

  return data;
};

export { getEnterpriseUsersService };
export type { EnterpriseUserResponse };
