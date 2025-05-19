
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Eye, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-3921",
    customer: "John Smith",
    email: "john@example.com",
    date: "2023-10-25T14:30:00Z",
    total: 129.99,
    status: "processing",
    items: 3,
    paymentStatus: "paid",
  },
  {
    id: "ORD-3920",
    customer: "Emma Johnson",
    email: "emma@example.com",
    date: "2023-10-24T09:45:00Z",
    total: 79.95,
    status: "shipped",
    items: 2,
    paymentStatus: "paid",
  },
  {
    id: "ORD-3919",
    customer: "Michael Brown",
    email: "michael@example.com",
    date: "2023-10-23T16:20:00Z",
    total: 214.50,
    status: "delivered",
    items: 4,
    paymentStatus: "paid",
  },
  {
    id: "ORD-3918",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    date: "2023-10-22T11:15:00Z",
    total: 49.99,
    status: "cancelled",
    items: 1,
    paymentStatus: "refunded",
  },
  {
    id: "ORD-3917",
    customer: "David Miller",
    email: "david@example.com",
    date: "2023-10-21T13:40:00Z",
    total: 159.98,
    status: "processing",
    items: 2,
    paymentStatus: "pending",
  },
];

export default function Orders() {
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = statusFilter === "all"
    ? mockOrders
    : mockOrders.filter(order => order.status === statusFilter);

  const getStatusBadge = (status) => {
    const statusStyles = {
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-amber-100 text-amber-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={statusStyles[status] || ""} variant="outline">
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Orders" 
        description="View and manage customer orders"
        actions={
          <Badge variant="default" className="text-sm h-6">
            5 new orders
          </Badge>
        }
      />
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="w-full px-4 py-2 rounded-md border border-border"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <p>{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.email}</p>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(order.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                <TableCell>{getStatusBadge(order.status)}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredOrders.length} of {mockOrders.length} orders
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
