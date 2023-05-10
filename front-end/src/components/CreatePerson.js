import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Select,
  Button,
  Box,
} from "@chakra-ui/react";

function CreatePerson({ createPerson }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 25,
    gender: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    createPerson(formData);
  }

  return (
    <Box
      padding={5}
      marginTop={5}
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      align="center"
      justify="center"
    >
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Age</FormLabel>
            <NumberInput
              min={1}
              max={120}
              allowMouseWheel
              name="age"
              value={formData.age}
              onChange={(value) =>
                handleChange({ target: { name: "age", value } })
              }
              required
            >
              <NumberInputField name="age" required />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Select>
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Create Person
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default CreatePerson;
