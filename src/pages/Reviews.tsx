
import { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Check, X, AlertTriangle } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data for reviews
const mockReviews = [
  {
    id: "rev-001",
    productId: "p-123",
    productName: "Wireless Earbuds",
    customerId: "c-456",
    customerName: "John Smith",
    rating: 5,
    title: "Great product!",
    comment: "These earbuds have amazing sound quality and battery life. Highly recommend!",
    status: "published",
    date: "2025-05-10T14:30:00Z",
    reported: false,
  },
  {
    id: "rev-002",
    productId: "p-789",
    productName: "Premium Leather Wallet",
    customerId: "c-123",
    customerName: "Emily Johnson",
    rating: 4,
    title: "Good quality",
    comment: "Nice wallet, good leather quality but slightly smaller than expected.",
    status: "published",
    date: "2025-05-08T09:15:00Z",
    reported: false,
  },
  {
    id: "rev-003",
    productId: "p-456",
    productName: "Smart Watch",
    customerId: "c-789",
    customerName: "Michael Brown",
    rating: 2,
    title: "Disappointed",
    comment: "The battery drains too quickly and the app is buggy. Not worth the price.",
    status: "pending",
    date: "2025-05-12T16:45:00Z",
    reported: true,
  },
  {
    id: "rev-004",
    productId: "p-234",
    productName: "Yoga Mat",
    customerId: "c-567",
    customerName: "Sarah Wilson",
    rating: 5,
    title: "Perfect yoga mat!",
    comment: "Great grip, comfortable thickness, and easy to clean. Excellent purchase!",
    status: "published",
    date: "2025-05-11T11:20:00Z",
    reported: false,
  },
  {
    id: "rev-005",
    productId: "p-567",
    productName: "Coffee Maker",
    customerId: "c-345",
    customerName: "David Martinez",
    rating: 1,
    title: "Broken on arrival",
    comment: "The coffee maker arrived damaged and doesn't work. Very disappointed with the purchase.",
    status: "pending",
    date: "2025-05-13T08:30:00Z",
    reported: true,
  },
];

export default function Reviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [reviewDetail, setReviewDetail] = useState(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredReviews = mockReviews.filter((review) => {
    const matchesSearch = 
      review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    const matchesRating = ratingFilter === "all" || review.rating === parseInt(ratingFilter);
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const viewReviewDetail = (review) => {
    setReviewDetail(review);
    setIsDetailDialogOpen(true);
  };

  const approveReview = (id) => {
    toast({
      title: "Review approved",
      description: "The review has been published.",
    });
    setIsDetailDialogOpen(false);
  };

  const rejectReview = (id) => {
    toast({
      title: "Review rejected",
      description: "The review has been rejected and will not be published.",
    });
    setIsDetailDialogOpen(false);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Reviews & Ratings" 
        description="Manage customer reviews and product ratings"
      />
      
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Input 
            type="text" 
            placeholder="Search reviews..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
          </select>
          <select
            className="rounded-md border border-input bg-background px-3 py-2 text-sm"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Review</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No reviews found
                </TableCell>
              </TableRow>
            ) : (
              filteredReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">
                    {review.productName}
                  </TableCell>
                  <TableCell>
                    {renderStars(review.rating)}
                  </TableCell>
                  <TableCell>{review.customerName}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="max-w-xs truncate">{review.title}</div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {new Date(review.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        review.status === "published" ? "default" : 
                        review.status === "pending" ? "outline" : 
                        "secondary"
                      }>
                        {review.status}
                      </Badge>
                      {review.reported && (
                        <Badge variant="destructive" className="ml-1">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          reported
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => viewReviewDetail(review)}>
                          View Details
                        </DropdownMenuItem>
                        {review.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => approveReview(review.id)}>
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => rejectReview(review.id)}>
                              Reject
                            </DropdownMenuItem>
                          </>
                        )}
                        {review.status === "published" && (
                          <DropdownMenuItem className="text-destructive" onClick={() => {
                            toast({
                              title: "Review hidden",
                              description: "The review has been hidden from customers.",
                            });
                          }}>
                            Hide Review
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Review Detail Dialog */}
      {reviewDetail && (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Review Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Product</p>
                  <p>{reviewDetail.productName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Customer</p>
                  <p>{reviewDetail.customerName}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Rating</p>
                <div className="mt-1">{renderStars(reviewDetail.rating)}</div>
              </div>
              <div>
                <p className="text-sm font-medium">Title</p>
                <p className="font-semibold">{reviewDetail.title}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Comment</p>
                <p className="border rounded-md p-3 bg-muted/30">{reviewDetail.comment}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p>{new Date(reviewDetail.date).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <Badge className="mt-1" variant={
                    reviewDetail.status === "published" ? "default" : 
                    reviewDetail.status === "pending" ? "outline" : 
                    "secondary"
                  }>
                    {reviewDetail.status}
                  </Badge>
                  {reviewDetail.reported && (
                    <Badge variant="destructive" className="ml-2 mt-1">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      reported
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              {reviewDetail.status === "pending" ? (
                <>
                  <Button variant="outline" onClick={() => rejectReview(reviewDetail.id)}>
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={() => approveReview(reviewDetail.id)}>
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  Close
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
