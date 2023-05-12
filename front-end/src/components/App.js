import React, { useState, useEffect } from "react";
import PersonsField from "./PersonsField";
import CreatePerson from "./CreatePerson";

import { Container } from "@chakra-ui/react";

function App() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersons();
  }, []);

  async function fetchPersons() {
    setLoading(true);
    try {
      const res = await fetch("/persons");
      const data = await res.json();
      setPersons(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function fetchPerson(id) {
    setLoading(true);
    try {
      if (!id.trim()) {
        fetchPersons();
      } else {
        const res = await fetch(`/persons/${id}`);
        const data = await res.json();
        data ? setPersons([data]) : setPersons([]);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function updatePerson(id, data) {
    setLoading(true);
    try {
      await fetch(`/persons/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await fetchPersons();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function deletePerson(id) {
    setLoading(true);
    try {
      await fetch(`/persons/${id}`, {
        method: "DELETE",
      });
      await fetchPersons();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function createPerson(formData) {
    setLoading(true);
    try {
      await fetch("/persons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      await fetchPersons();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <Container maxW="5xl" pt={10}>
      <PersonsField
        persons={persons}
        fetchPersons={fetchPersons}
        fetchPerson={fetchPerson}
        updatePerson={updatePerson}
        deletePerson={deletePerson}
        loading={loading}
      />
      <CreatePerson createPerson={createPerson} />
    </Container>
  );
}

export default App;
