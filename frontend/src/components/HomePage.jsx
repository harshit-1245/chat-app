import React from 'react'
import {Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text} from "@chakra-ui/react"
import Login from "../pages/auth/Login"
import Signup from "../pages/auth/Signup"
const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
    <Box 
    d="flex"
    justifyContent="center"
    p={3}
    bg={"white"}
    w="100%"
    m="40px 0 15px 0"
    borderRadius="1g"
    borderWidth="1px">
      <Text className='text'
      fontSize="4xl" 
      fontFamily="work sans"
      color="black"
     
      >Talking-Takie</Text>
    </Box>
    <Box bg="white" w="100%" p={4} borderRadius="1g" borderWidth="1px" color='black'>
    <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList mb='1em'>
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
    </Box>
    </Container>
  )
}

export default HomePage
