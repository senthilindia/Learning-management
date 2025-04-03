import { Request, Response } from "express";
import Course from "../models/courseModel";
export const listCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { category } = req.query;

  try {
    const courses =
      category && category !== "all"
        ? await Course.scan("category").eq(category).exec()
        : await Course.scan().exec();

    res.json({ message: "Courses Retrieved Successfully", data: courses });
  } catch (error) {
    res.status(500).json({ message: "Error Retrieving Coures", error });
  }
};

export const getCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId } = req.params;

  try {
    const course = await Course.get(courseId);
    if (!course) {
      res.status(404).json({ message: "Course not found" });
      return;
    }

    res.json({ message: "Course Retrieved Successfully", data: course });
  } catch (error) {
    res.status(500).json({ message: "Error Retrieving Coure", error });
  }
};
