import courses from "@/data/courses";
import CourseCard from "./CourseCard";

export default function CourseGrid() {
  return (
    <div
      className="
        mt-12
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
        lg:gap-8
      "
    >
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          image={course.image}
          title={course.title}
          rating={course.rating}
          students={course.students}
          instructor={course.instructor}
          duration={course.duration}
          price={course.price}
        />
      ))}
    </div>
  );
}
