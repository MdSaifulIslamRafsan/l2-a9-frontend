"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Loader2,
  Info,
  Star,
  DollarSign,
  Tag,
  FileImage,
  ListChecks,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { toast } from "react-toastify";
import { type ReviewFormValues, reviewFormSchema } from "@/schema";
import RatingInput from "../ui/core/RatingInput";
import FileUpload from "../ui/core/fileUpload";
import { createPremiumReview } from "@/services/payment";

// Define the props type for the component
interface CreateReviewFormProps {
  categories: {
    id: string;
    name: string;
  }[];
}

export default function CreateReviewForm({
  categories,
}: CreateReviewFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  // Initialize the form with the correct type
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      title: "",
      description: "",
      rating: 0,
      purchaseSource: "",
      categoryId: "",
      status: "DRAFT",
      isPremium: false,
      price: undefined,
      premiumPrice: undefined,
    },
  });

  // Watch the isPremium field to conditionally render the premiumPrice field
  const isPremium = form.watch("isPremium");

  // Handle form submission
  const onSubmit = async (values: ReviewFormValues) => {
    try {
      // Additional validation for premium price
      if (
        values.isPremium &&
        (!values.premiumPrice || values.premiumPrice <= 0)
      ) {
        form.setError("premiumPrice", {
          type: "manual",
          message: "Premium price is required and must be greater than 0",
        });
        return;
      }

      setIsSubmitting(true);

      // Create FormData for file uploads
      const formData = new FormData();

      // Add all form fields to FormData with proper type handling
      // Numeric fields
      if (values.rating !== undefined) {
        formData.append("rating", values.rating.toString());
      }

      if (values.price !== undefined) {
        formData.append("price", values.price.toString());
      }

      // IMPORTANT: Ensure premiumPrice is always included when isPremium is true
      if (values.isPremium) {
        if (values.premiumPrice !== undefined) {
          formData.append("premiumPrice", values.premiumPrice.toString());
        } else {
          // This should never happen due to our validation, but as a fallback
          formData.append("premiumPrice", "0");
        }
      }

      // Boolean fields
      formData.append("isPremium", values.isPremium.toString());

      // String fields
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("categoryId", values.categoryId);
      formData.append("status", values.status);

      if (values.purchaseSource) {
        formData.append("purchaseSource", values.purchaseSource);
      }

      // Add files to FormData
      selectedFiles.forEach((file) => {
        formData.append("imageUrls", file);
      });

      // Submit the form
      const result = await createPremiumReview(formData);

      if (result.success) {
        toast.success("Review created successfully!");
        form.reset();
        setSelectedFiles([]); // Clear selected files
        // router.push("/admin/reviews");
      } else {
        toast.error(result.message || "Failed to create review");
      }
    } catch (error) {
      console.error("Error creating review:", error);
      toast.error("An error occurred while creating the review");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="bg-muted/50">
        <CardTitle className="text-2xl flex items-center gap-2">
          <Tag className="h-5 w-5" />
          Create Premium Review
        </CardTitle>
        <CardDescription>
          Create a detailed product review with images and premium features
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium">Basic Information</h3>
                <Badge variant="outline" className="ml-2">
                  Required
                </Badge>
              </div>
              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-base">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter review title"
                          {...field}
                          className="h-11 text-base"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Give your review a clear, descriptive title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-11 text-base">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories && categories.length > 0 ? (
                            categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="no-categories" disabled>
                              No categories available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormDescription className="text-xs">
                        Choose the most relevant category for this review.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your detailed review here..."
                        className="min-h-[200px] text-base resize-y p-4"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Provide a detailed description of the product or service.
                      Include pros, cons, and your overall experience.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Rating */}
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base flex items-center gap-1">
                        <Star className="h-4 w-4" /> Rating
                      </FormLabel>
                      <FormControl>
                        <div className="bg-muted/30 p-3 rounded-md">
                          <RatingInput
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Rate the product from 1 to 5 stars.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Purchase Source */}
                <FormField
                  control={form.control}
                  name="purchaseSource"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        Purchase Source
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Where was this product purchased?"
                          {...field}
                          value={field.value || ""}
                          className="h-11 text-base"
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Optional: Where the product was purchased from.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium flex items-center gap-1">
                  <FileImage className="h-4 w-4" /> Images
                </h3>
                <Badge variant="outline" className="ml-2">
                  Optional
                </Badge>
              </div>
              <Separator />

              {/* Image Upload */}
              <FormItem>
                <FormControl>
                  <FileUpload
                    maxFiles={5}
                    maxSize={5 * 1024 * 1024} // 5MB
                    accept={{
                      "image/jpeg": [],
                      "image/png": [],
                      "image/webp": [],
                    }}
                    onFilesChange={setSelectedFiles}
                  />
                </FormControl>
                <FormDescription className="text-xs mt-2">
                  Upload up to 5 images (max 5MB each). Supported formats: JPEG,
                  PNG, WebP.
                </FormDescription>
              </FormItem>
            </div>

            {/* Publication Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium flex items-center gap-1">
                  <ListChecks className="h-4 w-4" /> Publication Settings
                </h3>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-xs">
                        Control how and when your review is published
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Separator />

              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">
                      Publication Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 text-base">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DRAFT">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-slate-100">
                              Draft
                            </Badge>
                            <span>Save without publishing</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="PUBLISHED">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-green-100 text-green-800"
                            >
                              Published
                            </Badge>
                            <span>Make visible to all users</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="UNPUBLISHED">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-800"
                            >
                              Unpublished
                            </Badge>
                            <span>Hide from users</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="PENDING">
                          <div className="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              className="bg-yellow-100 text-yellow-800"
                            >
                              Pending
                            </Badge>
                            <span>Awaiting approval</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-xs">
                      Set the publication status of this review.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Premium Settings */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium flex items-center gap-1">
                  <DollarSign className="h-4 w-4" /> Premium Settings
                </h3>
                <Badge className="bg-primary/20 text-primary border-primary/20">
                  Premium
                </Badge>
              </div>
              <Separator />

              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  {/* Is Premium */}
                  <FormField
                    control={form.control}
                    name="isPremium"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-6">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              // If unchecking, clear premium price
                              if (!checked) {
                                form.setValue("premiumPrice", undefined);
                              } else if (!form.getValues("premiumPrice")) {
                                // If checking and no premium price, set a default
                                form.setValue("premiumPrice", 10);
                              }
                            }}
                            className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-base">
                            Premium Review
                          </FormLabel>
                          <FormDescription className="text-xs">
                            Mark this review as premium content that requires
                            payment to access.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Regular Price */}
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base">
                            Regular Price (Optional)
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                Tk
                              </span>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                                value={field.value || ""}
                                onChange={(e) => {
                                  const value = e.target.value
                                    ? Number(e.target.value)
                                    : undefined;
                                  field.onChange(value);
                                }}
                                className="pl-8 h-11 text-base"
                              />
                            </div>
                          </FormControl>
                          <FormDescription className="text-xs">
                            Regular price of the product (if applicable).
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Premium Price - Only show when isPremium is true */}
                    {isPremium && (
                      <FormField
                        control={form.control}
                        name="premiumPrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base">
                              Premium Price{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                  Tk
                                </span>
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  required
                                  {...field}
                                  value={field.value || ""}
                                  onChange={(e) => {
                                    const value = e.target.value
                                      ? Number(e.target.value)
                                      : undefined;
                                    field.onChange(value);
                                  }}
                                  className="pl-8 h-11 text-base border-primary/50 focus-visible:ring-primary"
                                />
                              </div>
                            </FormControl>
                            <FormDescription className="text-xs">
                              <span className="font-semibold">Required:</span>{" "}
                              Price to unlock this premium review.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Separator className="mb-6" />
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full md:w-auto"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Review...
                    </>
                  ) : (
                    "Create Review"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
