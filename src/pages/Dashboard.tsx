
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { TopProductsCard } from "@/components/dashboard/TopProductsCard";
import { RecentOrdersCard } from "@/components/dashboard/RecentOrdersCard";
import { InventoryAlertsCard } from "@/components/dashboard/InventoryAlertsCard";
import { ShoppingCart, Package, DollarSign, Users, Calendar } from "lucide-react";

export default function Dashboard() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        description={`Welcome back. Today is ${formattedDate}`}
      />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Revenue" 
          value="$45,231.89" 
          description="Monthly revenue" 
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          iconClassName="bg-primary/10"
        />
        <StatsCard 
          title="Total Orders" 
          value="538" 
          description="Monthly orders" 
          icon={ShoppingCart}
          trend={{ value: 8.2, isPositive: true }}
          iconClassName="bg-info/10"
        />
        <StatsCard 
          title="Products" 
          value="293" 
          description="Total active products" 
          icon={Package}
          iconClassName="bg-success/10"
        />
        <StatsCard 
          title="Customers" 
          value="1,429" 
          description="Total registered customers" 
          icon={Users}
          trend={{ value: 4.3, isPositive: true }}
          iconClassName="bg-warning/10"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <RevenueChart />
        <TopProductsCard />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentOrdersCard />
        <InventoryAlertsCard />
      </div>
    </div>
  );
}
