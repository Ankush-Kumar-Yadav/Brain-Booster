
const HeroSection = () => {
  return (
    <>
      <div className="max-w-8xl mx-auto p-6 py-20 dark:bg-black bg-slate-300">
        <div className=" flex flex-col md:flex-row items-center justify-between px-6 md:px-48 py-12 ">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-900 leading-tight dark:text-gray-100">
              <span className="text-5xl text-[#1E90FF] "> Brain Boosters </span>
              <br /> The Future of{" "}
              <span className="text-[#1E90FF]">Learning</span>, Powered by AI!
            </h1>
            <p className="text-gray-700 mt-4 text-lg dark:text-gray-100">
              Transform the way you learn and teach with Brain Boosters, the
              ultimate AI-powered e-learning platform. Track progress, engage
              with interactive lessons, and experience AI-driven learning like
              never before.
            </p>
            <a href="#Course" className="mt-6 inline-block px-6 py-3 bg-[#1E90FF] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#2959e9d3] transition">
              Enroll Now
            </a>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
            <img
              src="/main.jpg"
              alt="E-learning"
              className="w-full max-w-sm md:max-w-md dark:rounded-xl "
            />
          </div>
        </div>

      
      </div>
    </>
  );
};
export default HeroSection;


/* 

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
const navigate = useNavigate();
  const searchHandler = (e) => {
    e.preventDefault();
    if(searchQuery.trim() !== ""){
      navigate(`/course/search?query=${searchQuery}`)
    }
    setSearchQuery("");
  }

  return (
    <div className="relative bg-gradient-to-r from-blue-500 to bg-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-4">
          Find the Best Courses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn, and Upskill with our wide range of courses
        </p>

        <form onSubmit={searchHandler} className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <Button type="submit" className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800">Search</Button>
        </form>
       <Button onClick={()=> navigate(`/course/search?query`)} className="bg-white dark:bg-gray-800 text-blue-600 rounded-full hover:bg-gray-200">Explore Courses</Button>
      </div>
    </div>
  );
};
*/