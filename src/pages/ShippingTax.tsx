
import { useState } from "react";
import { PageHeader, PageHeaderCreateButton } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, Plus, Edit, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Mock data for shipping zones
const mockShippingZones = [
  {
    id: "zone-1",
    name: "Domestic",
    countries: ["United States"],
    regions: ["All States"],
    methods: [
      {
        id: "method-1-1",
        name: "Standard Shipping",
        price: 5.99,
        estimatedDays: "3-5",
        freeAbove: 50,
      },
      {
        id: "method-1-2",
        name: "Express Shipping",
        price: 15.99,
        estimatedDays: "1-2",
        freeAbove: 150,
      },
      {
        id: "method-1-3",
        name: "Same Day Delivery",
        price: 29.99,
        estimatedDays: "0-1",
        freeAbove: null,
      },
    ],
  },
  {
    id: "zone-2",
    name: "Canada & Mexico",
    countries: ["Canada", "Mexico"],
    regions: ["All Regions"],
    methods: [
      {
        id: "method-2-1",
        name: "Standard International",
        price: 15.99,
        estimatedDays: "5-7",
        freeAbove: 100,
      },
      {
        id: "method-2-2",
        name: "Express International",
        price: 34.99,
        estimatedDays: "2-3",
        freeAbove: 250,
      },
    ],
  },
  {
    id: "zone-3",
    name: "Europe",
    countries: ["United Kingdom", "France", "Germany", "Spain", "Italy", "Others"],
    regions: ["All Regions"],
    methods: [
      {
        id: "method-3-1",
        name: "Standard International",
        price: 24.99,
        estimatedDays: "7-10",
        freeAbove: 150,
      },
      {
        id: "method-3-2",
        name: "Express International",
        price: 44.99,
        estimatedDays: "3-5",
        freeAbove: 300,
      },
    ],
  },
];

// Mock data for tax rates
const mockTaxRates = [
  {
    id: "tax-1",
    name: "US Sales Tax",
    country: "United States",
    state: "California",
    rate: 8.25,
    applyToShipping: true,
  },
  {
    id: "tax-2",
    name: "US Sales Tax",
    country: "United States",
    state: "New York",
    rate: 8.875,
    applyToShipping: true,
  },
  {
    id: "tax-3",
    name: "US Sales Tax",
    country: "United States",
    state: "Texas",
    rate: 6.25,
    applyToShipping: true,
  },
  {
    id: "tax-4",
    name: "VAT",
    country: "United Kingdom",
    state: "All",
    rate: 20,
    applyToShipping: true,
  },
  {
    id: "tax-5",
    name: "GST",
    country: "Canada",
    state: "All",
    rate: 5,
    applyToShipping: true,
  },
];

