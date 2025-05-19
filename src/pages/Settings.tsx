import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();
  
  // Fix for line 894 - changed type from string to number
  const [smtpPort, setSmtpPort] = useState<number>(587);
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings" 
        description="Manage your store settings"
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium">Store Information</h3>
              <div className="grid gap-4 mt-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="store-name" className="text-right">
                    Store Name
                  </Label>
                  <Input
                    id="store-name"
                    defaultValue="My E-Commerce Store"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="store-url" className="text-right">
                    Website URL
                  </Label>
                  <Input
                    id="store-url"
                    defaultValue="https://mystore.com"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="store-email" className="text-right">
                    Email Address
                  </Label>
                  <Input
                    id="store-email"
                    defaultValue="contact@mystore.com"
                    type="email"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="store-phone" className="text-right">
                    Phone Number
                  </Label>
                  <Input
                    id="store-phone"
                    defaultValue="+1 (555) 123-4567"
                    className="col-span-3"
                  />
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium">Currency Settings</h3>
              <div className="grid gap-4 mt-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="currency" className="text-right">
                    Currency
                  </Label>
                  <select
                    id="currency"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="INR"
                  >
                    <option value="USD">USD - US Dollar ($)</option>
                    <option value="INR">INR - Indian Rupee (₹)</option>
                    <option value="EUR">EUR - Euro (€)</option>
                    <option value="GBP">GBP - British Pound (£)</option>
                    <option value="JPY">JPY - Japanese Yen (¥)</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="currency-position" className="text-right">
                    Symbol Position
                  </Label>
                  <select
                    id="currency-position"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="before"
                  >
                    <option value="before">Before - ₹100</option>
                    <option value="after">After - 100₹</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium">Store Address</h3>
              <div className="grid gap-4 mt-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address-line1" className="text-right">
                    Address Line 1
                  </Label>
                  <Input
                    id="address-line1"
                    defaultValue="123 Main Street"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address-line2" className="text-right">
                    Address Line 2
                  </Label>
                  <Input
                    id="address-line2"
                    defaultValue="Suite 456"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="city" className="text-right">
                    City
                  </Label>
                  <Input
                    id="city"
                    defaultValue="Mumbai"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="state" className="text-right">
                    State
                  </Label>
                  <Input
                    id="state"
                    defaultValue="Maharashtra"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="postal-code" className="text-right">
                    Postal Code
                  </Label>
                  <Input
                    id="postal-code"
                    defaultValue="400001"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="country" className="text-right">
                    Country
                  </Label>
                  <select
                    id="country"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="IN"
                  >
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="mt-6">Save Changes</Button>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-medium">Credit Card / Debit Card</h3>
                    <p className="text-sm text-muted-foreground">Accept credit and debit card payments</p>
                  </div>
                </div>
                <Badge variant="outline">Enabled</Badge>
              </div>
              
              <div className="grid gap-4 mt-6">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stripe-key" className="text-right">
                    Stripe API Key
                  </Label>
                  <Input
                    id="stripe-key"
                    defaultValue="sk_test_...redacted..."
                    type="password"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="stripe-pub-key" className="text-right">
                    Stripe Public Key
                  </Label>
                  <Input
                    id="stripe-pub-key"
                    defaultValue="pk_test_...redacted..."
                    className="col-span-3"
                  />
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-medium">PayPal</h3>
                    <p className="text-sm text-muted-foreground">Accept payments via PayPal</p>
                  </div>
                </div>
                <Badge variant="outline">Enabled</Badge>
              </div>
              
              <div className="grid gap-4 mt-6">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paypal-client-id" className="text-right">
                    PayPal Client ID
                  </Label>
                  <Input
                    id="paypal-client-id"
                    defaultValue="YOUR_PAYPAL_CLIENT_ID"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="paypal-secret" className="text-right">
                    PayPal Secret
                  </Label>
                  <Input
                    id="paypal-secret"
                    defaultValue="YOUR_PAYPAL_SECRET"
                    type="password"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Mode</Label>
                  <div className="flex items-center space-x-4 col-span-3">
                    <Label htmlFor="paypal-sandbox" className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        id="paypal-sandbox"
                        name="paypal-mode"
                        defaultChecked
                        className="h-4 w-4"
                      />
                      <span>Sandbox</span>
                    </Label>
                    <Label htmlFor="paypal-live" className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        id="paypal-live"
                        name="paypal-mode"
                        className="h-4 w-4"
                      />
                      <span>Live</span>
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-medium">Cash on Delivery</h3>
                    <p className="text-sm text-muted-foreground">Allow customers to pay when receiving their order</p>
                  </div>
                </div>
                <Badge variant="outline">Enabled</Badge>
              </div>
              
              <div className="grid gap-4 mt-6">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cod-instructions" className="text-right">
                    Instructions
                  </Label>
                  <Textarea
                    id="cod-instructions"
                    defaultValue="Please have the exact amount ready for our delivery person."
                    className="col-span-3"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="text-lg font-medium">UPI / Bank Transfer</h3>
                    <p className="text-sm text-muted-foreground">Accept direct bank transfers and UPI payments</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-muted">Disabled</Badge>
              </div>
            </div>
          </div>
          
          <Button onClick={handleSave} className="mt-6">Save Changes</Button>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4 py-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium">Email Notifications</h3>
              
              <div className="grid gap-4 mt-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium">New Order</h4>
                    <p className="text-sm text-muted-foreground">Send email when a new order is placed</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium">Order Status Change</h4>
                    <p className="text-sm text-muted-foreground">Send email when an order status changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div>
                    <h4 className="font-medium">Low Stock Alert</h4>
                    <p className="text-sm text-muted-foreground">Send email when product stock is low</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h4 className="font-medium">Customer Registration</h4>
                    <p className="text-sm text-muted-foreground">Send email when a new customer registers</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-medium">SMTP Settings</h3>
              
              <div className="grid gap-4 mt-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="smtp-host" className="text-right">
                    SMTP Host
                  </Label>
                  <Input
                    id="smtp-host"
                    defaultValue="smtp.gmail.com"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="smtp-port" className="text-right">
                    SMTP Port
                  </Label>
                  <Input
                    id="smtp-port"
                    type="number"
                    defaultValue={smtpPort}
                    onChange={(e) => setSmtpPort(Number(e.target.value))}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="smtp-user" className="text-right">
                    SMTP Username
                  </Label>
                  <Input
                    id="smtp-user"
                    defaultValue="your-email@gmail.com"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="smtp-password" className="text-right">
                    SMTP Password
                  </Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    defaultValue="your-password"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Security</Label>
                  <div className="col-span-3">
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      defaultValue="tls"
                    >
                      <option value="none">None</option>
                      <option value="ssl">SSL</option>
                      <option value="tls">TLS</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="col-start-2 col-span-3">
                    <Button variant="secondary" size="sm">
                      Test Connection
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Button onClick={handleSave} className="mt-6">Save Changes</Button>
        </TabsContent>
        
        <TabsContent value="shipping" className="space-y-4">
          {/* Shipping content here */}
          <Button onClick={handleSave} className="mt-6">Save Changes</Button>
        </TabsContent>
        
        <TabsContent value="tax" className="space-y-4">
          {/* Tax content here */}
          <Button onClick={handleSave} className="mt-6">Save Changes</Button>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          {/* API content here */}
          <Button onClick={handleSave} className="mt-6">Save Changes</Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
