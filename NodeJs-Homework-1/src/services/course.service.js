import { Course } from "../models/course.model.js";
import { Student } from "../models/student.model.js";
import { Trainer } from "../models/trainer.model.js";

export class CourseService {
  //1. Get all courses
  static async getAllCourses() {
    const courses = await Course.find({});

    return courses;
  }
  //2. Get course by id
  static async getCourseById(courseId) {
    // Populate takes a property and if it finds a reference to another collection it fetches the data and populates the documents
    const foundCourse = await Course.findById(courseId)
      .populate({
        path: "students",
        model: Student,
      })
      .populate({
        path: "trainer",
        model: Trainer,
        // Staviv select za da go probam kako opcija za da se trgni toa __v. Izleze uspesno.
        select: "firstName lastName age __id",
      });

    if (!foundCourse) throw new Error("Course Not Found");

    return foundCourse;
  }
  //3. Create Course
  static async createCourse(courseData) {
    const newCourse = new Course(courseData);

    const createdCourse = await newCourse.save();

    return createdCourse;
  }

  static async deleteCourse(courseId) {
    const response = await Course.findByIdAndDelete(courseId);

    if (!response) throw new Error("Course not found");
  }
}
