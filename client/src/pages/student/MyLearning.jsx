/*  import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => { 
  const {data, isLoading} = useLoadUserQuery();

  const myLearning = data?.user.enrolledCourses || [];
  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearning.map((course, index) => (
              <Course key={index} course={course}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);
  */

import React, { useEffect, useState } from "react";
import { useLoadUserQuery } from "@/features/api/authApi";

// import MyLearningSkeleton from "@/components/shared/loaders/MyLearningSkeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, Flame } from "lucide-react";
import Course from "./Course";
import LearningProgressCard from "./LearningProgressCard";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];
  const [userData, setUserData] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const lastDate = localStorage.getItem("lastLearningDate");
    const today = new Date().toDateString();

    if (lastDate === today) return;

    const streak = parseInt(localStorage.getItem("streak") || "0", 10);

    if (new Date(lastDate).getDate() === new Date(today).getDate() - 1) {
      localStorage.setItem("streak", (streak + 1).toString());
    } else {
      localStorage.setItem("streak", "1");
    }

    localStorage.setItem("lastLearningDate", today);
  }, []);

  const streak = localStorage.getItem("streak") || "1";

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // 1. Fetch user data
        const userRes = await fetch(
          "http://localhost:4000/api/v1/user/profile",
          {
            credentials: "include",
          }
        );
        const userJson = await userRes.json();
        setUserData(userJson.user);

        // 2. Fetch progress for all courses
        const progressRes = await fetch(
          "http://localhost:4000/api/v1/progress/user-progress",
          {
            credentials: "include",
          }
        );
        const progressJson = await progressRes.json();
        setProgressData(progressJson.progress);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 my-10 space-y-8">
      <div className="flex flex-col  justify-between items-start md:items-center gap-10 ">
        <h1 className="font-bold text-3xl dark:text-gray-200 text-gray-800 ">
          📚 My Learning Dashboard
        </h1>
        <div className="flex flex-wrap gap-4">
          <Card className="w-52">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-600">
                Total Courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-indigo-600">
                {myLearning.length}
              </p>
            </CardContent>
          </Card>

          <Card className="w-52">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-600 flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-500" /> Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-semibold">🔥 {streak} days</p>
            </CardContent>
          </Card>

          <Card className="w-52">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-600 flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-blue-500" /> Last Access
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base">2 days ago</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">Your Courses</h2>
        {loading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p className="text-gray-500">You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myLearning.map((course, index) => (
              <div key={index} className="space-y-2">
                <Course course={course}  />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
      ></div>
    ))}
  </div>
);

/* 
   <div className="space-y-3">
        <h2 className="text-xl font-semibold text-gray-700">Your Courses</h2>
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p className="text-gray-500">You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myLearning.map((course, index) => (
              <div key={index} className="space-y-2">
                <Course course={course} />
                <Progress value={course.progress || 0} />
                <p className="text-sm text-gray-500">
                  {course.progress || 0}% completed
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

*/
