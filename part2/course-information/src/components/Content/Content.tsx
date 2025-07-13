import Part from "../Part/Part";

const Content = ({ courses }) => {
  return (
    <div>
      {courses.map(({ id, name, exercises }) => (
        <Part key={id} name={name} numberOfExercises={exercises} />
      ))}
    </div>
  );
};

export default Content;
