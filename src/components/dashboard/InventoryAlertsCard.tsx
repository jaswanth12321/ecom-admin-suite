
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

const lowStockItems = [
  {
    id: "PROD-392",
    name: "Wireless Earbuds",
    stock: 3,
    threshold: 5,
    critical: true,
  },
  {
    id: "PROD-127",
    name: "Premium Leather Wallet",
    stock: 4,
    threshold: 10,
    critical: true,
  },
  {
    id: "PROD-864",
    name: "Stainless Steel Water Bottle",
    stock: 6,
    threshold: 10,
    critical: false,
  },
  {
    id: "PROD-593",
    name: "Smart Watch Band",
    stock: 8,
    threshold: 15,
    critical: false,
  },
];

export function InventoryAlertsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <CardTitle>Inventory Alerts</CardTitle>
          <Badge variant="outline" className="ml-2">
            {lowStockItems.length}
          </Badge>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                {item.critical && (
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                )}
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={item.critical ? "destructive" : "outline"}>
                  {item.stock} left
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
