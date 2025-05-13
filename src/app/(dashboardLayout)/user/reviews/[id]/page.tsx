/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { use, useEffect, useState } from 'react';
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
import { getReviewById, updateReview } from '@/services/review';
import { getCategories } from '@/services/category';
import { Category } from '@/types/cetegories';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProductPageProps {
    params: {
      id: string;
    };
  }

export default function EditReviewForm({ params }: ProductPageProps) {

const { id } = use(params);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedImages, setSelectedImages] = useState<(File & { preview?: string })[]>([]);
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [existingReview, setExistingReview] = useState<any | null>(null);
console.log(existingReview)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FieldValues>();

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

    const fetchReview = async () => {
      try {
        const data = await getReviewById(id);
        setExistingReview(data?.data);
        setRating(data.rating);
        setValue('title', data.title);
        setValue('description', data.description);
        setValue('purchaseSource', data.purchaseSource);
        setValue('category', data.categoryId);
        setValue('rating', data.rating);
        const imageList = data.imageUrls?.map((url: string) => ({
          name: url,
          preview: url,
        }));
        setSelectedImages(imageList || []);
      } catch (error) {
        console.error('Failed to fetch review:', error);
        toast.error('Failed to load review');
      }
    };

    fetchCategories();
    fetchReview();
  }, [id, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const previewFiles = files.map((file) => {
        const preview = URL.createObjectURL(file);
        return Object.assign(file, { preview });
      });
      setSelectedImages(previewFiles);
    }
  };

  const handleRatingChange = (value: number) => {
    setRating(value);
    setValue('rating', value);
  };

  const uploadImages = async (files: (File & { preview?: string })[]) => {
    const newFiles = files.filter((file) => file instanceof File);
    if (newFiles.length === 0) return files.map((file) => file.name);

    const formData = new FormData();
    newFiles.forEach((file) => formData.append('images', file));

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      return data.imageUrls || [];
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Failed to upload images');
      return [];
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const imageUrls = await uploadImages(selectedImages);

      const reviewPayload = {
        title: data.title,
        description: data.description,
        rating,
        categoryId: data.category,
        imageUrls,
        purchaseSource: data.purchaseSource,
        status: 'PENDING' as const,
      };

      await updateReview(id, reviewPayload);
      toast.success('Review updated successfully!');
      reset();
      setRating(0);
      setSelectedImages([]);
    } catch (error) {
      console.error('Review update failed:', error);
      toast.error('Failed to update review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveAsDraft: SubmitHandler<FieldValues> = async (data) => {
    setIsDrafting(true);
    try {
      const imageUrls = await uploadImages(selectedImages);

      const draftPayload = {
        title: data.title,
        description: data.description,
        rating,
        purchaseSource: data.purchaseSource,
        categoryId: data.category,
        imageUrls,
        status: 'DRAFT' as const,
      };

      await updateReview(id, draftPayload);
      toast.success('Draft saved successfully!');
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

  if (!existingReview) {
    return <div>Loading...</div>;
  }

  return (
    <section className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Edit Product Review</h2>
      <Card className="max-w-2xl w-full">
        <CardContent className="p-4 md:p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Review Title*</Label>
              <Input
                id="title"
                type="text"
                defaultValue={existingReview?.title}
                {...register('title', { required: 'Title is required' })}
                placeholder="e.g., Amazing Bluetooth Headphones"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && <p className="text-sm text-red-500">{(errors.title as FieldError).message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Detailed Review*</Label>
              <Textarea
                id="description"
                defaultValue={existingReview?.description}
                rows={6}
                {...register('description', { required: 'Description is required' })}
                placeholder="Share your experience with this product..."
                className={errors.description ? 'border-red-500' : ''}
              />
              {errors.description && <p className="text-sm text-red-500">{(errors.description as FieldError).message}</p>}
            </div>

            {/* Rating */}
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
                        rating >= star ? 'fill-current text-yellow-500' : 'stroke-current text-gray-400'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-muted-foreground">{rating} out of 5</span>
              </div>
              <input  defaultValue={existingReview?.rating} type="hidden" {...register('rating', { required: 'Rating is required' })} />
              {errors.rating && <p className="text-sm text-red-500">{(errors.rating as FieldError).message}</p>}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Select
                onValueChange={(value) => setValue('category', value)}
                defaultValue={existingReview.categoryId || ''}
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
              {errors.category && <p className="text-sm text-red-500">{(errors.category as FieldError).message}</p>}
            </div>

            {/* Purchase Source */}
            <div className="space-y-2">
              <Label htmlFor="purchaseSource">Where did you purchase this? (Optional)</Label>
              <Input
                id="purchaseSource"
                type="url"
                defaultValue={existingReview?.purchaseSource}
                {...register('purchaseSource')}
                placeholder="https://www.amazon.com/product-link"
              />
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label htmlFor="images">Product Images (Optional)</Label>
              <Input
                id="images"
                defaultValue={existingReview?.imageUrls}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {selectedImages.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative h-16 w-16 md:h-20 md:w-20 rounded-md overflow-hidden border">
                      <Image
                        src={file.preview || file.name}
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

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                disabled={isDrafting}
                onClick={handleSubmit(saveAsDraft)}
              >
                {isDrafting ? 'Saving Draft...' : 'Save as Draft'}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Updating...' : 'Update Review'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
