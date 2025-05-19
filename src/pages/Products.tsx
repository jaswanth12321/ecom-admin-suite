
import { PageHeader, PageHeaderCreateButton } from "@/components/layout/PageHeader";
import { ProductsTable } from "@/components/products/ProductsTable";
import { ProductFilters } from "@/components/products/ProductFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Products() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Products" 
        description="Manage your product catalog"
        actions={
          <PageHeaderCreateButton>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </PageHeaderCreateButton>
        }
      />
      
      <ProductFilters />
      
      <ProductsTable />
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 8 of 50 products
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
    </div>
  );
}
