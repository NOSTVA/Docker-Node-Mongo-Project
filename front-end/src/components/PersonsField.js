import React from "react";

function PersonsField({ id, setId, persons, setPersons, fetchPersons }) {
  async function fetchPerson() {
    try {
      const res = await fetch(`http://localhost:8080/persons/${id}`);
      const data = await res.json();
      setPersons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }

  async function deletePerson(del_id) {
    try {
      await fetch(`http://localhost:8080/persons/${del_id}`, {
        method: "DELETE",
      });
      fetchPersons();
      setId("");
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(event) {
    setId(event.target.value);
  }

  return (
    <div>
      <div style={{ paddingBottom: "1em" }}>
        <input
          type="text"
          placeholder="Enter your Id"
          value={id}
          onChange={handleChange}
        />
        <button onClick={fetchPerson}>Get Person</button>
      </div>
      <div style={{ border: "1px solid black", padding: "1em" }}>
        {persons.length > 0 ? (
          persons.map((person) => (
            <div key={person._id}>
              <div>id: {person._id}</div>
              <div>name: {person.name}</div>
              <div>age: {person.age}</div>
              <button onClick={() => deletePerson(person._id)}>Delete</button>
              <hr />
            </div>
          ))
        ) : (
          <div>No Person Found</div>
        )}
      </div>
    </div>
  );
}

export default PersonsField;
