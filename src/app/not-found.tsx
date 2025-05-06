import Link from "next/link"
import { ArrowLeft } from 'lucide-react'

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center">
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center text-center">
        <div className="mb-4 text-7xl font-bold text-orange-600">404</div>
        <h1 className="mb-2 text-2xl font-bold">Page not found</h1>
        <p className="mb-8 text-muted-foreground">
          Sorry, we {`couldn't`} find the page {`you're`} looking for. It might have been moved or deleted.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button asChild>
            <Link href="/" className="gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/reviews">Browse Reviews</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
