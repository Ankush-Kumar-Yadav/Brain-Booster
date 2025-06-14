import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/features/api/courseApi";
import { Edit } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const { data, isLoading } = useGetCreatorCourseQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();

  console.log("data ", data);
  if (!data || data.length === 0) {
    return <div>No courses available.</div>;
  }
  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <Button
        className="bg-[#1E90FF] text-white tracking-wide text-md hover:bg-[#1E90FF] "
        onClick={() => navigate(`create`)}
      >
        Create a new course
      </Button>
      <Table>
        <TableCaption className="text-lg">
          Manage or review your recent courses here.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">
                {course?.coursePrice || "NA"}
              </TableCell>
              <TableCell>
                {" "}
                <Badge className="bg-[#1E90FF] text-white">
                  {course.isPublished ? "Published" : "Draft"}
                </Badge>{" "}
              </TableCell>
              <TableCell>{course?.courseTitle || "NO title"}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => navigate(`${course._id}`)}
                >
                  <Edit />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseTable;