export default function ShippingTax() {
  const [activeTab, setActiveTab] = useState("shipping");
  const [isAddShippingOpen, setIsAddShippingOpen] = useState(false);
  const [isAddTaxOpen, setIsAddTaxOpen] = useState(false);
  const [editingZone, setEditingZone] = useState(null);
  const [newShippingZone, setNewShippingZone] = useState({
    name: "",
    countries: "",
    regions: "",
  });
  const [newTaxRate, setNewTaxRate] = useState({
    name: "",
    country: "",
    state: "",
    rate: 0,
    applyToShipping: true,
  });
  const { toast } = useToast();

  const handleAddShippingZone = () => {
    if (!newShippingZone.name || !newShippingZone.countries) {
      toast({
        title: "Invalid information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Shipping zone created",
      description: `${newShippingZone.name} has been added successfully.`,
    });
    
    setIsAddShippingOpen(false);
    setNewShippingZone({
      name: "",
      countries: "",
      regions: "",
    });
  };

  const handleAddTaxRate = () => {
    if (!newTaxRate.name || !newTaxRate.country || newTaxRate.rate <= 0) {
      toast({
        title: "Invalid information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Tax rate added",
      description: `${newTaxRate.name} for ${newTaxRate.country} has been added successfully.`,
    });
    
    setIsAddTaxOpen(false);
    setNewTaxRate({
      name: "",
      country: "",
      state: "",
      rate: 0,
      applyToShipping: true,
    });
  };

  const handleEditZone = (zone) => {
    setEditingZone(zone);
    toast({
      title: "Edit shipping zone",
      description: `Opening editor for ${zone.name} shipping zone.`,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Shipping & Tax" 
        description="Manage shipping methods and tax rates"
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
        </TabsList>
        
        <TabsContent value="shipping" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Shipping Zones</h3>
            <Button onClick={() => setIsAddShippingOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Zone
            </Button>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
            {mockShippingZones.map((zone) => (
              <Card key={zone.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>{zone.name}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => handleEditZone(zone)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    {zone.countries.length > 1 
                      ? `${zone.countries.length} countries` 
                      : zone.countries[0]}
                    {zone.regions[0] !== "All Regions" && ` - ${zone.regions.join(", ")}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2 space-y-3">
                  {zone.methods.map((method) => (
                    <div key={method.id} className="flex justify-between py-1 border-b last:border-0">
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Est. delivery: {method.estimatedDays} days
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${method.price.toFixed(2)}</p>
                        {method.freeAbove && (
                          <p className="text-xs text-muted-foreground">
                            Free above ${method.freeAbove}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-2">
                  <Button variant="outline" size="sm" className="w-full" onClick={() => {
                    toast({
                      title: "Edit shipping methods",
                      description: `Opening editor for ${zone.name} shipping methods.`,
                    });
                  }}>
                    <Truck className="mr-2 h-4 w-4" />
                    Manage Shipping Methods
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="tax" className="mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Tax Rates</h3>
            <Button onClick={() => setIsAddTaxOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Tax Rate
            </Button>
          </div>
          
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left font-medium">Name</th>
                  <th className="h-12 px-4 text-left font-medium">Country</th>
                  <th className="h-12 px-4 text-left font-medium">State/Region</th>
                  <th className="h-12 px-4 text-left font-medium">Rate</th>
                  <th className="h-12 px-4 text-left font-medium">Options</th>
                  <th className="h-12 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockTaxRates.map((tax) => (
                  <tr key={tax.id} className="border-b">
                    <td className="p-4">{tax.name}</td>
                    <td className="p-4">{tax.country}</td>
                    <td className="p-4">{tax.state}</td>
                    <td className="p-4">{tax.rate}%</td>
                    <td className="p-4">
                      {tax.applyToShipping ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Check className="mr-1 h-3 w-3" />
                          Apply to shipping
                        </Badge>
                      ) : "No options"}
                    </td>
                    <td className="p-4">
                      <Button variant="ghost" size="sm" onClick={() => {
                        toast({
                          title: "Edit tax rate",
                          description: `Opening editor for ${tax.name} in ${tax.state}, ${tax.country}.`,
                        });
                      }}>
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4 mt-6">
            <h4 className="font-medium mb-2">Tax Settings</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="prices_include_tax" className="rounded border-gray-300" checked />
                <Label htmlFor="prices_include_tax">Prices entered with tax</Label>
              </div>
              <p className="text-sm text-muted-foreground">
                When checked, entered prices are treated as tax-inclusive. Tax will be calculated and 
                displayed at checkout based on customer's shipping address.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Add Shipping Zone Dialog */}
      <Dialog open={isAddShippingOpen} onOpenChange={setIsAddShippingOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Shipping Zone</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="zoneName">Zone Name</Label>
              <Input
                id="zoneName"
                placeholder="e.g. Domestic, International"
                value={newShippingZone.name}
                onChange={(e) => setNewShippingZone({...newShippingZone, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="countries">Countries</Label>
              <Input
                id="countries"
                placeholder="e.g. United States, Canada"
                value={newShippingZone.countries}
                onChange={(e) => setNewShippingZone({...newShippingZone, countries: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Enter country names separated by commas
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="regions">Regions (Optional)</Label>
              <Input
                id="regions"
                placeholder="e.g. California, New York"
                value={newShippingZone.regions}
                onChange={(e) => setNewShippingZone({...newShippingZone, regions: e.target.value})}
              />
              <p className="text-xs text-muted-foreground">
                Enter specific regions or leave blank for all regions
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddShippingOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddShippingZone}>
              <Plus className="mr-2 h-4 w-4" />
              Create Zone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add Tax Rate Dialog */}
      <Dialog open={isAddTaxOpen} onOpenChange={setIsAddTaxOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Tax Rate</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="taxName">Tax Name</Label>
              <Input
                id="taxName"
                placeholder="e.g. VAT, Sales Tax"
                value={newTaxRate.name}
                onChange={(e) => setNewTaxRate({...newTaxRate, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="e.g. United States"
                value={newTaxRate.country}
                onChange={(e) => setNewTaxRate({...newTaxRate, country: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Region (Optional)</Label>
              <Input
                id="state"
                placeholder="e.g. California, or 'All' for all states"
                value={newTaxRate.state}
                onChange={(e) => setNewTaxRate({...newTaxRate, state: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Tax Rate (%)</Label>
              <Input
                id="rate"
                type="number"
                step="0.01"
                placeholder="e.g. 8.25"
                value={newTaxRate.rate || ''}
                onChange={(e) => setNewTaxRate({...newTaxRate, rate: parseFloat(e.target.value)})}
              />
            </div>
            <div className="flex items-center space-x-2 pt-2">
              <input 
                type="checkbox" 
                id="applyToShipping"
                className="rounded border-gray-300" 
                checked={newTaxRate.applyToShipping}
                onChange={(e) => setNewTaxRate({...newTaxRate, applyToShipping: e.target.checked})}
              />
              <Label htmlFor="applyToShipping">Apply tax to shipping</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTaxOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTaxRate}>
              <Plus className="mr-2 h-4 w-4" />
              Add Tax Rate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
