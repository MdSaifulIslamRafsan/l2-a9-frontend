import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';

const Banner = () => {
  return (
    <section className="bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-600  py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover Honest Product Reviews
              </h1>
              <p className="max-w-[600px] text-gray-500 dark:text-gray-300 md:text-xl">
                Join our community of reviewers sharing authentic experiences
                with products. Find trusted reviews or share your own to help
                others make informed decisions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/reviews">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Browse Reviews
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  variant="outline"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50"
                >
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
         
            <div className="relative w-full max-w-[500px] aspect-square rounded-lg ">
            <div className="absolute -top-6 -left-6 bg-orange-400 rounded-lg p-4 shadow-lg">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div className="bg-white h-full p-10 rounded-lg shadow-xl overflow-hidden">
                 <Image
                src="/images/banner.svg"
                alt="Product reviews illustration"
                width={1400}
                height={1400}
                className=" w-full h-full"
              />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-orange-400 rounded-lg p-4 shadow-lg">
                  <Star className="h-8 w-8 text-white" />
                </div>
           
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
