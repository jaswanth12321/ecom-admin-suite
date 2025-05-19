
import { useState } from "react";
import { PageHeader, PageHeaderCreateButton } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tag, Calendar, Check, X } from "lucide-react";
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

// Mock data for discounts
const mockDiscounts = [
  {
    id: "disc-001",
    code: "SUMMER25",
    type: "percentage",
    value: 25,
    minPurchase: 100,
    usageLimit: 1000,
    usedCount: 342,
    status: "active",
    startDate: "2025-06-01T00:00:00Z",
    endDate: "2025-08-31T23:59:59Z",
  },
  {
    id: "disc-002",
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    minPurchase: 50,
    usageLimit: 0, // unlimited
    usedCount: 896,
    status: "active",
    startDate: "2025-01-01T00:00:00Z",
    endDate: null, // no end date
  },
  {
    id: "disc-003",
    code: "FREESHIP",
    type: "fixed",
    value: 15,
    minPurchase: 75,
    usageLimit: 500,
    usedCount: 218,
    status: "active",
    startDate: "2025-05-15T00:00:00Z",
    endDate: "2025-07-15T23:59:59Z",
  },
  {
    id: "disc-004",
    code: "FLASH50",
    type: "percentage",
    value: 50,
    minPurchase: 200,
    usageLimit: 100,
    usedCount: 100,
    status: "expired",
    startDate: "2025-04-01T00:00:00Z",
    endDate: "2025-04-02T23:59:59Z",
  },
  {
    id: "disc-005",
    code: "HOLIDAY20",
    type: "percentage",
    value: 20,
    minPurchase: 80,
    usageLimit: 750,
    usedCount: 0,
    status: "scheduled",
    startDate: "2025-12-01T00:00:00Z",
    endDate: "2025-12-31T23:59:59Z",
  },
];

export default function Discounts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newDiscount, setNewDiscount] = useState({
    code: "",
    type: "percentage",
    value: 0,
    minPurchase: 0,
    usageLimit: 0,
    startDate: "",
    endDate: "",
  });
  const { toast } = useToast();

  const filteredDiscounts = mockDiscounts.filter((discount) =>
    discount.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    discount.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateDiscount = () => {
    // Add validation logic here
    if (!newDiscount.code || newDiscount.value <= 0) {
      toast({
        title: "Invalid discount",
        description: "Please provide a code and a valid discount value.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send data to an API
    toast({
      title: "Discount created",
      description: `Discount code ${newDiscount.code} has been created successfully.`,
    });
    
    setIsCreateDialogOpen(false);
    setNewDiscount({
      code: "",
      type: "percentage",
      value: 0,
      minPurchase: 0,
      usageLimit: 0,
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Discounts" 
        description="Manage your discount codes and promotions"
        actions={
          <PageHeaderCreateButton onClick={() => setIsCreateDialogOpen(true)}>
            <Tag className="mr-2 h-4 w-4" /> Create Discount
          </PageHeaderCreateButton>
        }
      />
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Input 
            type="text" 
            placeholder="Search discounts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div>
          <Button variant="outline" size="sm" className="mr-2">
            <Calendar className="mr-2 h-4 w-4" />
            Filter by date
          </Button>
          <Button variant="outline" size="sm">
            All statuses
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Usage</TableHead>
              <TableHead className="hidden md:table-cell">Date Range</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDiscounts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No discounts found
                </TableCell>
              </TableRow>
            ) : (
              filteredDiscounts.map((discount) => (
                <TableRow key={discount.id}>
                  <TableCell className="font-medium">{discount.code}</TableCell>
                  <TableCell>
                    {discount.type === "percentage" ? `${discount.value}%` : `$${discount.value.toFixed(2)}`}
                    <div className="text-xs text-muted-foreground">
                      Min. purchase: ${discount.minPurchase}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      discount.status === "active" ? "default" : 
                      discount.status === "scheduled" ? "outline" : 
                      "secondary"
                    }>
                      {discount.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {discount.usedCount} / {discount.usageLimit || "∞"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="text-sm">
                      {new Date(discount.startDate).toLocaleDateString()}
                      {discount.endDate && (
                        <> — {new Date(discount.endDate).toLocaleDateString()}</>
                      )}
                      {!discount.endDate && <> — No end date</>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          toast({
                            title: "Editing discount",
                            description: `Editing discount ${discount.code}`,
                          });
                        }}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          toast({
                            title: "Discount toggled",
                            description: `${discount.code} status changed to ${discount.status === "active" ? "inactive" : "active"}`,
                          });
                        }}>
                          {discount.status === "active" ? "Deactivate" : "Activate"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => {
                          toast({
                            title: "Discount deleted",
                            description: `${discount.code} has been deleted`,
                          });
                        }}>
                          Delete
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
      
      {/* Create Discount Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Discount</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-3">
              <div className="space-y-2">
                <Label htmlFor="code">Discount Code</Label>
                <Input
                  id="code"
                  placeholder="e.g. SUMMER25"
                  value={newDiscount.code}
                  onChange={(e) => setNewDiscount({ ...newDiscount, code: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newDiscount.type}
                    onChange={(e) => setNewDiscount({ ...newDiscount, type: e.target.value })}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder={newDiscount.type === "percentage" ? "10" : "5.99"}
                    value={newDiscount.value || ""}
                    onChange={(e) => setNewDiscount({ ...newDiscount, value: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="minimum">Min. Purchase Amount ($)</Label>
                  <Input
                    id="minimum"
                    type="number"
                    value={newDiscount.minPurchase || ""}
                    onChange={(e) => setNewDiscount({ ...newDiscount, minPurchase: Number(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="limit">Usage Limit (0 = unlimited)</Label>
                  <Input
                    id="limit"
                    type="number"
                    value={newDiscount.usageLimit || ""}
                    onChange={(e) => setNewDiscount({ ...newDiscount, usageLimit: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newDiscount.startDate}
                    onChange={(e) => setNewDiscount({ ...newDiscount, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date (optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newDiscount.endDate}
                    onChange={(e) => setNewDiscount({ ...newDiscount, endDate: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleCreateDiscount}>
              <Check className="mr-2 h-4 w-4" />
              Create Discount
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
