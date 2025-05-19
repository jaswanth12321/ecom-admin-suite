
import { useState } from "react";
import { PageHeader, PageHeaderCreateButton } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus, FolderTree, X } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState(mockCategories);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
    parent: "",
  });
  const { toast } = useToast();

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });

    // Auto-generate slug from name
    if (name === "name") {
      setNewCategory({
        ...newCategory,
        name: value,
        slug: value.toLowerCase().replace(/\s+/g, '-'),
      });
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast({
        title: "Error",
        description: "Category name is required",
        variant: "destructive",
      });
      return;
    }

    const newCategoryItem = {
      id: `cat-${String(categories.length + 1).padStart(3, "0")}`,
      name: newCategory.name,
      slug: newCategory.slug,
      description: newCategory.description,
      parent: newCategory.parent || null,
      productCount: 0,
      createdAt: new Date().toISOString(),
    };

    setCategories([...categories, newCategoryItem]);
    setIsDialogOpen(false);
    setNewCategory({
      name: "",
      slug: "",
      description: "",
      parent: "",
    });

    toast({
      title: "Success",
      description: "Category added successfully",
    });
  };

  const parentOptions = categories.filter(cat => cat.parent === null);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Categories" 
        description="Manage your product categories"
        actions={
          <PageHeaderCreateButton onClick={() => setIsDialogOpen(true)}>
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

      {/* Add Category Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Create a new product category. Click save when you're done.
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
                value={newCategory.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="slug" className="text-right">
                Slug
              </Label>
              <Input
                id="slug"
                name="slug"
                value={newCategory.slug}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="parent" className="text-right">
                Parent
              </Label>
              <select
                id="parent"
                name="parent"
                value={newCategory.parent}
                onChange={handleInputChange}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">None (Top Level)</option>
                {parentOptions.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={newCategory.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCategory}>Save Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
