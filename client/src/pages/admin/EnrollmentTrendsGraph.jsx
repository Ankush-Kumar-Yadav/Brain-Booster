import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EnrollmentTrendsGraph = () => {
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchEnrollmentTrends = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/course/api/enrollment-trend",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const formattedData = data.reduce((acc, { _id, enrollments }) => {
          const { courseName, week, year } = _id;

          if (!acc[courseName]) {
            acc[courseName] = [];
          }

          const weekLabel = `${year}-W${week}`;
          acc[courseName].push({ week: weekLabel, enrollments });

          return acc;
        }, {});

        // Format the data into an array of series for each course
        const chartData = Object.keys(formattedData).map((courseName) => ({
          courseName,
          data: formattedData[courseName],
        }));

        setEnrollmentData(chartData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching enrollment trends data", error);
      }
    };

    fetchEnrollmentTrends();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700">
          Enrollment Trends for All Courses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={enrollmentData[0]?.data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip
              formatter={(value, name, props) => {
                const courseName = props?.payload?.courseName || "";
                return [`${courseName} ${value}`, name];
              }}
              contentStyle={{
                backgroundColor: "#1E293B",
                borderRadius: "8px",
                border: "none",
                color: "#fff",
                padding: "10px",
              }}
            />

            {enrollmentData.map((course, index) => {
              return (
                <Line
                  key={index}
                  type="monotone"
                  dataKey="enrollments"
                  data={course.data}
                  stroke={`hsl(${
                    (index * 360) / enrollmentData.length
                  }, 70%, 50%)`}
                  name={course.courseName}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EnrollmentTrendsGraph;

/* 

 <Card className="shadow-lg  hover:shadow-xl transition-shadow duration-300 col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700">
          Enrollment Trends for All Courses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={enrollmentData[0]?.data || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip
           
            />
            {enrollmentData.map((course, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey="enrollments"
                data={course.data}
                stroke={`hsl(${
                  (index * 360) / enrollmentData.length
                }, 70%, 50%)`}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>

*/
