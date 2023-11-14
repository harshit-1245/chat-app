import React, { useState } from 'react';
import axios from 'axios';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Toast, VStack, useToast } from '@chakra-ui/react';

const Login = () => {
  const toast=useToast()
  const [show,setShow]=useState(false)
  const [user,setUser]=useState({
    email:'',
    password:'',
  });

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [fieldName]: value }));
  };
const submitHandler=async()=>{
try {
  const response=await axios.post('http://localhost:5000/api/user/login',{
    email:user.email,
    password:user.password,
  });
  if(response.status===200){
    const data=response.data;
    toast({
      title: "Login Successful",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }
} catch (error) {
  console.error(error);
  toast({
    title: "Email or Password are incorrect",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "bottom",
  });
}
}



  const handleClick = () => {
    setShow(!show);
  };

  return (
    <VStack spacing='5px' color='black'>
      <FormControl id='email-input' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
  type='email'
  placeholder='Enter Your Email'
  value={user.email}
  onChange={(e) => handleChange(e, 'email')}
/>
      </FormControl>
      <FormControl id='password-login' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
        <Input
  type={show ? 'text' : 'password'}
  placeholder='Enter Your Password'
  value={user.password}
  onChange={(e) => handleChange(e, 'password')}
/>
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button colorScheme='blue' width='100%' style={{ marginTop: 15 }}
      onClick={submitHandler}
      >
        Login
      </Button>
      <Button variant='solid' colorScheme='red' width='100%'>
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
