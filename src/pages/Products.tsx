
import { useState } from "react";
import { PageHeader, PageHeaderCreateButton } from "@/components/layout/PageHeader";
import { ProductsTable, Product } from "@/components/products/ProductsTable";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Initial product data
const initialProducts: Product[] = [
  {
    id: "PROD-001",
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 59.99,
    inventory: 32,
    status: "In Stock",
  },
  {
    id: "PROD-002",
    name: "Smart Watch",
    category: "Electronics",
    price: 199.99,
    inventory: 18,
    status: "In Stock",
  },
  {
    id: "PROD-003",
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 79.99,
    inventory: 5,
    status: "Low Stock",
  },
  {
    id: "PROD-004",
    name: "Premium Leather Wallet",
    category: "Accessories",
    price: 49.99,
    inventory: 42,
    status: "In Stock",
  },
  {
    id: "PROD-005",
    name: "Stainless Steel Water Bottle",
    category: "Kitchen",
    price: 24.99,
    inventory: 0,
    status: "Out of Stock",
  },
  {
    id: "PROD-006",
    name: "Fitness Tracker",
    category: "Electronics",
    price: 89.99,
    inventory: 27,
    status: "In Stock",
  },
  {
    id: "PROD-007",
    name: "Bamboo Cutting Board",
    category: "Kitchen",
    price: 34.99,
    inventory: 8,
    status: "Low Stock",
  },
  {
    id: "PROD-008",
    name: "Ceramic Coffee Mug",
    category: "Kitchen",
    price: 12.99,
    inventory: 53,
    status: "In Stock",
  },
];

export default function Products() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const generateProductId = () => {
    // Find highest ID number and increment by 1
    const maxId = productsList
      .map(p => parseInt(p.id.split("-")[1]))
      .reduce((max, id) => Math.max(max, id), 0);
    
    const newIdNumber = maxId + 1;
    return `PROD-${newIdNumber.toString().padStart(3, "0")}`;
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      toast({
        title: "Error",
        description: "Product name and price are required",
        variant: "destructive",
      });
      return;
    }

    // Create new product with proper structure
    const product: Product = {
      id: generateProductId(),
      name: newProduct.name,
      category: newProduct.category || "Other",
      price: parseFloat(newProduct.price) || 0,
      inventory: parseInt(newProduct.stock) || 0,
      status: parseInt(newProduct.stock) > 10 ? "In Stock" : parseInt(newProduct.stock) > 0 ? "Low Stock" : "Out of Stock"
    };

    // Add the product to the list
    setProductsList([...productsList, product]);

    toast({
      title: "Success",
      description: "Product added successfully",
    });

    setIsDialogOpen(false);
    setNewProduct({
      name: "",
      price: "",
      category: "",
      stock: "",
      description: ""
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Products" 
        description="Manage your product catalog"
        actions={
          <PageHeaderCreateButton onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </PageHeaderCreateButton>
        }
      />
      
      <ProductFilters />
      
      <ProductsTable productsList={productsList} setProductsList={setProductsList} />
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {productsList.length} of 50 products
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

      {/* Add Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Create a new product. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price (₹)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <select
                id="category"
                name="category"
                value={newProduct.category}
                onChange={handleInputChange}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Select a category</option>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Home & Kitchen">Home & Kitchen</option>
                <option value="Accessories">Accessories</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={newProduct.stock}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProduct}>Save Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
