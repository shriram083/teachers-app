import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  useColorModeValue,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

const Signup = () => {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const handleSignup = () => {
    let data = {
      email,
      password,
      age,
      first_name: firstName,
      last_name: lastName,
      user_name: userName,
    };

    axios
      .post("https://mock-12-backend.herokuapp.com/user/signup", data)
      .then((res) => {
        let first = res.data.split(" ");
        if (first[0] == "Account") {
          toast({
            title: "Success",
            description: res.data,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          navigate("/login");
        } else {
          toast({
            title: "Something Went Wrong",
            description: res.data,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      })
      .catch((err) => console.log(err));

    setMail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setAge("");
    setUserName("");
  };
  const handleEmail = (e) => {
    setMail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handleAge = (e) => {
    setAge(e.target.value);
  };

  return (
    <Flex
      minH={"90vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Flex gap={"10px"}>
              <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  value={firstName}
                  onChange={handleFirstName}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input type="text" value={lastName} onChange={handleLastName} />
              </FormControl>
            </Flex>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={handleEmail} />
            </FormControl>
            <Flex gap={"10px"}>
              <FormControl>
                <FormLabel>User Name</FormLabel>
                <Input type="text" value={userName} onChange={handleUserName} />
              </FormControl>
              <FormControl>
                <FormLabel>Age</FormLabel>
                <Input type="number" value={age} onChange={handleAge} />
              </FormControl>
            </Flex>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={handlePassword}
              />
            </FormControl>
            <Text
              cursor={"pointer"}
              onClick={() => navigate("/login")}
              color={"blue"}
            >
              Login To Existing Account
            </Text>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
