
import React from "react";
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
import { MoreHorizontal, Pencil, Eye, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  inventory: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

interface ProductsTableProps {
  productsList: Product[];
  setProductsList: React.Dispatch<React.SetStateAction<Product[]>>;
}

export function ProductsTable({ productsList, setProductsList }: ProductsTableProps) {
  const { toast } = useToast();
  
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
    setProductsList((prevProducts) => 
      prevProducts.filter((product) => product.id !== id)
    );
    
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
              <TableCell className="text-right">₹{product.price.toFixed(2)}</TableCell>
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
