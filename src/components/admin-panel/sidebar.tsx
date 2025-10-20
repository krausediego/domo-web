import { PanelsTopLeft } from "lucide-react";

import { Menu } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-19 h-screen -translate-x-full shadow-[4px_0_10px_-10px_rgba(0,0,0,0.3)] transition-[width] duration-300 ease-in-out lg:translate-x-0",
        !getOpenState() ? "w-[92px]" : "w-60",
        settings.disabled && "hidden",
      )}
    >
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="bg-sidebar relative flex h-full flex-col px-3 py-4 shadow-zinc-800"
      >
        <div className="mt-2.5 mb-6 flex items-center gap-2 pl-4">
          <PanelsTopLeft className="size-5" />
          <h1
            className={cn(
              "text-lg font-bold whitespace-nowrap transition-[transform,opacity,display] duration-300 ease-in-out",
              !getOpenState()
                ? "hidden -translate-x-96 opacity-0"
                : "translate-x-0 opacity-100",
            )}
          >
            Domo
          </h1>
        </div>
        <Menu isOpen={getOpenState()} />
      </div>
    </aside>
  );
}
