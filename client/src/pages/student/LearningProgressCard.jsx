import { Progress } from "@/components/ui/progress";

const LearningProgressCard = ({ course, progressData }) => {
/*   const courseProgress = progressData?.find((p) => p.courseId === courseId);

  const watched =
    courseProgress?.lectureProgress?.filter((l) => l.viewed).length || 0;
  const percent = totalLectures > 0 ? (watched / totalLectures) * 100 : 0;
 */
  
    const courseProgress = progressData?.find((p) => p.courseId === course._id);

  const totalLectures = course?.lectures?.length || 0;

  const watched = courseProgress?.lectureProgress?.filter((lp) =>
    course?.lectures?.some((lecture) => lecture._id === lp.lectureId && lp.viewed)
  )?.length || 0;

  const percent = totalLectures > 0 ? Math.floor((watched / totalLectures) * 100) : 10;



  return (
    <div className="space-y-1">
      <Progress value={percent} />
      <p className="text-sm text-gray-500">
        {percent.toFixed(0)}%{" "}
        {courseProgress?.completed ? "✅ Completed" : "⏳ In Progress"}
      </p>
    </div>
  );
};

export default LearningProgressCard;
