
import { PageHeader, PageHeaderCreateButton } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, FolderTree } from "lucide-react";
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
import { useState } from "react";

// Mock data for categories
const mockCategories = [
  {
    id: "cat-001",
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and accessories",
    parent: null,
    productCount: 124,
    createdAt: "2023-06-15T10:30:00Z",
  },
  {
    id: "cat-002",
    name: "Smartphones",
    slug: "smartphones",
    description: "Mobile phones and accessories",
    parent: "Electronics",
    productCount: 56,
    createdAt: "2023-06-16T11:20:00Z",
  },
  {
    id: "cat-003",
    name: "Laptops",
    slug: "laptops",
    description: "Notebooks and laptop accessories",
    parent: "Electronics",
    productCount: 35,
    createdAt: "2023-06-17T09:45:00Z",
  },
  {
    id: "cat-004",
    name: "Clothing",
    slug: "clothing",
    description: "Apparel and fashion items",
    parent: null,
    productCount: 210,
    createdAt: "2023-06-18T14:20:00Z",
  },
  {
    id: "cat-005",
    name: "Men's Wear",
    slug: "mens-wear",
    description: "Clothing for men",
    parent: "Clothing",
    productCount: 95,
    createdAt: "2023-06-19T16:30:00Z",
  },
  {
    id: "cat-006",
    name: "Women's Wear",
    slug: "womens-wear",
    description: "Clothing for women",
    parent: "Clothing",
    productCount: 115,
    createdAt: "2023-06-20T12:15:00Z",
  },
  {
    id: "cat-007",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    description: "Home appliances and kitchenware",
    parent: null,
    productCount: 87,
    createdAt: "2023-06-21T10:10:00Z",
  },
];

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCategories = mockCategories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Categories" 
        description="Manage your product categories"
        actions={
          <PageHeaderCreateButton>
            <Plus className="mr-2 h-4 w-4" /> Add Category
          </PageHeaderCreateButton>
        }
      />
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <input 
            type="text" 
            placeholder="Search categories..." 
            className="w-full px-4 py-2 rounded-md border border-border" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead className="hidden md:table-cell">Products</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No categories found
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FolderTree className="h-4 w-4 text-muted-foreground" />
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell>{category.parent || "—"}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {category.productCount}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
