import {
  Calendar1,
  HomeIcon,
  type LucideIcon,
  Settings,
  Users,
  Wrench,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "Controle",
      menus: [
        {
          href: "/overview",
          label: "Visão geral",
          icon: HomeIcon,
        },
      ],
    },
    {
      groupLabel: "Gerenciamento",
      menus: [
        {
          href: "/calendar",
          label: "Agenda",
          icon: Calendar1,
        },
      ],
    },
    {
      groupLabel: "Administrativo",
      menus: [
        {
          href: "/users",
          label: "Usuários",
          icon: Users,
        },
        {
          href: "/roles",
          label: "Permissões",
          icon: Wrench,
        },
        {
          href: "/settings",
          label: "Configurações",
          icon: Settings,
        },
      ],
    },
  ];
}
