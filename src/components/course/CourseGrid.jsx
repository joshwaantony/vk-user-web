


// import courses from "@/data/courses";
// import CourseCard from "./CourseCard";

// export default function CourseGrid() {
//   return (
//     <div
//       className="
//         mt-12
//         px-4 sm:px-6 lg:px-0
//         grid
//         grid-cols-1
//         sm:grid-cols-2
//         lg:grid-cols-3
//         gap-6
//         lg:gap-8
//       "
//     >
//       {courses.map((course) => (
//         <CourseCard
//           key={course.id}
//           image={course.image}
//           title={course.title}
//           rating={course.rating}
//           students={course.students}
//           instructor={course.instructor}
//           duration={course.duration}
//           price={course.price}
//         />
//       ))}
//     </div>
//   );
// }


import courses from "@/data/courses";
import CourseCard from "./CourseCard";

export default function CourseGrid() {
  return (
    <div
      className="
        mt-12
        px-4          /* mobile */
        sm:px-10       /* tablet */
        lg:px-24      /* desktop */
        xl:px-32      /* large desktop */
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
