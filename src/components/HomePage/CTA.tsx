import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

const CTA = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="bg-primary rounded-lg p-8 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to share your experience?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join our community today and start sharing your honest product reviews with thousands of users.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link href="/signup">Create an Account</Link>
            </Button>
          </div>
        </div>
      </section>
    );
};

export default CTA;