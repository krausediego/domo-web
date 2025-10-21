import { EllipsisHorizontalIcon, EyeIcon } from "@heroicons/react/24/outline";
import { type ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RolesResponse } from "@/services/roles";

export const rolesColumns: ColumnDef<RolesResponse>[] = [
  {
    id: "view",
    enableHiding: false,
    cell: () => (
      <Button variant="outline" size="icon">
        <EyeIcon />
      </Button>
    ),
  },
  {
    id: "nome",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge>
        {row.getValue<RolesResponse["status"]>("status") ? "Ativo" : "Inativo"}
      </Badge>
    ),
  },
  {
    id: "permissions",
    accessorKey: "permissions",
    header: "Permissões",
    cell: ({ row }) => (
      <div className="space-x-2">
        {row
          .getValue<RolesResponse["permissions"]>("permissions")
          .map((permission) => (
            <Badge key={permission.id}>{permission.name}</Badge>
          ))}
      </div>
    ),
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
