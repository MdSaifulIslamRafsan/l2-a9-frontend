import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">ReviewHub</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Discover honest product reviews from real users. Share your experiences and help others make informed
              decisions.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm hover:text-primary">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/reviews?category=electronics" className="text-sm hover:text-primary">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/reviews?category=home-appliances" className="text-sm hover:text-primary">
                  Home Appliances
                </Link>
              </li>
              <li>
                <Link href="/reviews?category=fashion" className="text-sm hover:text-primary">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/reviews?category=beauty" className="text-sm hover:text-primary">
                  Beauty & Personal Care
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm hover:text-primary">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500 dark:text-gray-300">
          <p>© {new Date().getFullYear()} ReviewHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
