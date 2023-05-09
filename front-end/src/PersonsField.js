import React, { useState, useEffect } from "react";

function PersonsField() {
  const [id, setId] = useState("");
  const [persons, changePersons] = useState([]);

  useEffect(() => {
    async function getPerons() {
      const res = await fetch("http://localhost:8080/persons");
      const personsData = await res.json();
      changePersons(personsData);
    }
    getPerons();
  }, []);

  function handleChange(event) {
    const value = event.target.value;
    setId(value);
  }

  async function fetchPerson() {
    const res = await fetch("http://localhost:8080/persons/" + id);
    const personsData = await res.json();

    if (Array.isArray(personsData)) {
      changePersons(personsData);
    } else if (typeof personsData === "object" && personsData !== null) {
      changePersons([personsData]);
    } else {
      console.error("Invalid persons data:", personsData);
    }
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter you Id"
          value={id}
          onChange={handleChange}
        />
        <button onClick={fetchPerson}>Get Person</button>
      </div>
      <div style={{ border: "1px solid black", padding: "1em" }}>
        {persons.map((person, index) => {
          return (
            <div key={index}>
              <div>{person._id}</div>
              <div>{person.name}</div>
              <div>{person.age}</div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PersonsField;
