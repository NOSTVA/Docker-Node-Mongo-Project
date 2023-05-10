import React, { useState, useEffect } from "react";
import PersonsField from "./PersonsField";
import CreatePerson from "./CreatePerson";

function App() {
  const [id, setId] = useState("");
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    fetchPersons();
  }, []);

  async function fetchPersons() {
    try {
      const res = await fetch("http://localhost:8080/persons");
      const data = await res.json();
      setPersons(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <PersonsField
        id={id}
        setId={setId}
        persons={persons}
        setPersons={setPersons}
        fetchPersons={fetchPersons}
      />
      <CreatePerson fetchPersons={fetchPersons} />
    </div>
  );
}

export default App;
