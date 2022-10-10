import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const StudentCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Flex
      border={"0.5px solid black"}
      margin={"0px auto"}
      gap={"20px"}
      width={"700px"}
      height={"150px"}
      padding={"10px"}
      justifyContent={"center"}
      alignItems={"center"}
      backgroundColor={"white"}
    >
      <Image src={data.profile_pic} width={"150px"} />
      {data && (
        <Box
          padding={"20px"}
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
          <Heading color={"red"} textAlign={"center"} fontSize={"20px"}>
            {`Name : ${data.name}`}
          </Heading>
          <Text>{`Age : ${data.age}`}</Text>
          <Text>{`Gender : ${data.gender}`}</Text>
        </Box>
      )}
      <Button
        padding={"10px"}
        onClick={() => navigate(`/students/${data._id}`)}
      >
        More Details
      </Button>
    </Flex>
  );
};

export default StudentCard;
