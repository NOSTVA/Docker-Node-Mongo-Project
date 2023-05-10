import React, { useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Box,
  IconButton,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  FormLabel,
  Input,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

function PersonsField({
  persons,
  fetchPersons,
  fetchPerson,
  updatePerson,
  deletePerson,
  loading,
}) {
  const [idValue, setIdValue] = useState("");
  const [editedValues, setEditedValues] = useState({});

  function handleDeleteClick(_id) {
    deletePerson(_id);
    setIdValue("");
  }

  function handleEditClick(_id) {
    updatePerson(_id, editedValues[_id]);
    // Reset the edited values for the current row
    setEditedValues((prevState) => {
      const newState = { ...prevState };
      delete newState[_id];
      return newState;
    });
  }

  function handleCancelClick(_id) {
    // Reset the edited values for the current row
    setEditedValues((prevState) => {
      const newState = { ...prevState };
      delete newState[_id];
      return newState;
    });
  }

  function handleChange(_id, property, value) {
    setEditedValues((prevState) => ({
      ...prevState,
      [_id]: { ...prevState[_id], [property]: value },
    }));
  }

  function handleEdit(_id, property) {
    // Set the edited value for the current row and property
    setEditedValues((prevState) => ({
      ...prevState,
      [_id]: {
        ...prevState[_id],
        [property]: persons.find((p) => p._id === _id)[property].toString(),
      },
    }));
  }

  return (
    <Stack spacing={5}>
      <Box
        padding={5}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        align="center"
        justify="center"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchPerson(idValue);
          }}
        >
          <FormControl>
            <FormLabel>Person ID</FormLabel>
            <Input
              type="text"
              value={idValue}
              placeholder="Enter Person ID"
              onChange={(e) => setIdValue(e.target.value)}
            />
          </FormControl>
        </form>
      </Box>
      <Box
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        align="center"
        justify="center"
      >
        {!loading ? (
          <TableContainer>
            <Table size="md" textAlign="center">
              <Thead>
                <Tr>
                  <Th textAlign="center">ID</Th>
                  <Th textAlign="center">Name</Th>
                  <Th textAlign="center">Email</Th>
                  <Th textAlign="center">Gender</Th>
                  <Th textAlign="center">Age</Th>
                  <Th textAlign="center">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {persons.length > 0 ? (
                  persons.map(({ _id = null, name, age, gender, email }) => (
                    <Tr key={_id}>
                      <Td textAlign="center">{_id}</Td>
                      <Td textAlign="center">
                        <Editable
                          value={editedValues[_id]?.name ?? name}
                          onSubmit={() => handleEditClick(_id)}
                          onCancel={() => handleCancelClick(_id)}
                          submitOnBlur={false}
                          onEdit={() => handleEdit(_id, "name")}
                        >
                          <Tooltip label="Click to edit">
                            <EditablePreview />
                          </Tooltip>
                          <EditableInput
                            onChange={(e) =>
                              handleChange(_id, "name", e.target.value)
                            }
                          />
                        </Editable>
                      </Td>
                      <Td textAlign="center">
                        <Editable
                          value={editedValues[_id]?.email ?? email}
                          onSubmit={() => handleEditClick(_id)}
                          onCancel={() => handleCancelClick(_id)}
                          submitOnBlur={false}
                          onEdit={() => handleEdit(_id, "email")}
                        >
                          <Tooltip label="Click to edit">
                            <EditablePreview />
                          </Tooltip>
                          <EditableInput
                            onChange={(e) =>
                              handleChange(_id, "email", e.target.value)
                            }
                          />
                        </Editable>
                      </Td>
                      <Td textAlign="center">
                        <Editable
                          value={editedValues[_id]?.gender ?? gender}
                          onSubmit={() => handleEditClick(_id)}
                          onCancel={() => handleCancelClick(_id)}
                          submitOnBlur={false}
                          onEdit={() => handleEdit(_id, "gender")}
                        >
                          <Tooltip label="Click to edit">
                            <EditablePreview />
                          </Tooltip>
                          <EditableInput
                            onChange={(e) =>
                              handleChange(_id, "gender", e.target.value)
                            }
                          />
                        </Editable>
                      </Td>
                      <Td textAlign="center">
                        <Editable
                          value={editedValues[_id]?.age ?? age.toString()}
                          onSubmit={() => handleEditClick(_id)}
                          onCancel={() => handleCancelClick(_id)}
                          submitOnBlur={false}
                          onEdit={() => handleEdit(_id, "age")}
                        >
                          <Tooltip label="Click to edit">
                            <EditablePreview />
                          </Tooltip>
                          <EditableInput
                            onChange={(e) =>
                              handleChange(_id, "age", e.target.value)
                            }
                          />
                        </Editable>
                      </Td>
                      <Td textAlign="center">
                        <Stack direction="row" align="center" justify="center">
                          <IconButton
                            aria-label="Delete"
                            size="sm"
                            icon={<DeleteIcon />}
                            onClick={() => handleDeleteClick(_id)}
                          />
                        </Stack>
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Tr>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                    <Td textAlign="center">NULL</Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Spinner
            margin={10}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        )}
      </Box>
    </Stack>
  );
}

export default PersonsField;
