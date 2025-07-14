import { useState, useEffect } from "react";
import Filter from "./components/Filter/Filter";
import PersonForm from "./components/PersonForm/PersonForm";
import PersonList from "./components/PersonList/PersonList";
import Notification from "./components/Notification/Notification";
import Error from "./components/Error/Error";
import personService from "./services/personService";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [notifyMessage, setNotifyMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);

  const [filter, setFilter] = useState("");

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} setFilter={setFilter} />
      <Notification message={notifyMessage} />
      <Error message={errorMessage} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
        setNotifyMessage={setNotifyMessage}
      />
      <PersonList
        persons={persons}
        filter={filter}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
