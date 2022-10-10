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
import { userLogin } from "../store/auth/auth.action";

const Login = () => {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();

  const handleLogin = () => {
    // console.log(email, password);

    dispatch(userLogin({ email, password })).then((res) => {
      console.log("res in login", res);
      if (res?.payload?.messege) {
        toast({
          title: "Success",
          description: res.payload.messege,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        navigate(location?.state?.from?.pathname || "/", { replace: true });
      } else {
        toast({
          title: "Something Went Wrong",
          description: "Invalid Credentials",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    });

    setMail("");
    setPassword("");
  };
  const handleEmail = (e) => {
    setMail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
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
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" value={email} onChange={handleEmail} />
            </FormControl>
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
              onClick={() => navigate("/signup")}
              color={"blue"}
            >
              Create New Account
            </Text>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
