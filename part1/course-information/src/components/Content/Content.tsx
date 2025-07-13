import Part from "../Part/Part";

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map(({ name, exercises }) => (
        <Part name={name} numberOfExercises={exercises} />
      ))}
    </div>
  );
};

export default Content;
