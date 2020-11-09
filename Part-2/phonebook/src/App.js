import React, { useState, useEffect } from "react";
import "./index.css";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import services from "./services/serPersons";
import Notification from "./components/Notifications";

const App = () => {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [search, setSearch] = useState("");
  //
  const [status, setstatus] = useState(null);
  const [notice, setNotice] = useState(null);
  //
  useEffect(() => {
    services.getAll().then((allPersons) => setPerson(allPersons));
  }, []);

  const errorHandler = (error) => {
    console.log("handler:", error);
    setstatus("failure");
    setNotice(
      error.response.data.error ? error.response.data.error : "Invalid Request"
    );
    setTimeout(() => {
      setstatus(null);
      setNotice(null);
    }, 3000);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    // array of names only
    const nameArray = person.map((x) => x.name);

    if (!nameArray.includes(newPerson.name)) {
      services
        .create(newPerson)
        .then((returnedPerson) => {
          setPerson([...person, returnedPerson]);
          setstatus("success");
          setNotice(`${returnedPerson.name} was added successfully`);

          setTimeout(() => {
            setstatus(null);
            setNotice(null);
          }, 3000);
        })
        .catch((error, req, res) => {
          console.log(error.name, error.message);
          // console.error(error);
          errorHandler(error);
        });
    } else if (
      window.confirm(
        `${newPerson.name} is already added to the Phonebook, replace the old number with the new One`
      )
    ) {
      // put request
      const updateID = person.filter((perp) => perp.name === newPerson.name)[0]
        .id;
      // console.log(updateID);
      services
        .updatePersons(updateID, newPerson)
        .then((returnedPerson) => {
          setPerson(
            person.map((perp) =>
              perp.id === returnedPerson.id ? returnedPerson : perp
            )
          );

          setstatus("success");
          setNotice(`${returnedPerson.name} was updated successfully`);

          setTimeout(() => {
            setstatus(null);
            setNotice(null);
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
          console.log(updateID);
          // setstatus("failure");
          // setNotice(
          //   `Information on ${newPerson.name} cannot be updated, Ivalid credentials`
          // );

          // setTimeout(() => {
          //   setstatus(null);
          //   setNotice(null);
          // }, 3000);

          errorHandler(error);

          // setPerson(person.filter((perp) => perp.id !== updateID));
        });
    }
    setNewName("");
    setNumber("");
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`confirm delete: ${name}`)) {
      services
        .deletePerson(id)
        .then((response) => {
          console.log(response);
          setPerson(person.filter((perp) => perp.id !== id));
        })
        .catch((error) => errorHandler(error));
    }
  };

  return (
    <div>
      <h1>PhoneBook</h1>
      <Notification message={notice} status={status} />
      <Filter valueOf={search} onChangeOf={setSearch} />
      <h2> Add a New Person</h2>
      <PersonForm
        onSubmitOf={handleOnSubmit}
        valueOfNewName={newName}
        onChangeOfNewName={setNewName}
        valueOfNewNumber={newNumber}
        onChangeOfNewNumber={setNumber}
      />

      <h2> Numbers:</h2>
      <Persons
        personOf={person}
        searchOf={search}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
