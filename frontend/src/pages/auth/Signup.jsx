import React, { useState } from 'react'
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack} from "@chakra-ui/react"

const Signup = () => {
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [confirmPassword,setConfirmPassword]=useState();
  const [pic,setPic]=useState();

const [show,setShow]=useState(false);
const [show1,setShow1]=useState(false)

const handleClick=()=>{
  setShow(!show)
  setShow1(!show1)
}
const postDetails=(pics)=>{

}
const submitHandler=()=>{
  
}

  
  return (
    <VStack spacing='5px' color="black">
     <FormControl id='first-name' isRequired>
      <FormLabel>Name</FormLabel>
      <Input
      placeholder='Enter Your name'
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
     </FormControl>
     <FormControl id='email' isRequired>
      <FormLabel>Email</FormLabel>
      <Input
      placeholder='Enter Your Email'
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      />
     </FormControl>
     <FormControl id='password' isRequired>
      <FormLabel>Password</FormLabel>
       <InputGroup>
       <Input
      type={show ? "text":'password'}
      placeholder='Enter Your Password'
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
         {show ? "Hide":"Show"}
        </Button>
      </InputRightElement>
         
       </InputGroup>
       </FormControl>

      
    
     <FormControl id='confirm-password' isRequired>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup>
      <Input
      type={show1 ? "text":"password"}
      placeholder='Enter Your Confirm Password'
      value={confirmPassword}
      onChange={(e)=>setConfirmPassword(e.target.value)}
      />
      <InputRightElement width="4.5rem">
        <Button h="1.75rem" size="sm" onClick={handleClick}>
         {show1 ? "Hide":"Show"}
        </Button>
      </InputRightElement>
      </InputGroup>
     
     </FormControl>
     <FormControl id='pic'>
      <FormLabel>Upload Your Picture</FormLabel>
     <Input 
     type='file'
     p={1.5}
     accept='image/*'
     onChange={(e)=>postDetails(e.target.files[0])}
     />
</FormControl>

<Button
colorScheme='blue'
width="100%"
style={{marginTop:15}}
onClick={submitHandler}
>
  Sign Up

</Button>


    </VStack>
  )
}

export default Signup
