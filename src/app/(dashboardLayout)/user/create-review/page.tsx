
'use client';

import { useEffect, useState } from 'react';
import {
  FieldError,
  FieldValues,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { createNormalReview } from '@/services/review';
import { getCategories } from '@/services/category';
import { Category } from '@/types/cetegories';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ReviewForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data?.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        toast.error('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedImages(files);
    }
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    setValue('rating', value);
  };

  // const uploadImages = async (files: File[]) => {
  //   if (files.length === 0) return [];
  
  //   const formData = new FormData();
  //   files.forEach(file => formData.append('images', file));
  
  //   try {
  //     const response = await fetch('/api/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });
  
  //     const data = await response.json();
  
  //     // assuming your backend returns: { imageUrls: [url1, url2, ...] }
  //     return data.imageUrls || [];
  //   } catch (error) {
  //     console.error('Image upload failed:', error);
  //     toast.error('Failed to upload images');
  //     return [];
  //   }
  // };
  

  // const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  //   setIsSubmitting(true);
  //   try {
  //     const imageUrls = await uploadImages(selectedImages);
      
  //     const reviewPayload = {
  //       title: data.title,
  //       description: data.description,
  //       rating,
  //       categoryId: data.category,
  //       imageUrls,
  //       purchaseSource: data.purchaseSource,
  //       status: 'PENDING' as const,
  //     };

  //     const response = await createNormalReview(reviewPayload);
  //     console.log('Review submitted:', response);
      
  //     // Reset form after successful submission
  //     reset();
  //     setRating(0);
  //     setSelectedImages([]);
      
  //     toast.success('Review submitted successfully!');
  //   } catch (error) {
  //     console.error('Review submission failed:', error);
  //     toast.error('Failed to submit review');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // const saveAsDraft: SubmitHandler<FieldValues> = async (data) => {
  //   setIsDrafting(true);
  //   try {
  //     const imageUrls = await uploadImages(selectedImages);
      
  //     const draftPayload = {
  //       title: data.title,
  //       description: data.description,
  //       rating,
  //       purchaseSource: data.purchaseSource,
  //       categoryId: data.category,
  //       imageUrls,
  //       status: 'DRAFT' as const,
  //     };

  //     const response = await createNormalReview(draftPayload);
  //     console.log('Draft saved:', response);
      
  //     // Reset form after successful draft save
  //     reset();
  //     setRating(0);
  //     setSelectedImages([]);
      
  //     toast.success('Draft saved successfully!');
  //   } catch (error) {
  //     console.error('Saving draft failed:', error);
  //     toast.error('Failed to save draft');
  //   } finally {
  //     setIsDrafting(false);
  //   }
  // };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      
      // Add all form data
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("rating", rating.toString());
      formData.append("categoryId", data.category);
      formData.append("status", "PENDING");
      if (data.purchaseSource) {
        formData.append("purchaseSource", data.purchaseSource);
      }
  
      // Add files
      selectedImages.forEach((file) => {
        formData.append("imageUrls", file);
      });
  
      const response = await createNormalReview(formData);
      console.log(response)
      if(response?.success) {
        toast.success(response.message || 'Review submitted successfully!')
      }else{
        toast.error(response?.message)
      }
      
      
      reset();
      setRating(0);
      setSelectedImages([]);
    } catch (error) {
      console.error('Review submission failed:', error);
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const saveAsDraft: SubmitHandler<FieldValues> = async (data) => {
    setIsDrafting(true);
    try {
      const formData = new FormData();
      
      // Add all form data
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("rating", rating.toString());
      formData.append("categoryId", data.category);
      formData.append("status", "DRAFT");
      if (data.purchaseSource) {
        formData.append("purchaseSource", data.purchaseSource);
      }
  
      // Add files
      selectedImages.forEach((file) => {
        formData.append("imageUrls", file);
      });
  
      const response = await createNormalReview(formData);


      if(response?.success) {
        toast.success(response.message || 'Draft saved successfully!')
      }else{
        toast.error(response?.message)
      }
      
      // Reset form after successful draft save
      reset();
      setRating(0);
      setSelectedImages([]);
      
    } catch (error) {
      console.error('Saving draft failed:', error);
      toast.error('Failed to save draft');
    } finally {
      setIsDrafting(false);
    }
  };

  return (
    <section className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Create Product Review</h2>
      <Card className="max-w-2xl w-full">
        <CardContent className="p-4 md:p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <div className="space-y-3 md:space-y-4">
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
                  <p className="text-sm text-red-500">
                    {(errors.title as FieldError).message}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Review*</Label>
                <Textarea
                  id="description"
                  rows={6}
                  {...register('description', {
                    required: 'Description is required',
                  })}
                  placeholder="Share your experience with this product..."
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-red-500">
                    {(errors.description as FieldError).message}
                  </p>
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
                        className={`h-5 w-5 md:h-6 md:w-6 ${
                          rating >= star ? 'fill-current' : 'stroke-current'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {rating} out of 5
                  </span>
                </div>
                <input
                  type="hidden"
                  {...register('rating', { required: 'Rating is required' })}
                />
                {errors.rating && (
                  <p className="text-sm text-red-500">
                    {(errors.rating as FieldError).message}
                  </p>
                )}
              </div>

              {/* Category Field */}
              <div className="space-y-2">
                <Label htmlFor="category">Category*</Label>
                <Select
                  onValueChange={(value) => setValue('category', value)}
                  defaultValue=""
                >
                  <SelectTrigger
                    className={errors.category ? 'border-red-500' : ''}
                  >
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
                  <p className="text-sm text-red-500">
                    {(errors.category as FieldError).message}
                  </p>
                )}
              </div>

              {/* Purchase Source Field */}
              <div className="space-y-2">
                <Label htmlFor="purchaseSource">
                  Where did you purchase this? (Optional)
                </Label>
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
                      <div
                        key={index}
                        className="relative h-16 w-16 md:h-20 md:w-20 rounded-md overflow-hidden border"
                      >
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleSubmit(saveAsDraft)}
                disabled={isDrafting}
                className="w-full sm:w-auto"
              >
                {isDrafting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save as Draft'
                )}
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-auto mb-3 sm:mb-0"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
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
    </section>
  );
}