
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  Star,
  Truck,
  Shield,
  BarChart3,
  Menu,
  X,
  Settings,
  FolderTree,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

type SidebarNavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  alert?: number;
};

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: FolderTree,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: ShoppingCart,
    alert: 5,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Discounts",
    href: "/discounts",
    icon: Tag,
  },
  {
    title: "Reviews",
    href: "/reviews",
    icon: Star,
    alert: 3,
  },
  {
    title: "Inventory Alerts",
    href: "/inventory-alerts",
    icon: AlertTriangle,
    alert: 8,
  },
  {
    title: "Shipping & Tax",
    href: "/shipping-tax",
    icon: Truck,
  },
  {
    title: "User Roles",
    href: "/roles",
    icon: Shield,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <>
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-md"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-40 bg-sidebar border-r border-sidebar-border px-4 py-6 flex flex-col w-64 transition-transform duration-300",
          isMobile && !isSidebarOpen ? "-translate-x-full" : "translate-x-0",
          isMobile && isSidebarOpen ? "shadow-xl" : ""
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary p-1">
              <Package className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-lg font-bold">eStore Admin</h1>
          </div>
          
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={toggleSidebar}
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <nav className="space-y-1 flex-1 overflow-y-auto">
          {sidebarNavItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={() => isMobile && setIsSidebarOpen(false)}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
              {item.alert && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {item.alert}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-auto pt-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-medium">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">Admin</span>
            </div>
          </div>
        </div>
      </aside>
      
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}
