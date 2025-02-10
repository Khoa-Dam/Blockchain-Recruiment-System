"use client";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import {
  LayoutDashboard,
  Users,
  UserPlus,
  DollarSign,
  Calendar,
  Settings,
  HelpCircle,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef } from "react";
import { useAuthCheck } from "@/hooks/useAuthCheck";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
}

// const departments = [
//   { label: "Business and Marketing", color: "bg-blue-500" },
//   { label: "Design", color: "bg-green-500" },
//   { label: "Project Manager", color: "bg-orange-500" },
//   { label: "Human Resource", color: "bg-purple-500" },
//   { label: "Development", color: "bg-blue-500" },
// ];

const otherItems = [
  { label: "Settings", icon: Settings, href: "/settings" },
  { label: "Help Center", icon: HelpCircle, href: "/help-center" },
];

// ... existing code ...
export function Sidebar({ className, onClose }: SidebarProps) {
  const { address } = useAuthCheck();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Profile", icon: Users, href: `/profile/${address}` },
    { label: "Recruitment", icon: UserPlus, href: "/recruitment" },
    { label: "Payroll", icon: DollarSign, href: "/payroll" },
    { label: "Jobs", icon: Calendar, href: "/jobs" },
  ];

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "flex flex-col h-screen border-r bg-white w-[240px] lg:w-[240px] z-50",
        className
      )}
    >
      {/* Close button - only show on mobile */}
      <button
        onClick={onClose}
        className="md:hidden p-2 absolute right-2 top-2 hover:bg-gray-100 rounded-lg"
      >
        <X size={20} />
      </button>
      <ScrollArea className="flex-1">
        <div className="p-2 sm:p-4 space-y-4 sm:space-y-6">
          {/* Main Menu */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
              MAIN MENU
            </h4>
            <div className="space-y-1">
              {menuItems.map(({ label, icon: Icon, href }) => (
                <Link key={label} href={href} passHref>
                  <Button
                    variant={pathname === href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-2 text-xs sm:text-sm",
                      pathname === href &&
                        "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    )}
                  >
                    <Icon size={16} className="sm:w-5 sm:h-5" />
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          {/* Departments */}
          {/* <div> */}
          {/* <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
              DEPARTMENT
            </h4> */}
          {/* <div className="space-y-1">
              {departments.map(({ label, color }) => (
                <Button
                  key={label}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-xs sm:text-sm"
                >
                  <span className={`w-2 h-2 rounded-full ${color}`} />
                  {label}
                </Button>
              ))}
            </div> */}
          {/* </div> */}

          {/* Other */}
          <div>
            <h4 className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
              OTHER
            </h4>
            <div className="space-y-1">
              {otherItems.map(({ label, icon: Icon, href }) => (
                <Link key={label} href={href} passHref>
                  <Button
                    variant={pathname === href ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2 text-xs sm:text-sm"
                  >
                    <Icon size={16} className="sm:w-5 sm:h-5" />
                    {label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
// ... existing code ...
