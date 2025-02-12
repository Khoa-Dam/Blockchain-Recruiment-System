"use client";
import type * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  DollarSign,
  Calendar,
  Settings,
  HelpCircle,
  X,
  GalleryVerticalEnd,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import { useAuthCheck } from "@/hooks/useAuthCheck";

interface SidebarProps extends React.ComponentProps<typeof Sidebar> {
  onClose?: () => void;
}

export function AppSidebar({ className, onClose, ...props }: SidebarProps) {
  const { address } = useAuthCheck();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const data = {
    navMain: [
      {
        title: "Main Menu",
        items: [
          { title: "Dashboard", icon: LayoutDashboard, url: "/dashboard" },
          { title: "Profile", icon: Users, url: `/profile/${address}` },
          { title: "Recruitment", icon: UserPlus, url: "/recruitment" },
          { title: "Payroll", icon: DollarSign, url: "/payroll" },
          { title: "Jobs", icon: Calendar, url: "/jobs" },
        ],
      },
      {
        title: "Other",
        items: [
          { title: "Settings", icon: Settings, url: "/settings" },
          { title: "Help Center", icon: HelpCircle, url: "/help-center" },
        ],
      },
    ],
  };

  return (
    <Sidebar
      ref={sidebarRef}
      className={cn(
        "flex flex-col h-screen border-r bg-white w-[240px] lg:w-[240px] z-50",
        className
      )}
      {...props}
    >
      {/* Close button - only show on mobile */}
      <button
        onClick={onClose}
        className="md:hidden p-2 absolute right-2 top-2 hover:bg-gray-100 rounded-lg"
      >
        <X size={20} />
      </button>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">BordUp™</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="flex-1">
          {data.navMain.map((section) => (
            <SidebarGroup key={section.title}>
              <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2 px-4 pt-4">
                {section.title.toUpperCase()}
              </h4>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2",
                          pathname === item.url &&
                            "bg-blue-50 text-blue-600 hover:bg-blue-100"
                        )}
                      >
                        <item.icon size={16} className="sm:w-5 sm:h-5" />
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          ))}
        </ScrollArea>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
