import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  CreditCard, 
  UserSquare, 
  RefreshCw, 
  Compass, 
  Calculator,
  HandCoins, 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ShaderBackground from "./ShaderBackground";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isActive?: boolean;
  badge?: {
    text: string;
    variant: "beta" | "pilot";
  };
}

function SidebarItem({ 
  href, 
  icon, 
  children, 
  isActive = false,
  badge
}: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "group flex items-center py-2 hover:bg-hover relative",
        isActive 
          ? "text-[#0376c9] dark:text-white font-semibold" 
          : "text-[#9fa6ae]"
      )}
    >
      <div className="flex justify-center items-center mr-2">
        {icon}
      </div>
      <span className="truncate">{children}</span>
      {badge && (
        <div
          role="button"
          tabIndex={0}
          className="max-w-max items-center rounded-full py-0.5 sm:py-1.5 cursor-default px-2 border border-info-default bg-info-muted text-info-default mx-3 font-normal inline align-text-bottom text-xs sm:text-xs"
        >
          {badge.text}
        </div>
      )}
    </Link>
  );
}

export function Sidebar({
  className ,
  ...props
}: SidebarProps = {className: ""}) {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop sidebar */}
      <div
        className={cn(
          "group z-[10] sticky top-0 h-screen overflow-hidden w-64 relative",
          className
        )}
        {...props}
      >
        {/* Shader background with overlay for sidebar */}
        <div className="absolute inset-0 -z-10">
          <ShaderBackground />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
        </div>
        
        <div className="flex flex-col h-full border-r border-muted">
          <div className="flex-shrink-0 flex items-center px-4 py-5 pt-8">
            <Link to="/" className="outline-none">
              <h1 className="text-2xl font-bold">The Free Market</h1>
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="space-y-3 mt-8 px-4">
              <SidebarItem 
                href="/loan" 
                icon={<Home className="h-5 w-5 text-white" />}
                isActive={isActive("/")}
              >
                Loan
              </SidebarItem>
              <SidebarItem 
                href="/identity" 
                icon={<UserSquare className="h-5 w-5 text-white" />}
                isActive={isActive("/identity")}
              >
                Identity
              </SidebarItem>
              <SidebarItem
                href="/offers"
                icon={<HandCoins className="h-5 w-5 text-white" />}
                isActive={isActive("/offers")}
              >
                Offers
              </SidebarItem>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
