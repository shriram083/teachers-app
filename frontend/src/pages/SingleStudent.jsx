import {
  Box,
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
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AllTests from "../component/AllTests";
import { addNewTest, getAllTests } from "../store/app/app.action";

const SingleStudent = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const dispatch = useDispatch();
  const { isLoading, allTests, isError } = useSelector(
    (state) => state.data.tests
  );
  const [testName, setTestName] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");
  const [testDate, setTestDate] = useState("");

  useEffect(() => {
    let url = `https://mock-12-backend.herokuapp.com/students/${id}`;
    let myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByZW1AZ21haWwuY29tIiwiYWdlIjoyMCwiaWQiOiI2MzM3MzcwMTExNjAzMmU0Zjg4YWY5NWIiLCJpYXQiOjE2NjQ2MTU4OTV9._ZvlqwznWy3MAPGoOA0I1CMDqURboVf0KN97Qruhins"
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });

    dispatch(getAllTests({ id }));
  }, []);

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
  const handleAddTest = (e) => {
    e.preventDefault();
    let testInfo = { testName, subject, marks, testDate, id };
    dispatch(addNewTest(testInfo))
      .then((res) => {
        let first = res.split(" ");
        if (first[0] == "New") {
          toast({
            title: "Success",
            description: "Test Added Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          onClose();
          dispatch(getAllTests({ id }));
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
  return (
    <Box>
      {!data.name ? (
        <Image
          src={
            "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
          }
          margin={"50px auto"}
        />
      ) : (
        <Flex
          boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px;"}
          margin={"20px auto"}
          gap={"20px"}
          width={"800px"}
          backgroundColor={"white"}
          height={"120px"}
          padding={"10px"}
          justifyContent={"space-around"}
          alignItems={"center"}
        >
          <Image src={data.profile_pic} width={"120px"} />
          <Box
            padding={"10px 20px"}
            textAlign={"left"}
            display={"flex"}
            flexDirection={"column"}
            gap={"10px"}
            boxShadow={
              "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;"
            }
            margin={"10px"}
            width={"300px"}
            borderRadius={"10px"}
          >
            <Heading color={"red"} fontSize={"20px"}>
              {`Name : ${data.name}`}
            </Heading>
            <Text>{`Age : ${data.age}`}</Text>
            <Text>{`Gender : ${data.gender}`}</Text>
          </Box>
          <Button
            onClick={onOpen}
            colorScheme="teal"
            variant="outline"
            backgroundColor={"white"}
          >
            {`Add ${data.name}'s Test`}
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <form onSubmit={handleAddTest}>
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
                    <Input type="text" value={marks} onChange={handleMarks} />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Date</FormLabel>
                    <Input type="date" value={testDate} onChange={handleDate} />
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
                    Add Test
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
        </Flex>
      )}
      <AllTests
        isLoading={isLoading}
        isError={isError}
        allTests={allTests}
        student={id}
      />
    </Box>
  );
};

export default SingleStudent;
