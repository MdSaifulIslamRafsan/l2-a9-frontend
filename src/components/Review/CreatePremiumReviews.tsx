"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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

import { toast } from "react-toastify";
import { type ReviewFormValues, reviewFormSchema } from "@/schema";
import RatingInput from "../ui/core/RatingInput";
import FileUpload from "../ui/core/fileUpload";
import { createPremiumReview } from "@/services/payment";
import { zodResolver } from "@hookform/resolvers/zod";

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
  //   const router = useRouter();
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
      setIsSubmitting(true);

      // Create FormData for file uploads
      const formData = new FormData();

      // Add all form fields to FormData
      Object.entries(values).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      // Add files to FormData
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      // Log form data for debugging
      console.log("Form Values:", values);
      console.log("Selected Files:", selectedFiles);

      // Log FormData entries
      console.log("FormData entries:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      // Submit the form
      const result = await createPremiumReview(formData);
      console.log("result", result);

      if (result.success) {
        toast.success("Review created successfully!");
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
    <div className="max-w-7xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter review title" {...field} />
                  </FormControl>
                  <FormDescription>
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
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
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
                  <FormDescription>
                    Choose the most relevant category for this review.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Rest of the form remains the same */}
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Write your detailed review here..."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a detailed description of the product or service.
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
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <RatingInput
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
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
                  <FormLabel>Purchase Source</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Where was this product purchased?"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional: Where the product was purchased from.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Image Upload */}
          <FormItem>
            <FormLabel>Images</FormLabel>
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
            <FormDescription>
              Upload up to 5 images (max 5MB each). Supported formats: JPEG,
              PNG, WebP.
            </FormDescription>
          </FormItem>

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                    <SelectItem value="UNPUBLISHED">Unpublished</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Set the publication status of this review.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Premium Settings */}
          <div className="border rounded-lg p-6 space-y-6">
            <h3 className="text-lg font-medium">Premium Settings</h3>

            {/* Is Premium */}
            <FormField
              control={form.control}
              name="isPremium"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Premium Review</FormLabel>
                    <FormDescription>
                      Mark this review as premium content that requires payment
                      to access.
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
                    <FormLabel>Regular Price (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          const value = e.target.value
                            ? Number.parseFloat(e.target.value)
                            : undefined;
                          field.onChange(value);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
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
                      <FormLabel>Premium Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number.parseFloat(e.target.value)
                              : undefined;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormDescription>
                        Price to unlock this premium review.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          {/* Submit Button */}
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
        </form>
      </Form>
    </div>
  );
}
