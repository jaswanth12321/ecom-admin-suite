
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Mock data for customers
const mockCustomers = [
  {
    id: "CUST-5821",
    name: "Alice Johnson",
    email: "alice@example.com",
    orders: 12,
    spent: 1243.99,
    lastOrder: "2023-10-18T09:30:00Z",
    status: "active"
  },
  {
    id: "CUST-5820",
    name: "Robert Smith",
    email: "robert@example.com",
    orders: 8,
    spent: 876.50,
    lastOrder: "2023-10-15T14:20:00Z",
    status: "active"
  },
  {
    id: "CUST-5819",
    name: "Emily Brown",
    email: "emily@example.com",
    orders: 5,
    spent: 429.95,
    lastOrder: "2023-10-10T11:15:00Z",
    status: "inactive"
  },
  {
    id: "CUST-5818",
    name: "Michael Davis",
    email: "michael@example.com",
    orders: 19,
    spent: 2156.75,
    lastOrder: "2023-10-20T16:45:00Z",
    status: "active"
  },
  {
    id: "CUST-5817",
    name: "Jennifer Wilson",
    email: "jennifer@example.com",
    orders: 3,
    spent: 189.99,
    lastOrder: "2023-09-28T10:30:00Z",
    status: "banned"
  },
  {
    id: "CUST-5816",
    name: "Daniel Taylor",
    email: "daniel@example.com",
    orders: 7,
    spent: 659.45,
    lastOrder: "2023-10-05T13:20:00Z",
    status: "active"
  },
];

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredCustomers = mockCustomers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(customer => statusFilter === "all" || customer.status === statusFilter);

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-gray-100 text-gray-800",
      banned: "bg-red-100 text-red-800",
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
        title="Customers" 
        description="Manage your customers"
        actions={
          <Button>
            <UserPlus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        }
      />
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="w-full px-4 py-2 rounded-md border border-border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <select 
            className="px-3 py-2 rounded-md border border-border bg-background"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Customers</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="banned">Banned</option>
          </select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Orders</TableHead>
              <TableHead className="hidden md:table-cell">Total Spent</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Last Order</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{customer.orders}</TableCell>
                  <TableCell className="hidden md:table-cell">₹{customer.spent.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(customer.lastOrder).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>View Orders</DropdownMenuItem>
                        {customer.status === "active" && (
                          <DropdownMenuItem>Mark as Inactive</DropdownMenuItem>
                        )}
                        {customer.status === "inactive" && (
                          <DropdownMenuItem>Mark as Active</DropdownMenuItem>
                        )}
                        {customer.status !== "banned" && (
                          <DropdownMenuItem className="text-destructive">Ban Customer</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredCustomers.length} of {mockCustomers.length} customers
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
