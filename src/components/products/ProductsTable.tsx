
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Pencil, Eye, Trash, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  inventory: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

// Initial products data
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

// Create a global variable to store products data that can be accessed across components
let globalProducts = [...initialProducts];

// Helper function to add a product to the global products list
export const addProductToList = (product: Omit<Product, "id" | "status">) => {
  const newId = `PROD-${String(globalProducts.length + 1).padStart(3, "0")}`;
  const status = product.inventory > 10 ? "In Stock" : product.inventory > 0 ? "Low Stock" : "Out of Stock";
  
  const newProduct: Product = {
    id: newId,
    name: product.name,
    category: product.category || "Other",
    price: Number(product.price),
    inventory: Number(product.inventory) || 0,
    status
  };
  
  globalProducts = [...globalProducts, newProduct];
  return newProduct;
};

export function ProductsTable() {
  const [productsList, setProductsList] = useState<Product[]>(globalProducts);
  const { toast } = useToast();
  
  // Update our local state to reflect the global products
  React.useEffect(() => {
    setProductsList([...globalProducts]);
  }, []);
  
  const getStatusBadge = (status: Product["status"]) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-success hover:bg-success/80">{status}</Badge>;
      case "Low Stock":
        return <Badge className="bg-warning hover:bg-warning/80">{status}</Badge>;
      case "Out of Stock":
        return <Badge className="bg-destructive hover:bg-destructive/80">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const handleDelete = (id: string) => {
    const updatedProducts = productsList.filter((product) => product.id !== id);
    setProductsList(updatedProducts);
    globalProducts = updatedProducts;
    
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted.",
    });
  };
  
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsList.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-right">
                <span className="flex items-center justify-end">
                  <IndianRupee className="h-3.5 w-3.5 mr-1" />
                  {product.price.toFixed(2)}
                </span>
              </TableCell>
              <TableCell className="text-center">{product.inventory}</TableCell>
              <TableCell className="text-center">
                {getStatusBadge(product.status)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Pencil className="h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="flex items-center gap-2 text-destructive" 
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash className="h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
