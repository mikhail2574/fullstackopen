import React, { useState } from "react";
import personService from "../../services/personService";

const PersonForm = ({
  persons,
  setPersons,
  setErrorMessage,
  setNotifyMessage,
}) => {
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        // Check if the person exists
        if (
          persons.some(
            (person) =>
              person.name === newName && person.number === newPhoneNumber
          )
        ) {
          alert(`${newName} is already added to phonebook`);
          return;
        } else if (
          persons.some(
            (person) =>
              person.name === newName && person.number !== newPhoneNumber
          )
        ) {
          if (
            window.confirm(
              `${newName} is already added to phonebook, replace the old number with the new one?`
            )
          ) {
            const personToUpdate = persons.find(
              (person) => person.name === newName
            );
            personService
              .update(personToUpdate._id, {
                name: newName,
                number: newPhoneNumber,
              })
              .then((response) => {
                setPersons(
                  persons.map((person) =>
                    person._id !== personToUpdate._id ? person : response.data
                  )
                );

                setNotifyMessage(
                  `Person '${newName}' has new number ${newPhoneNumber} in phonebook`
                );
                setTimeout(() => {
                  setNotifyMessage(null);
                }, 5000);
              })
              .catch((error) => {
                setErrorMessage(
                  `Person '${newName}' was already removed from phonebook. ${error.message}`
                );
                setTimeout(() => {
                  setErrorMessage(null);
                }, 5000);
              });
          }
          return;
        }
        personService
          .create({ name: newName, number: newPhoneNumber })
          .then((response) => {
            // Ensure the new person object includes the id from the response
            const newPerson = {
              name: newName,
              number: newPhoneNumber,
              _id: response.data._id,
            };
            setPersons(persons.concat(newPerson));

            setNotifyMessage(`Person '${newName}' was added to phonebook`);
            setTimeout(() => {
              setNotifyMessage(null);
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Person '${newName}' could not be added to phonebook: ${error.response.data.error}`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });

        setNewName("");
        setNewPhoneNumber("");
      }}
    >
      <div>
        name:{" "}
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        number:{" "}
        <input
          value={newPhoneNumber}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
