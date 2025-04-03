import express from "express";
import { getCourses, listCourses } from "../controllers/courseController";

const router = express.Router();

router.get("/", listCourses);
router.get("/:courseId", getCourses);

export default router;
