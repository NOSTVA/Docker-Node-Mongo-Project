import React, { useState } from "react";

function CreatePerson({ fetchPersons }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    gender: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);

    await fetch("http://localhost:8080/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    fetchPersons();
  }

  return (
    <form
      style={{
        marginTop: "1em",
        maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={formData.gender}
        onChange={handleChange}
      />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreatePerson;
