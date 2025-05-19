
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export default function ShippingTax() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("shipping");
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your shipping and tax settings have been saved successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Shipping & Tax" 
        description="Manage shipping methods and tax rates"
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="shipping">Shipping Methods</TabsTrigger>
          <TabsTrigger value="tax">Tax Rates</TabsTrigger>
        </TabsList>
        
        <TabsContent value="shipping" className="space-y-4">
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-medium mb-4">Shipping Zones</h2>
            
            <div className="grid gap-6">
              {/* India Zone */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-md font-medium">India</h3>
                  <div className="space-x-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                  </div>
                </div>
                
                <div className="space-y-4 mt-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-0.5">
                      <div className="font-medium">Standard Shipping</div>
                      <div className="text-sm text-muted-foreground">3-5 business days</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹70.00</div>
                      <div className="text-sm text-muted-foreground">Flat rate</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-0.5">
                      <div className="font-medium">Express Shipping</div>
                      <div className="text-sm text-muted-foreground">1-2 business days</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹150.00</div>
                      <div className="text-sm text-muted-foreground">Flat rate</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-0.5">
                      <div className="font-medium">Free Shipping</div>
                      <div className="text-sm text-muted-foreground">5-7 business days</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹0.00</div>
                      <div className="text-sm text-muted-foreground">Orders over ₹1,000</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* International Zone */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-md font-medium">International</h3>
                  <div className="space-x-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                  </div>
                </div>
                
                <div className="space-y-4 mt-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-0.5">
                      <div className="font-medium">International Standard</div>
                      <div className="text-sm text-muted-foreground">7-14 business days</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹500.00</div>
                      <div className="text-sm text-muted-foreground">Flat rate</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="space-y-0.5">
                      <div className="font-medium">International Express</div>
                      <div className="text-sm text-muted-foreground">3-5 business days</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">₹1,200.00</div>
                      <div className="text-sm text-muted-foreground">Flat rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="mt-6">
              Add Shipping Zone
            </Button>
          </div>
          
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-medium mb-4">Shipping Settings</h2>
            
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="calculation_type" className="mb-2 block">Calculation Type</Label>
                  <select
                    id="calculation_type"
                    className="w-full rounded-md border border-input px-3 py-2"
                    defaultValue="flat"
                  >
                    <option value="flat">Flat Rate</option>
                    <option value="weight">Based on Weight</option>
                    <option value="price">Based on Price</option>
                  </select>
                  <p className="text-sm text-muted-foreground mt-1">How shipping costs are calculated</p>
                </div>
                
                <div>
                  <Label htmlFor="shipping_classes" className="mb-2 block">Shipping Classes</Label>
                  <select
                    id="shipping_classes"
                    className="w-full rounded-md border border-input px-3 py-2"
                    defaultValue="disabled"
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                  <p className="text-sm text-muted-foreground mt-1">Group products with similar shipping requirements</p>
                </div>
              </div>
            </div>
          </div>
          
          <Button onClick={handleSave}>Save Shipping Settings</Button>
        </TabsContent>
        
        <TabsContent value="tax" className="space-y-4">
          <div className="rounded-lg border p-6">
            <h2 className="text-lg font-medium mb-4">Tax Settings</h2>
            
            <div className="grid gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="tax_calculation" className="mb-2 block">Tax Calculation</Label>
                  <select
                    id="tax_calculation"
                    className="w-full rounded-md border border-input px-3 py-2"
                    defaultValue="per_item"
                  >
                    <option value="per_item">Per Item</option>
                    <option value="per_order">Per Order</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="price_display" className="mb-2 block">Prices Display</Label>
                  <select
                    id="price_display"
                    className="w-full rounded-md border border-input px-3 py-2"
                    defaultValue="including"
                  >
                    <option value="including">Including Tax</option>
                    <option value="excluding">Excluding Tax</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Tax Rates</h2>
              <Button size="sm">Add Tax Rate</Button>
            </div>
            
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Country</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">State</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Rate</th>
                    <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                    <th className="text-right px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-3">India</td>
                    <td className="px-4 py-3">All</td>
                    <td className="px-4 py-3">18%</td>
                    <td className="px-4 py-3">GST Standard Rate</td>
                    <td className="px-4 py-3 text-right space-x-1">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3">India</td>
                    <td className="px-4 py-3">All</td>
                    <td className="px-4 py-3">12%</td>
                    <td className="px-4 py-3">GST Reduced Rate</td>
                    <td className="px-4 py-3 text-right space-x-1">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                    </td>
                  </tr>
                  <tr className="border-t">
                    <td className="px-4 py-3">India</td>
                    <td className="px-4 py-3">All</td>
                    <td className="px-4 py-3">5%</td>
                    <td className="px-4 py-3">GST Lower Rate</td>
                    <td className="px-4 py-3 text-right space-x-1">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                <Badge variant="outline">Note</Badge> Tax rates define the percentage of tax applied to products.
              </p>
            </div>
          </div>
          
          <Button onClick={handleSave}>Save Tax Settings</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
