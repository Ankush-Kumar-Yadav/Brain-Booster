import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPurchasedCoursesQuery } from "@/features/api/purchaseApi";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EnrollmentTrendsGraph from "./EnrollmentTrendsGraph";
import {
  BarChart3,
  GraduationCap,
  ReceiptIndianRupee,
  Users,
} from "lucide-react";

const Dashboard = () => {
  const { data, isSuccess, isError, isLoading } = useGetPurchasedCoursesQuery();

  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return <h1 className="text-red-500">Failed to get purchased course</h1>;

  //
  // const { purchasedCourse } = data || [];
  const purchasedCourse = data?.purchasedCourse || [];

  const courseData = purchasedCourse
    .map((course) => ({
      name: course.courseId?.courseTitle,
      price: course.courseId?.coursePrice,
    }))
    .filter((item) => item.name !== undefined && item.price !== undefined);

  const totalStudents =
    purchasedCourse?.reduce(
      (acc, course) => acc + (course?.courseId?.enrolledStudents?.length || 0),
      0
    ) || 0;

  const totalRevenue = purchasedCourse.reduce(
    (acc, element) => acc + (element.amount || 0),
    0
  );

  const totalSales = purchasedCourse.length;

  /* Top Selling course */

  const courseCountMap = {};

  purchasedCourse.forEach((purchase) => {
    const courseTitle = purchase.courseId?.courseTitle || "Unknown Course";
    if (courseCountMap[courseTitle]) {
      courseCountMap[courseTitle]++;
    } else {
      courseCountMap[courseTitle] = 1;
    }
  });

  let topSellingCourse = null;
  let maxSales = 0;

  for (const course in courseCountMap) {
    if (courseCountMap[course] > maxSales) {
      maxSales = courseCountMap[course];
      topSellingCourse = course;
    }
  }
  console.log("this is data", courseData);

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="text-blue-600">Total Sales</CardTitle>
          <ReceiptIndianRupee className="h-7 w-7 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold ">{totalSales} Courses</p>
        </CardContent>
      </Card>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="text-blue-600">Total Revenue</CardTitle>
          <BarChart3 className="h-7 w-7 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold ">{totalRevenue} &#8377;</p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="text-blue-600">Total Students</CardTitle>
          <Users className="h-7 w-7 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold ">{totalStudents} Students</p>
        </CardContent>
      </Card>
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex justify-between flex-row items-center">
          <CardTitle className="text-blue-600">Top Selling Course </CardTitle>
          <GraduationCap className="h-7 w-7 text-blue-500" />
        </CardHeader>
        <CardContent>
          <p className="text-xl font-bold ">
            {topSellingCourse || "No course yet"}
          </p>
          <p className="text-xl font-bold ">Max Sale:{maxSales}</p>
        </CardContent>
      </Card>

      {/* Course Prices Card */}
      <Card className="shadow-lg  hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Course Prices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis
                dataKey="name"
                stroke="#6b7280"
                textAnchor=""
                interval={0}
                tick={<CustomTick />}
                padding={{ left: 0, right: 100 }}
              />
              <YAxis stroke="#6b7280" />
              <Tooltip
                formatter={(value, name) => {
                  return [`₹${value}`, name];
                }}
                contentStyle={{
                  backgroundColor: "#1E293B",
                  borderRadius: "8px",
                  border: "none",
                  color: "#fff",
                  padding: "10px",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#4a90e2"
                strokeWidth={3}
                dot={{ stroke: "#4a90e2", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <EnrollmentTrendsGraph />
    </div>
  );
};

export default Dashboard;

export const CustomTick = ({ x, y, payload }) => {
  const words = payload.value.split(" ");
  const firstLine = words.slice(0, 2).join(" "); // First two words
  const secondLine = words.slice(2).join(" "); // Remaining words

  return (
    <g transform={`translate(${x},${y + 10})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fill="#6b7280"
        fontSize={12}
      >
        <tspan x="0" dy="0">
          {firstLine}
        </tspan>
        {secondLine && (
          <tspan x="0" dy="14">
            {secondLine}
          </tspan>
        )}
      </text>
    </g>
  );
};
