import {
  CalendarDaysIcon,
  Cog8ToothIcon,
  LockClosedIcon,
  SquaresPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "GESTÃO",
      menus: [
        {
          href: "/overview",
          label: "Visão geral",
          icon: SquaresPlusIcon,
        },
      ],
    },
    {
      groupLabel: "CONTROLE",
      menus: [
        {
          href: "/calendar",
          label: "Agenda",
          icon: CalendarDaysIcon,
        },
      ],
    },
    {
      groupLabel: "GERENCIAMENTO",
      menus: [
        {
          href: "/users",
          label: "Usuários",
          icon: UsersIcon,
        },
        {
          href: "/roles",
          label: "Papéis",
          icon: LockClosedIcon,
        },
        {
          href: "/settings",
          label: "Configurações",
          icon: Cog8ToothIcon,
        },
      ],
    },
  ];
}
