import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteOneTest,
  editOneTest,
  getAllTests,
} from "../store/app/app.action";

const AllTests = ({ isLoading, isError, allTests, student }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  const [testName, setTestName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [testDate, setTestDate] = useState("");
  const [id, setId] = useState("");

  const handleTestName = (e) => {
    setTestName(e.target.value);
  };
  const handleSubject = (e) => {
    setSubject(e.target.value);
  };
  const handleMarks = (e) => {
    setMarks(e.target.value);
  };
  const handleDate = (e) => {
    setTestDate(e.target.value);
  };
  const handleEditTest = (e) => {
    e.preventDefault();
    let testInfo = { testName, subject, marks, testDate, id };
    // console.log(testInfo);
    dispatch(editOneTest(testInfo))
      .then((res) => {
        if (res == "Updated Successfully") {
          toast({
            title: "Success",
            description: "Test Updated Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          onClose();
          dispatch(getAllTests({ id: student }));
          setTestName("");
          setSubject("");
          setMarks("");
          setTestDate("");
        } else {
          toast({
            title: "Error",
            description: res,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };
  const handleDeleteTest = () => {
    dispatch(deleteOneTest({ id }))
      .then((res) => {
        if (res == "Deleted Successfully") {
          toast({
            title: "Success",
            description: "Test Deleted Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          onClose();
          dispatch(getAllTests({ id: student }));
          setTestName("");
          setSubject("");
          setMarks("");
          setTestDate("");
        } else {
          toast({
            title: "Error",
            description: res,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => {
        toast({
          title: "Error Catch",
          description: err,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      });
  };
  return (
    <Flex justifyContent={"center"}>
      {isLoading && (
        <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921" />
      )}
      {isError && <Heading color={"red"}>Something Went Wrong</Heading>}
      {!isLoading && allTests.length === 0 && (
        <Heading color={"red"} fontSize={"20px"}>
          No Tests for This Student
        </Heading>
      )}
      {allTests.length > 0 && (
        <Table maxWidth={"1000px"}>
          <Thead backgroundColor={"ActiveCaption"}>
            <Tr>
              <Th color={"white"} textAlign={"center"}>
                Sr. No.
              </Th>
              <Th color={"white"} textAlign={"center"}>
                Test Name
              </Th>
              <Th color={"white"} textAlign={"center"}>
                Subject
              </Th>
              <Th color={"white"} textAlign={"center"}>
                Marks
              </Th>
              <Th color={"white"} textAlign={"center"}>
                Date
              </Th>
              <Th color={"white"} textAlign={"center"}>
                Edit
              </Th>
              <Th color={"white"} textAlign={"center"}>
                Delete
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {allTests.map((el, i) => {
              return (
                <Tr backgroundColor={i % 2 == 1 ? "#eeeef1" : "white"} key={i}>
                  <Td textAlign={"center"}>{i + 1}</Td>
                  <Td>{el.name}</Td>
                  <Td>{el.subject}</Td>
                  <Td textAlign={"center"}>{el.marks}</Td>
                  <Td textAlign={"center"}>{el.date}</Td>
                  <Td textAlign={"center"}>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      backgroundColor={"white"}
                      onClick={() => {
                        onOpen();
                        setTestName(el.name);
                        setSubject(el.subject);
                        setMarks(el.marks);
                        setTestDate(el.date);
                        setId(el._id);
                      }}
                    >
                      Edit
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <form onSubmit={handleEditTest}>
                        <ModalContent>
                          <ModalBody>
                            <FormControl isRequired>
                              <FormLabel>Test Name</FormLabel>
                              <Input
                                type="text"
                                value={testName}
                                onChange={handleTestName}
                              />
                            </FormControl>
                            <FormControl isRequired>
                              <FormLabel>Subject</FormLabel>
                              <Input
                                type="text"
                                value={subject}
                                onChange={handleSubject}
                              />
                            </FormControl>

                            <FormControl isRequired>
                              <FormLabel>Marks</FormLabel>
                              <Input
                                type="text"
                                value={marks}
                                onChange={handleMarks}
                              />
                            </FormControl>
                            <FormControl isRequired>
                              <FormLabel>Date</FormLabel>
                              <Input
                                type="date"
                                value={testDate}
                                onChange={handleDate}
                              />
                            </FormControl>
                          </ModalBody>

                          <ModalFooter>
                            <Button
                              colorScheme="teal"
                              variant="outline"
                              backgroundColor={"white"}
                              margin={"10px"}
                              type={"submit"}
                            >
                              Edit
                            </Button>
                            <Button
                              colorScheme="teal"
                              variant="outline"
                              backgroundColor={"white"}
                              onClick={onClose}
                              margin={"10px"}
                            >
                              Close
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </form>
                    </Modal>
                  </Td>
                  <Td textAlign={"center"}>
                    <Button
                      colorScheme="teal"
                      variant="outline"
                      backgroundColor={"white"}
                      onClick={() => {
                        setId(el._id);
                        handleDeleteTest();
                      }}
                    >
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Flex>
  );
};

export default AllTests;
