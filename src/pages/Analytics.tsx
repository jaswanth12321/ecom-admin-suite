
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Download, Settings, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for charts
const salesData = [
  { name: "Jan", sales: 4000, orders: 240, revenue: 24000 },
  { name: "Feb", sales: 3000, orders: 198, revenue: 22000 },
  { name: "Mar", sales: 5000, orders: 300, revenue: 28000 },
  { name: "Apr", sales: 2780, orders: 190, revenue: 20000 },
  { name: "May", sales: 4890, orders: 320, revenue: 32000 },
  { name: "Jun", sales: 3780, orders: 250, revenue: 25000 },
  { name: "Jul", sales: 6000, orders: 350, revenue: 35000 },
  { name: "Aug", sales: 5500, orders: 310, revenue: 30000 },
  { name: "Sep", sales: 4800, orders: 290, revenue: 28000 },
  { name: "Oct", sales: 6500, orders: 380, revenue: 38000 },
  { name: "Nov", sales: 5300, orders: 320, revenue: 32000 },
  { name: "Dec", sales: 7000, orders: 400, revenue: 42000 },
];

const categoryData = [
  { name: "Electronics", value: 35 },
  { name: "Clothing", value: 25 },
  { name: "Home & Kitchen", value: 15 },
  { name: "Books", value: 10 },
  { name: "Beauty", value: 8 },
  { name: "Sports", value: 7 },
];

const deviceData = [
  { name: "Desktop", value: 48 },
  { name: "Mobile", value: 45 },
  { name: "Tablet", value: 7 },
];

const trafficData = [
  { name: "Direct", value: 30 },
  { name: "Search", value: 40 },
  { name: "Social", value: 15 },
  { name: "Referral", value: 10 },
  { name: "Email", value: 5 },
];

const topProducts = [
  { name: "Wireless Earbuds", units: 230, revenue: 16100 },
  { name: "Smart Watch", units: 180, revenue: 23400 },
  { name: "Fitness Tracker", units: 170, revenue: 15300 },
  { name: "Gaming Laptop", units: 125, revenue: 187500 },
  { name: "Bluetooth Speaker", units: 210, revenue: 14700 },
];

// Colors for charts
const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("year");
  const { toast } = useToast();
  
  const handleExportData = () => {
    toast({
      title: "Exporting data",
      description: "Your analytics report is being generated.",
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Analytics Dashboard" 
        description="Track sales, orders, and customer metrics"
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <Tabs defaultValue={timeRange} onValueChange={setTimeRange} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="week">Last 7 days</TabsTrigger>
            <TabsTrigger value="month">Last 30 days</TabsTrigger>
            <TabsTrigger value="quarter">Quarter</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$336,000</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">↑ 12.8%</span> vs previous period
            </div>
            <div className="h-[80px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,248</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">↑ 8.3%</span> vs previous period
            </div>
            <div className="h-[80px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.6%</div>
            <div className="text-xs text-muted-foreground">
              <span className="text-red-500 font-medium">↓ 0.4%</span> vs previous period
            </div>
            <div className="h-[80px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[
                  { month: 'Jan', rate: 2.8 },
                  { month: 'Feb', rate: 3.1 },
                  { month: 'Mar', rate: 3.3 },
                  { month: 'Apr', rate: 3.0 },
                  { month: 'May', rate: 3.2 },
                  { month: 'Jun', rate: 3.5 },
                  { month: 'Jul', rate: 3.8 },
                  { month: 'Aug', rate: 3.9 },
                  { month: 'Sep', rate: 3.7 },
                  { month: 'Oct', rate: 3.5 },
                  { month: 'Nov', rate: 3.6 },
                  { month: 'Dec', rate: 3.6 },
                ]} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <Line type="monotone" dataKey="rate" stroke="#ffc658" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <BarChart3 className="mr-2 h-5 w-5" />
            Revenue Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue ($)" strokeWidth={2} />
                <Line type="monotone" dataKey="orders" stroke="#82ca9d" name="Orders" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topProducts}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="units" fill="#8884d8" name="Units Sold" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {trafficData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">$103.45</div>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500 font-medium">↑ 5.2%</span> vs previous period
            </div>
            <div className="h-[160px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={[
                    { month: 'Jan', value: 98.12 },
                    { month: 'Feb', value: 99.45 },
                    { month: 'Mar', value: 97.23 },
                    { month: 'Apr', value: 98.87 },
                    { month: 'May', value: 100.21 },
                    { month: 'Jun', value: 101.54 },
                    { month: 'Jul', value: 102.33 },
                    { month: 'Aug', value: 101.89 },
                    { month: 'Sep', value: 103.02 },
                    { month: 'Oct', value: 102.45 },
                    { month: 'Nov', value: 103.12 },
                    { month: 'Dec', value: 103.45 },
                  ]}
                >
                  <Line type="monotone" dataKey="value" stroke="#82ca9d" strokeWidth={2} dot={false} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
