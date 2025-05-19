
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface OrderStatusProps {
  status: "pending" | "shipped" | "delivered" | "cancelled";
}

function OrderStatus({ status }: OrderStatusProps) {
  const statusStyles: Record<string, { label: string; className: string }> = {
    pending: {
      label: "Pending",
      className: "bg-pending hover:bg-pending/80",
    },
    shipped: {
      label: "Shipped",
      className: "bg-shipped hover:bg-shipped/80",
    },
    delivered: {
      label: "Delivered",
      className: "bg-delivered hover:bg-delivered/80",
    },
    cancelled: {
      label: "Cancelled",
      className: "bg-cancelled hover:bg-cancelled/80",
    },
  };

  const { label, className } = statusStyles[status];

  return <Badge className={cn(className)}>{label}</Badge>;
}

const recentOrders = [
  {
    id: "ORD-7352",
    customer: "Sarah Johnson",
    date: "May 19, 2025",
    amount: "$129.99",
    status: "pending" as const,
  },
  {
    id: "ORD-7351",
    customer: "Michael Brown",
    date: "May 18, 2025",
    amount: "$89.95",
    status: "shipped" as const,
  },
  {
    id: "ORD-7350",
    customer: "Emily Davis",
    date: "May 18, 2025",
    amount: "$42.50",
    status: "delivered" as const,
  },
  {
    id: "ORD-7349",
    customer: "James Wilson",
    date: "May 17, 2025",
    amount: "$214.30",
    status: "shipped" as const,
  },
  {
    id: "ORD-7348",
    customer: "Linda Martinez",
    date: "May 17, 2025",
    amount: "$59.99",
    status: "cancelled" as const,
  },
];

export function RecentOrdersCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Latest 5 orders from your store
          </CardDescription>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm font-medium leading-none">
                    {order.customer}
                  </p>
                  <p className="text-sm text-muted-foreground">{order.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium">{order.amount}</p>
                  <p className="text-sm text-muted-foreground">{order.date}</p>
                </div>
                <OrderStatus status={order.status} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
