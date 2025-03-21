import { useState } from "react";
import { Menu, X, Home, Settings, Users, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultCollapsed?: boolean;
}

export function Sidebar({
  className,
  defaultCollapsed = false,
  ...props
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [isOpen, setIsOpen] = useState(false);

  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile sidebar */}
      <div className="md:hidden">
        <Sheet open={isOpen}>
          <Button variant="ghost" size="icon" onClick={openSidebar}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <SheetContent
            side="left"
            className="bg-sidebar text-sidebar-foreground p-0"
          >
            <div className="flex h-full flex-col">
              <div className="flex h-14 items-center border-b border-sidebar-border px-4">
                <div className="flex items-center gap-2 font-semibold">
                  <BarChart className="h-6 w-6" />
                  <span>My App</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-auto"
                  onClick={closeSidebar}
                >
                  <X className="h-6 w-6" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
              <nav className="flex-1 overflow-auto py-2">
                <div className="px-3 py-2">
                  <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight">
                    Navigation
                  </h2>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Users
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div
        className={cn(
          "hidden md:flex h-screen flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all",
          collapsed ? "w-16" : "w-64",
          className
        )}
        {...props}
      >
        <div className="flex h-14 items-center border-b border-sidebar-border px-4">
          <div
            className={cn(
              "flex items-center gap-2 font-semibold overflow-hidden",
              collapsed && "justify-center"
            )}
          >
            <BarChart className="h-6 w-6 flex-shrink-0" />
            {!collapsed && <span>My App</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-auto", collapsed && "hidden")}
            onClick={() => setCollapsed(true)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Collapse</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className={cn("ml-auto", !collapsed && "hidden")}
            onClick={() => setCollapsed(false)}
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Expand</span>
          </Button>
        </div>
        <nav className="flex-1 overflow-auto py-2">
          <div className="px-3 py-2">
            {!collapsed && (
              <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight">
                Navigation
              </h2>
            )}
            <div className="space-y-1">
              <Button
                variant="ghost"
                className={cn(
                  "w-full",
                  collapsed ? "justify-center px-0" : "justify-start"
                )}
              >
                <Home className={cn("h-4 w-4", !collapsed && "mr-2")} />
                {!collapsed && <span>Dashboard</span>}
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "w-full",
                  collapsed ? "justify-center px-0" : "justify-start"
                )}
              >
                <Users className={cn("h-4 w-4", !collapsed && "mr-2")} />
                {!collapsed && <span>Users</span>}
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  "w-full",
                  collapsed ? "justify-center px-0" : "justify-start"
                )}
              >
                <Settings className={cn("h-4 w-4", !collapsed && "mr-2")} />
                {!collapsed && <span>Settings</span>}
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
