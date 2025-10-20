import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { EnterpriseUserResponse, RolesProps } from "@/services/users";

export const usersColumns: ColumnDef<EnterpriseUserResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "nome",
    accessorKey: "enterpriseUserProfile.name",
    header: "Nome",
  },
  {
    id: "telefone",
    accessorKey: "enterpriseUserProfile.cellPhone",
    header: "Telefone",
  },
  {
    id: "e-mail",
    accessorKey: "email",
    header: "E-mail",
  },
  {
    id: "permissões",
    accessorKey: "roles",
    header: "Permissões",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          {row.getValue<RolesProps[]>("permissões").map((role) => {
            return (
              <Badge key={role.id} className="capitalize">
                {role.name}
              </Badge>
            );
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <span className="sr-only">Open menu</span>
                <EllipsisHorizontalIcon className="size-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
