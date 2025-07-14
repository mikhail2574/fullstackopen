import personService from "../../services/personService";

const Person = ({ person, persons, setPersons, setErrorMessage }) => {
  return (
    <div key={person.name}>
      {person.name} {person.number}{" "}
      <button
        onClick={() => {
          if (window.confirm(`Delete ${person.name}?`)) {
            try {
              personService.delete(person.id);
            } catch (e) {
              setErrorMessage(
                `Person '${person.name}' was already removed from phonebook. ${e.message}`
              );
              setTimeout(() => {
                setErrorMessage(null);
              }, 5000);
            }
            setPersons(persons.filter((p) => p.id !== person.id));
          }
        }}
      >
        delete
      </button>
    </div>
  );
};

export default Person;
