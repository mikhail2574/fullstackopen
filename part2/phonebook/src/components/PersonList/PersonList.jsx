import Person from "../Person/Person.jsx";

const PersonList = ({ persons, filter, setPersons, setErrorMessage }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((person) => (
          <Person
            key={person.name}
            person={person}
            persons={persons}
            setPersons={setPersons}
            setErrorMessage={setErrorMessage}
          />
        ))}
    </>
  );
};

export default PersonList;
