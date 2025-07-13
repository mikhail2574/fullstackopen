import Header from "../Header/Header";
import Content from "../Content/Content";
import Total from "../Total/Total";

const Course = ({ course }) => {
  return (
    <div key={course.id}>
      <Header course={course.name} />
      <Content courses={course.parts} />
      <Total
        total={course.parts.reduce((acc, part) => acc + part.exercises, 0)}
      />
    </div>
  );
};

export default Course;
