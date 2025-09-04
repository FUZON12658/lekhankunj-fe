// app/books/page.js
import React, { Suspense } from "react";
import { Books } from "@/components/books/books";

const BooksSkeleton = () => {
  return (
    <div className="bg-[#EBF8F7]">
      <section className="w-full container mx-auto py-10 px-4">
        {/* Page Title Skeleton */}
        <div className="heading container mb-6">
          <div className="h-8 w-40 bg-gray-300 rounded animate-pulse" />
        </div>

        <section className="filter container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Sidebar Filters Skeleton */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-lg">
            <div className="h-6 w-24 bg-gray-300 rounded mb-4 animate-pulse" />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          </div>

          {/* Books Grid Skeleton */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4" />
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-1/2 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

const Page = () => {
  return (
    <div>
      <Suspense fallback={<BooksSkeleton />}>
        <Books />
      </Suspense>
    </div>
  );
};

export default Page;
