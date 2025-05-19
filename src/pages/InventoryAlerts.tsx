
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Package, Check, ArrowUpDown } from "lucide-react";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Mock data for inventory alerts
const mockInventoryAlerts = [
  {
    id: "prod-001",
    name: "Wireless Earbuds",
    sku: "WE-1001",
    currentStock: 3,
    threshold: 10,
    category: "Electronics",
    lastRestocked: "2025-04-15T10:30:00Z",
    status: "critical", // critical, warning, or normal
  },
  {
    id: "prod-002",
    name: "Premium Leather Wallet",
    sku: "LW-5023",
    currentStock: 5,
    threshold: 15,
    category: "Accessories",
    lastRestocked: "2025-04-10T14:45:00Z",
    status: "critical",
  },
  {
    id: "prod-003",
    name: "Stainless Steel Water Bottle",
    sku: "WB-3089",
    currentStock: 12,
    threshold: 20,
    category: "Home & Kitchen",
    lastRestocked: "2025-04-20T09:15:00Z",
    status: "warning",
  },
  {
    id: "prod-004",
    name: "Smart Watch Band",
    sku: "SWB-2734",
    currentStock: 8,
    threshold: 15,
    category: "Electronics",
    lastRestocked: "2025-04-18T11:30:00Z",
    status: "warning",
  },
  {
    id: "prod-005",
    name: "Organic Cotton T-Shirt",
    sku: "CT-4567",
    currentStock: 15,
    threshold: 25,
    category: "Clothing",
    lastRestocked: "2025-04-05T08:20:00Z",
    status: "warning",
  },
  {
    id: "prod-006",
    name: "Wireless Charging Pad",
    sku: "WCP-8976",
    currentStock: 2,
    threshold: 10,
    category: "Electronics",
    lastRestocked: "2025-04-12T16:40:00Z",
    status: "critical",
  },
  {
    id: "prod-007",
    name: "Blue Light Blocking Glasses",
    sku: "BLG-6745",
    currentStock: 4,
    threshold: 12,
    category: "Accessories",
    lastRestocked: "2025-04-25T13:50:00Z",
    status: "critical",
  },
];

export default function InventoryAlerts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [restockAmount, setRestockAmount] = useState(0);
  const { toast } = useToast();

  const filteredAlerts = mockInventoryAlerts.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleRestockProduct = () => {
    if (!selectedProduct || restockAmount <= 0) {
      toast({
        title: "Invalid restock amount",
        description: "Please enter a valid quantity.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Product restocked",
      description: `Added ${restockAmount} units to ${selectedProduct.name}.`,
    });
    
    setIsRestockDialogOpen(false);
    setSelectedProduct(null);
    setRestockAmount(0);
  };

  const openRestockDialog = (product) => {
    setSelectedProduct(product);
    setRestockAmount(product.threshold - product.currentStock);
    setIsRestockDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Inventory Alerts" 
        description="Monitor and manage low stock products"
      />
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="critical">Critical</option>
            <option value="warning">Warning</option>
          </select>
          <Button variant="outline" size="sm" onClick={() => {
            toast({
              title: "Threshold settings",
              description: "Adjust inventory alert thresholds in Product Settings.",
            });
          }}>
            Adjust Thresholds
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Stock
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell">Threshold</TableHead>
              <TableHead className="hidden lg:table-cell">Category</TableHead>
              <TableHead className="hidden lg:table-cell">Last Restocked</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No inventory alerts found
                </TableCell>
              </TableRow>
            ) : (
              filteredAlerts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div>
                      {product.name}
                      <div className="text-xs text-muted-foreground">{product.sku}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      product.status === "critical" ? "destructive" : 
                      product.status === "warning" ? "default" : 
                      "outline"
                    }>
                      {product.status === "critical" ? (
                        <AlertTriangle className="mr-1 h-3 w-3" />
                      ) : null}
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={
                      product.currentStock < product.threshold / 2 
                        ? "text-destructive font-semibold" 
                        : "font-semibold"
                    }>
                      {product.currentStock}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.threshold}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {product.category}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {new Date(product.lastRestocked).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openRestockDialog(product)}>
                          Restock
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          toast({
                            title: "Adjusting threshold",
                            description: "Opening threshold settings for this product.",
                          });
                        }}>
                          Adjust Threshold
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          toast({
                            title: "Product details",
                            description: "Opening product details page.",
                          });
                        }}>
                          View Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Restock Dialog */}
      {selectedProduct && (
        <Dialog open={isRestockDialogOpen} onOpenChange={setIsRestockDialogOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Restock Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <p className="font-medium">{selectedProduct.name}</p>
                <p className="text-sm text-muted-foreground">{selectedProduct.sku}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Current Stock</Label>
                  <div className="mt-1 font-semibold">{selectedProduct.currentStock}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Threshold</Label>
                  <div className="mt-1">{selectedProduct.threshold}</div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="restockAmount">Restock Amount</Label>
                <Input
                  id="restockAmount"
                  type="number"
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(Number(e.target.value))}
                  min="1"
                />
                <p className="text-xs text-muted-foreground">
                  Suggested: {Math.max(selectedProduct.threshold - selectedProduct.currentStock, 0)} units to meet threshold
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRestockDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRestockProduct}>
                <Package className="mr-2 h-4 w-4" />
                Confirm Restock
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
