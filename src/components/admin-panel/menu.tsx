import { Link, useLocation } from "@tanstack/react-router";
import { Ellipsis, LogOut } from "lucide-react";

import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getMenuList } from "@/lib/menu-list";
import { cn } from "@/lib/utils";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const location = useLocation();
  const menuList = getMenuList();

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-4 h-full w-full">
        <ul className="flex min-h-[calc(100vh-48px-36px-16px-32px)] flex-col items-start space-y-1 px-2 lg:min-h-[calc(100vh-32px-40px-32px)]">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", isOpen ? "pb-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-muted-foreground max-w-[248px] truncate px-2 pb-2 text-xs font-medium">
                  {groupLabel}
                </p>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  !submenus || submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={
                                (active === undefined &&
                                  location.pathname.startsWith(href)) ||
                                active
                                  ? "default"
                                  : "ghost"
                              }
                              className={cn(
                                "h-10 w-full shadow-none",
                                isOpen && "justify-start pl-5",
                              )}
                              asChild
                            >
                              <Link to={href}>
                                <span
                                  className={cn(
                                    "group-[]:",
                                    isOpen === false ? "" : "mr-2",
                                  )}
                                >
                                  <Icon
                                    className={cn(
                                      "size-6 transition-colors",
                                      !location.pathname.startsWith(href) &&
                                        "text-muted-foreground",
                                    )}
                                  />
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate font-medium transition-colors",
                                    isOpen === false
                                      ? "hidden -translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100",
                                    !location.pathname.startsWith(href) &&
                                      "text-muted-foreground font-normal",
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={
                          active === undefined
                            ? location.pathname.startsWith(href)
                            : active
                        }
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  ),
              )}
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
}
