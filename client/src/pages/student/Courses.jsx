import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError) return <h1>Some error occurred while fetching courses.</h1>;

  return (
    <div id="Course" className="bg-gray-200 py-10 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-gray-300 text-center mb-4">
          Our <span className="text-[#1E90FF]">Courses</span>
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto  text-center dark:text-gray-400 mb-5">
          Gain practical skills with our well-structured courses designed to
          help you excel in your career. 🚀 Start learning today and stay ahead!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <CourseSkeleton key={index} />
              ))
            : data?.courses &&
              data.courses.map((course, index) => (
                <Course key={index} course={course} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
