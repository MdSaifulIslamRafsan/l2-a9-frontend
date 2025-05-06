import React from 'react';

const HowItWorks = () => {
  return (
    <section className=" px-4 md:px-6 py-8 bg-primary/5 dark:bg-gray-900 rounded-lg">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create an Account</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Sign up for free and become part of our growing community.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Share Your Experience
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Write honest reviews about products {`you've`} used.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Help Others Decide</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your reviews help others make informed purchasing decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
