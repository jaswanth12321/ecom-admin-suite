
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings as SettingsIcon, Save, Mail, Globe, CreditCard, BellRing, Shield, Users, Store } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const { toast } = useToast();
  
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "eStore Admin",
    storeEmail: "admin@estore.com",
    supportEmail: "support@estore.com",
    phoneNumber: "+1 (555) 123-4567",
    address: "1234 Commerce St, Suite 500, Portland, OR 97205, USA",
    timezone: "America/Los_Angeles",
    dateFormat: "YYYY-MM-DD",
    currency: "USD",
  });
  
  const handleSaveSettings = (type) => {
    toast({
      title: "Settings saved",
      description: `Your ${type} settings have been updated successfully.`,
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Settings" 
        description="Configure your store and application settings"
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
        <div className="flex overflow-auto pb-2">
          <TabsList className="inline-flex h-auto justify-start bg-transparent p-0 w-full">
            <div className="flex gap-2">
              <TabsTrigger
                value="general"
                className="data-[state=active]:bg-muted data-[state=active]:shadow-none border"
              >
                <Store className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="data-[state=active]:bg-muted data-[state=active]:shadow-none border"
              >
                <Globe className="mr-2 h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                className="data-[state=active]:bg-muted data-[state=active]:shadow-none border"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Payment
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="data-[state=active]:bg-muted data-[state=active]:shadow-none border"
              >
                <BellRing className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-muted data-[state=active]:shadow-none border"
              >
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="data-[state=active]:bg-muted data-[state=active]:shadow-none border"
              >
                <Users className="mr-2 h-4 w-4" />
                Team
              </TabsTrigger>
              <TabsTrigger
                value="advanced"
                className="data-[state=active]:bg-muted data-[state=active]:shadow-none border"
              >
                <SettingsIcon className="mr-2 h-4 w-4" />
                Advanced
              </TabsTrigger>
            </div>
          </TabsList>
        </div>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Configure basic information about your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input 
                    id="storeName" 
                    value={generalSettings.storeName}
                    onChange={(e) => setGeneralSettings({...generalSettings, storeName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input 
                    id="storeEmail" 
                    type="email"
                    value={generalSettings.storeEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, storeEmail: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input 
                    id="supportEmail" 
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input 
                    id="phoneNumber" 
                    value={generalSettings.phoneNumber}
                    onChange={(e) => setGeneralSettings({...generalSettings, phoneNumber: e.target.value})}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input 
                    id="address" 
                    value={generalSettings.address}
                    onChange={(e) => setGeneralSettings({...generalSettings, address: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Regional Settings</CardTitle>
              <CardDescription>
                Configure timezone, currency, and other regional settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select
                    id="timezone"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={generalSettings.timezone}
                    onChange={(e) => setGeneralSettings({...generalSettings, timezone: e.target.value})}
                  >
                    <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                    <option value="America/Denver">Mountain Time (US & Canada)</option>
                    <option value="America/Chicago">Central Time (US & Canada)</option>
                    <option value="America/New_York">Eastern Time (US & Canada)</option>
                    <option value="UTC">UTC</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Paris">Paris</option>
                    <option value="Asia/Tokyo">Tokyo</option>
                    <option value="Australia/Sydney">Sydney</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <select
                    id="dateFormat"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={generalSettings.dateFormat}
                    onChange={(e) => setGeneralSettings({...generalSettings, dateFormat: e.target.value})}
                  >
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <select
                    id="currency"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={generalSettings.currency}
                    onChange={(e) => setGeneralSettings({...generalSettings, currency: e.target.value})}
                  >
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="CAD">Canadian Dollar (CAD)</option>
                    <option value="AUD">Australian Dollar (AUD)</option>
                    <option value="JPY">Japanese Yen (JPY)</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={() => handleSaveSettings('general')}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Brand Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="logo">Logo</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
                        <Store className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Button size="sm" variant="outline">
                        Change Logo
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended size: 250x100px. Max file size: 2MB.
                    </p>
                  </div>
                  
                  <div>
                    <Label htmlFor="favicon">Favicon</Label>
                    <div className="mt-2 flex items-center gap-4">
                      <div className="h-8 w-8 rounded-sm bg-muted flex items-center justify-center">
                        <Store className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <Button size="sm" variant="outline">
                        Change Favicon
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Recommended size: 32x32px. Max file size: 1MB.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="primaryColor"
                        type="text"
                        placeholder="#8B5CF6"
                        className="flex-1"
                      />
                      <div className="w-10 h-10 rounded border bg-primary" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="accentColor"
                        type="text"
                        placeholder="#F97316"
                        className="flex-1"
                      />
                      <div className="w-10 h-10 rounded border bg-orange-500" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={() => handleSaveSettings('appearance')}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Store Theme</CardTitle>
              <CardDescription>
                Select and customize your store theme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-primary h-36 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                      Default Theme
                    </div>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <span className="font-medium">Default</span>
                    <Button size="sm" variant="outline">Active</Button>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-slate-800 h-36 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                      Dark Theme
                    </div>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <span className="font-medium">Dark Mode</span>
                    <Button size="sm" variant="outline" onClick={() => {
                      toast({
                        title: "Theme activated",
                        description: "Dark theme is now active.",
                      });
                    }}>
                      Activate
                    </Button>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-36 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-white font-medium">
                      Custom Theme
                    </div>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <span className="font-medium">Custom</span>
                    <Button size="sm" variant="outline" onClick={() => {
                      toast({
                        title: "Theme activated",
                        description: "Custom theme is now active.",
                      });
                    }}>
                      Activate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Configure payment gateways and options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-4 border rounded-md">
                  <div className="flex-1 flex items-center gap-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Credit Card</h3>
                      <p className="text-sm text-muted-foreground">Accept Visa, Mastercard, American Express, and more</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-green-600">Active</div>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({
                        title: "Configure payment",
                        description: "Opening credit card payment settings.",
                      });
                    }}>Configure</Button>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-md">
                  <div className="flex-1 flex items-center gap-4">
                    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.1 7.82001H4.90001C3.80001 7.82001 2.90002 8.72001 2.90002 9.82001V14.19C2.90002 15.29 3.80001 16.19 4.90001 16.19H19.1C20.2 16.19 21.1 15.29 21.1 14.19V9.82001C21.1 8.72001 20.2 7.82001 19.1 7.82001Z" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7.94 12H16.06" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div>
                      <h3 className="font-medium">PayPal</h3>
                      <p className="text-sm text-muted-foreground">Allow customers to pay with PayPal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-400">Inactive</div>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({
                        title: "PayPal activated",
                        description: "PayPal payment method is now active.",
                      });
                    }}>Activate</Button>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-md">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold">A</div>
                    <div>
                      <h3 className="font-medium">Apple Pay</h3>
                      <p className="text-sm text-muted-foreground">Enable Apple Pay for quick checkout</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-400">Inactive</div>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({
                        title: "Apple Pay activated",
                        description: "Apple Pay payment method is now active.",
                      });
                    }}>Activate</Button>
                  </div>
                </div>
                
                <div className="flex items-center p-4 border rounded-md">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="h-8 w-8 rounded bg-purple-600 flex items-center justify-center text-white font-bold">S</div>
                    <div>
                      <h3 className="font-medium">Stripe</h3>
                      <p className="text-sm text-muted-foreground">Process payments with Stripe</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-400">Inactive</div>
                    <Button variant="outline" size="sm" onClick={() => {
                      toast({
                        title: "Stripe activated",
                        description: "Stripe payment method is now active.",
                      });
                    }}>Activate</Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button onClick={() => handleSaveSettings('payment')}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Configure automated emails for your store
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 border rounded-md">
                  <div className="flex-1">
                    <h3 className="font-medium">Order Confirmation</h3>
                    <p className="text-sm text-muted-foreground">Sent to customers when an order is placed</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="order-confirmation" className="rounded border-gray-300" checked />
                      <Label htmlFor="order-confirmation">Enabled</Label>
                    </div>
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Edit Template
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border rounded-md">
                  <div className="flex-1">
                    <h3 className="font-medium">Shipping Confirmation</h3>
                    <p className="text-sm text-muted-foreground">Sent when an order is shipped</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="shipping-confirmation" className="rounded border-gray-300" checked />
                      <Label htmlFor="shipping-confirmation">Enabled</Label>
                    </div>
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Edit Template
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border rounded-md">
                  <div className="flex-1">
                    <h3 className="font-medium">Order Canceled</h3>
                    <p className="text-sm text-muted-foreground">Sent when an order is canceled</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="order-canceled" className="rounded border-gray-300" checked />
                      <Label htmlFor="order-canceled">Enabled</Label>
                    </div>
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Edit Template
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border rounded-md">
                  <div className="flex-1">
                    <h3 className="font-medium">Customer Account Created</h3>
                    <p className="text-sm text-muted-foreground">Sent when a new customer account is created</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="account-created" className="rounded border-gray-300" checked />
                      <Label htmlFor="account-created">Enabled</Label>
                    </div>
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Edit Template
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center p-3 border rounded-md">
                  <div className="flex-1">
                    <h3 className="font-medium">Abandoned Cart</h3>
                    <p className="text-sm text-muted-foreground">Sent when a customer abandons their cart</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="abandoned-cart" className="rounded border-gray-300" />
                      <Label htmlFor="abandoned-cart">Enabled</Label>
                    </div>
                    <Button variant="outline" size="sm">
                      <Mail className="mr-2 h-4 w-4" />
                      Edit Template
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button onClick={() => handleSaveSettings('notifications')}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Admin Notifications</CardTitle>
              <CardDescription>
                Configure notifications for admin users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h3 className="font-medium">New Order</h3>
                    <p className="text-sm text-muted-foreground">When a new order is placed</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="admin-new-order" className="rounded border-gray-300" checked />
                    <Label htmlFor="admin-new-order">Enable</Label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h3 className="font-medium">Low Inventory</h3>
                    <p className="text-sm text-muted-foreground">When a product is low in stock</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="admin-low-inventory" className="rounded border-gray-300" checked />
                    <Label htmlFor="admin-low-inventory">Enable</Label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h3 className="font-medium">New Customer</h3>
                    <p className="text-sm text-muted-foreground">When a new customer registers</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="admin-new-customer" className="rounded border-gray-300" />
                    <Label htmlFor="admin-new-customer">Enable</Label>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <h3 className="font-medium">New Review</h3>
                    <p className="text-sm text-muted-foreground">When a new product review is submitted</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="admin-new-review" className="rounded border-gray-300" checked />
                    <Label htmlFor="admin-new-review">Enable</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure your account security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Password Policy</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="password-length" className="rounded border-gray-300" checked />
                    <Label htmlFor="password-length">Require minimum 8 characters</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="password-uppercase" className="rounded border-gray-300" checked />
                    <Label htmlFor="password-uppercase">Require uppercase letters</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="password-numbers" className="rounded border-gray-300" checked />
                    <Label htmlFor="password-numbers">Require numbers</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="password-symbols" className="rounded border-gray-300" />
                    <Label htmlFor="password-symbols">Require special characters</Label>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="2fa-required" className="rounded border-gray-300" />
                    <Label htmlFor="2fa-required">Require for all admin users</Label>
                  </div>
                  <Button variant="outline" className="mt-2" onClick={() => {
                    toast({
                      title: "2FA setup",
                      description: "Opening two-factor authentication setup wizard.",
                    });
                  }}>
                    <Shield className="mr-2 h-4 w-4" />
                    Setup 2FA for your account
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Session Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout</Label>
                    <select
                      id="session-timeout"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60" selected>1 hour</option>
                      <option value="120">2 hours</option>
                      <option value="240">4 hours</option>
                    </select>
                    <p className="text-sm text-muted-foreground">
                      Admin users will be logged out after this period of inactivity
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="force-password-change" className="rounded border-gray-300" checked />
                    <Label htmlFor="force-password-change">Force password change every 90 days</Label>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button onClick={() => handleSaveSettings('security')}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage access for your team members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Button className="ml-auto">
                    <Users className="mr-2 h-4 w-4" />
                    Invite Team Member
                  </Button>
                </div>
                
                <div className="border rounded-md">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left font-medium">Name</th>
                        <th className="h-12 px-4 text-left font-medium">Email</th>
                        <th className="h-12 px-4 text-left font-medium">Role</th>
                        <th className="h-12 px-4 text-left font-medium">Status</th>
                        <th className="h-12 px-4 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4 font-medium">John Doe</td>
                        <td className="p-4">john@example.com</td>
                        <td className="p-4">Administrator</td>
                        <td className="p-4">
                          <Badge>Active</Badge>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Jane Smith</td>
                        <td className="p-4">jane@example.com</td>
                        <td className="p-4">Store Manager</td>
                        <td className="p-4">
                          <Badge>Active</Badge>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 font-medium">Mike Johnson</td>
                        <td className="p-4">mike@example.com</td>
                        <td className="p-4">Customer Support</td>
                        <td className="p-4">
                          <Badge>Active</Badge>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-medium">Sarah Williams</td>
                        <td className="p-4">sarah@example.com</td>
                        <td className="p-4">Content Editor</td>
                        <td className="p-4">
                          <Badge variant="secondary">Inactive</Badge>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Pending Invitations</CardTitle>
              <CardDescription>
                Team members who haven't accepted their invitations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left font-medium">Email</th>
                      <th className="h-12 px-4 text-left font-medium">Role</th>
                      <th className="h-12 px-4 text-left font-medium">Invited On</th>
                      <th className="h-12 px-4 text-left font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4">alex@example.com</td>
                      <td className="p-4">Analytics Team</td>
                      <td className="p-4">May 15, 2025</td>
                      <td className="p-4 flex gap-2">
                        <Button variant="outline" size="sm">Resend</Button>
                        <Button variant="ghost" size="sm" className="text-destructive">Revoke</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4">lisa@example.com</td>
                      <td className="p-4">Customer Support</td>
                      <td className="p-4">May 18, 2025</td>
                      <td className="p-4 flex gap-2">
                        <Button variant="outline" size="sm">Resend</Button>
                        <Button variant="ghost" size="sm" className="text-destructive">Revoke</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced store settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">API Access</h3>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div>
                    <p className="font-medium">API Status</p>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable API access for third-party applications
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="api-access" className="rounded border-gray-300" checked />
                    <Label htmlFor="api-access">Enabled</Label>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "API keys",
                      description: "Opening API key management.",
                    });
                  }}>
                    Manage API Keys
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Maintenance Mode</h3>
                <div className="p-4 border rounded-md space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Put your store in maintenance mode
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="maintenance-mode" className="rounded border-gray-300" />
                      <Label htmlFor="maintenance-mode">Enabled</Label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-message">Maintenance Message</Label>
                    <textarea
                      id="maintenance-message"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      rows="3"
                      placeholder="We're currently updating our store and will be back shortly."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Store Backup</h3>
                <div className="p-4 border rounded-md">
                  <p className="text-sm mb-4">
                    Create backups of your store data for safety
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => {
                      toast({
                        title: "Backup started",
                        description: "Your store backup is being created.",
                      });
                    }}>
                      Create Manual Backup
                    </Button>
                    <Button variant="outline" onClick={() => {
                      toast({
                        title: "Backup settings",
                        description: "Opening backup schedule settings.",
                      });
                    }}>
                      Schedule Backups
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button onClick={() => handleSaveSettings('advanced')}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Advanced Settings
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Actions that can't be undone
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-destructive rounded-md">
                <h3 className="font-medium text-destructive mb-2">Reset Store Data</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  This will reset all your store data including products, orders, and customers.
                </p>
                <Button variant="destructive" onClick={() => {
                  toast({
                    title: "Action prevented",
                    description: "Reset store operation requires confirmation.",
                    variant: "destructive",
                  });
                }}>
                  Reset Store Data
                </Button>
              </div>
              
              <div className="p-4 border border-destructive rounded-md">
                <h3 className="font-medium text-destructive mb-2">Delete Store</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Permanently delete your store and all associated data.
                </p>
                <Button variant="destructive" onClick={() => {
                  toast({
                    title: "Action prevented",
                    description: "Delete store operation requires confirmation.",
                    variant: "destructive",
                  });
                }}>
                  Delete Store
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
