"use client"
import { useState } from 'react';
import { FieldError, useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function ReviewForm() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [rating, setRating] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const categories = [
    { id: '1', name: 'Electronics' },
    { id: '2', name: 'Clothing' },
    { id: '3', name: 'Books' },
    { id: '4', name: 'Home & Kitchen' },
    { id: '5', name: 'Beauty' },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages(files);
    }
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    setValue('rating', value); // Update react-hook-form value
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    setIsSubmitting(true);
    console.log({
      ...data,
      rating,
      images: selectedImages,
      isPremium,
    });
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Review submitted for approval!');
    }, 1500);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Product Review</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title">Review Title*</Label>
              <Input
                id="title"
                type="text"
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g., Amazing Bluetooth Headphones"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{(errors.title as FieldError).message}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Review*</Label>
              <Textarea
                id="description"
                rows={6}
                {...register('description', { required: 'Description is required' })}
                placeholder="Share your experience with this product..."
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{(errors.description as FieldError).message}</p>
              )}
            </div>

            {/* Rating Field */}
            <div className="space-y-2">
              <Label>Rating*</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="text-primary focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${rating >= star ? 'fill-current' : 'stroke-current'}`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {rating} out of 5
                </span>
              </div>
              <input type="hidden" {...register('rating', { required: 'Rating is required' })} />
              {errors.rating && (
                <p className="text-sm text-red-500">{(errors.rating as FieldError).message}</p>
              )}
            </div>

            {/* Category Field */}
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select
                onValueChange={(value) => setValue('category', value)}
                defaultValue=""
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{(errors.category as FieldError).message}</p>
              )}
            </div>

            {/* Purchase Source Field */}
            <div className="space-y-2">
              <Label htmlFor="purchaseSource">Where did you purchase this? (Optional)</Label>
              <Input
                id="purchaseSource"
                type="url"
                {...register('purchaseSource')}
                placeholder="https://www.amazon.com/product-link"
              />
            </div>

            {/* Images Field */}
            <div className="space-y-2">
              <Label htmlFor="images">Product Images (Optional)</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {selectedImages.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative h-20 w-20 rounded-md overflow-hidden border">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Premium Review Option */}
            <div className="space-y-4 rounded-lg bg-muted p-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPremium"
                  checked={isPremium}
                  onCheckedChange={(checked) => setIsPremium(checked as boolean)}
                />
                <Label htmlFor="isPremium" className="font-medium">
                  Mark as Premium Review
                </Label>
              </div>

              {isPremium && (
                <div className="space-y-2">
                  <Label htmlFor="premiumPrice">Premium Price ($)</Label>
                  <Input
                    id="premiumPrice"
                    type="number"
                    min="1"
                    step="0.01"
                    defaultValue="5.00"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
            >
              Save as Draft
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit for Approval'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}