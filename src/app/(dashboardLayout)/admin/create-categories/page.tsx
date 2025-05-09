"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "react-toastify"

import { useRouter } from "next/navigation"
import axios from "axios"

type FormData = {
  name: string
}

export default function CreateCategoryPage() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(response.data)
      toast.success("Category created successfully!")
      reset()
      router.push("/categories")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to create category")
      } else {
        toast.error("An unexpected error occurred")
      }
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Category</h1>
        <p className="text-muted-foreground">Add a new category to the product review portal.</p>
      </div>

      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>New Category</CardTitle>
          <CardDescription>Enter the name for the new product category.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Category Name</Label>
                <Input
                  id="name"
                  placeholder="Enter category name"
                  {...register("name", {
                    required: "Category name is required",
                    minLength: {
                      value: 3,
                      message: "Category name must be at least 3 characters",
                    },
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
         
          <Button 
            type="submit" 
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create Category"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}