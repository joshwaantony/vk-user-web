


"use client";

import { useEffect } from "react";
import useCourseStore from "@/store/CourseStore";
import AllCourseCard from "./AllCourseCard";
import PromoLoader from "../loader/PromoLoader";

export default function AllCourses() {
  const { courses, fetchAllCourses, loading, error } = useCourseStore();

  useEffect(() => {
    fetchAllCourses();
  }, []);

  if (loading) {
    return (
      <p className="">
        <PromoLoader/>
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center mt-10 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {courses.map((course) => (
        <AllCourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
