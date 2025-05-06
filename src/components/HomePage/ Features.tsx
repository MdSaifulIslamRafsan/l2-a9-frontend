import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CreditCard, Shield, Star } from 'lucide-react';

const  Features = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5 dark:bg-gray-900 mb-10">
        <div className="container mx-auto ">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ReviewHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Trusted Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p>All reviews are verified and moderated to ensure authenticity and quality.</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Detailed Ratings</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Comprehensive rating system helps you make informed purchasing decisions.</p>
              </CardContent>
            </Card>
            <Card className="bg-white dark:bg-gray-800">
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Premium Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Access in-depth premium reviews with detailed analysis and insights.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
};

export default  Features;