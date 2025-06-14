import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createCourse,
  createLecture,
  deleteCourse,
  editCourse,
  editLecture,
  getCourseById,
  getCourseLecture,
  getCreatorCourses,
  getEnrollmentTrendsForAllCourses,
  getLectureById,
  getPublishedCourse,
  removeLecture,
  searchCourse,
  togglePublishCourse,
} from "../controllers/course.controller.js";
import upload from "../utils/multer.js";
const router = express.Router();

router.route("/").post(isAuthenticated, createCourse);
router.route("/search").get(isAuthenticated, searchCourse);
router.route("/published-courses").get(getPublishedCourse);
router.route("/").get(isAuthenticated, getCreatorCourses);
router
  .route("/:courseId")
  .put(isAuthenticated, upload.single("courseThumbnail"), editCourse);

router.route("/:courseId").get(isAuthenticated, getCourseById);
router.route("/:courseId/lecture").post(isAuthenticated, createLecture);
router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
router
  .route("/:courseId/lecture/:lectureId")
  .post(isAuthenticated, editLecture);
router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);

router.route("/courses/:courseId").delete(isAuthenticated, deleteCourse);

router.get("/api/enrollment-trend", isAuthenticated, async (req, res) => {
  try {
    const trends = await getEnrollmentTrendsForAllCourses();
    if (trends.length === 0) {
      return res
        .status(404)
        .json({ message: "No enrollment trends available" });
    }
    res.json(trends);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch enrollment trends" });
  }
});

export default router;
