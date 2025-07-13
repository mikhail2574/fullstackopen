import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import Total from "./components/Total/Total";

const App = () => {
  const course = "Half Stack application development";
  const courses = [
    { name: "Fundamentals of React", exercises: 10 },
    { name: "Using props to pass data", exercises: 7 },
    { name: "State of a component", exercises: 14 },
  ];
  const sumOfExercises = courses.reduce(
    (acc, course) => acc + course.exercises,
    0
  );

  return (
    <div>
      <Header course={course} />
      <Content courses={courses} />
      <Total total={sumOfExercises} />
    </div>
  );
};

export default App;
