import Course from "../Course/Course";

const Courses = ({ coursesList }) => {
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {coursesList.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export default Courses;
