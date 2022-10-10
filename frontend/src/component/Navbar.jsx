import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../store/auth/auth.action";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuth, token, user } = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <Flex
      padding={"10px 20px"}
      justifyContent={"space-between"}
      alignItems={"center"}
      backgroundColor={"#f3e2b4"}
      boxShadow={
        "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
      }
    >
      <Image
        cursor={"pointer"}
        src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f468-200d-1f3eb.svg"
        height={"50px"}
        onClick={() => navigate("/")}
        paddingLeft={"50px"}
      ></Image>
      <Box display={"flex"} justifyContent={"space-evenly"} gap={"20px"}>
        {isAuth && (
          <Box
            margin={"10px"}
            cursor={"pointer"}
            fontWeight={400}
            fontSize={"20px"}
            _hover={{
              backgroundColor: "white",
              fontWeight: 450,
              transitionDuration: "0.3s",
            }}
            padding={"10px 30px"}
            borderRadius={"10px"}
          >
            {`User : ${user}`}
          </Box>
        )}
        {isAuth ? (
          <Box
            margin={"10px"}
            cursor={"pointer"}
            onClick={handleLogout}
            fontWeight={400}
            fontSize={"20px"}
            _hover={{
              backgroundColor: "white",
              fontWeight: 450,
              transitionDuration: "0.3s",
            }}
            padding={"10px 30px"}
            borderRadius={"10px"}
          >
            Logout
          </Box>
        ) : (
          <Box
            onClick={() => navigate("/login")}
            margin={"10px"}
            cursor={"pointer"}
            fontWeight={400}
            fontSize={"20px"}
            _hover={{
              backgroundColor: "white",
              fontWeight: 450,
              transitionDuration: "0.3s",
            }}
            padding={"10px 30px"}
            borderRadius={"10px"}
          >
            Login
          </Box>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
