import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { ChakraProvider } from "@chakra-ui/react"; // Import ChakraProvider
import axios from "axios";
import { useState } from "react"; // Removed unnecessary imports

const Signup = () => {
  const [show, setShow] = useState(false);
  const toast = useToast();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = async () => {
    if (user.password !== user.confirmPassword) {
      toast({
        title: "Password doesn't match",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/user/register', {
          name: user.name,
          email: user.email,
          password: user.password,
        });

        if (response.status === 201) {
          toast({
            title: "Registration Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });

          // Clear the form fields on successful registration
          setUser({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          });
        }
      } catch (error) {
        console.error('Error during registration:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          toast({
            title: "Something went wrong",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      }
    }
  };

  return (
    <ChakraProvider>
      <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            placeholder="Enter Your Name"
            value={user.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            name="email"
            value={user.email}
            placeholder="Enter Your Email Address"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={user.password}
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirmPassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm password"
              value={user.confirmPassword}
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="pic">
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            // onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>
        <Button
          colorScheme="teal" // Adjusted colorScheme
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
        >
          Sign Up
        </Button>
      </VStack>
    </ChakraProvider>
  );
};

export default Signup;
