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
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StudentCard from "../component/StudentCard";

import { addStudent, getAllStudents } from "../store/app/app.action";

const StudentList = () => {
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const toast = useToast();

  useEffect(() => {
    dispatch(
      getAllStudents({
        sortBy,
        filterBy,
        page,
      })
    );
  }, [sortBy, filterBy, page]);
  // console.log("students", data);

  const handleAddStudent = (e) => {
    e.preventDefault();
    let profile_pic = profilePic;
    if (profilePic == "") {
      if (gender === "male") {
        profile_pic =
          "https://cdn.pixabay.com/photo/2014/04/02/14/11/male-306408__340.png";
      } else {
        profile_pic =
          "https://cdn.pixabay.com/photo/2014/04/02/17/07/user-307993__340.png";
      }
    }
    let data = {
      name,
      age,
      profile_pic,
      gender,
    };
    // console.log(data);
    dispatch(addStudent(data))
      .then((res) => {
        let first = res.split(" ");
        if (first[0] == "New") {
          toast({
            title: "Success",
            description: "Student Added Successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          onClose();
          dispatch(
            getAllStudents({
              sortBy,
              filterBy,
              page,
            })
          );
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
    setName("");
    setAge("");
    setProfilePic("");
    setGender("");
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };
  const handleFilter = (e) => {
    setFilterBy(e.target.value);
    setPage(1);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  const handleProfilePic = (e) => {
    setProfilePic(e.target.value);
  };

  return (
    <Box justifyContent={"center"}>
      <Box
        padding={"10px"}
        display={"flex"}
        justifyContent={"center"}
        gap={"50px"}
        flexWrap={"wrap"}
      >
        <Select
          value={sortBy}
          label="price"
          onChange={handleSort}
          width={"400px"}
          backgroundColor={"white"}
        >
          <option value={""}>Sort By Age</option>
          <option value={"asc"}>Low to High</option>
          <option value={"desc"}>High to Low</option>
        </Select>

        <Select
          value={filterBy}
          label="categoty"
          onChange={handleFilter}
          width={"400px"}
          backgroundColor={"white"}
        >
          <option value={""}>Filter By Gender</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
        </Select>
        <Button
          onClick={onOpen}
          colorScheme="teal"
          variant="outline"
          backgroundColor={"white"}
        >
          Add New Student
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <form onSubmit={handleAddStudent}>
            <ModalContent>
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel>Student's Full Name</FormLabel>
                  <Input type="text" value={name} onChange={handleName} />
                </FormControl>
                <FormControl>
                  <FormLabel>Profile Pic Link</FormLabel>
                  <Input
                    type="text"
                    value={profilePic}
                    onChange={handleProfilePic}
                  />
                </FormControl>
                <Flex gap={"10px"} margin={"10px 0px"}>
                  <FormControl isRequired>
                    <FormLabel>Gender</FormLabel>

                    <Select
                      value={gender}
                      label="categoty"
                      onChange={handleGender}
                      width={"200px"}
                      backgroundColor={"white"}
                    >
                      <option value={""}>Select Gender</option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Female</option>
                    </Select>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Age</FormLabel>
                    <Input
                      type="text"
                      value={age}
                      onChange={handleAge}
                      isRequired
                    />
                  </FormControl>
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  backgroundColor={"white"}
                  margin={"10px"}
                  type={"submit"}
                >
                  Add Student
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
      </Box>

      {isLoading ? (
        <Image
          margin={"auto"}
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
        />
      ) : (
        <Box>
          {data.map((el, i) => {
            return <StudentCard key={i} data={el} />;
          })}
        </Box>
      )}
    </Box>
  );
};

export default StudentList;
