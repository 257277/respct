import React from "react";

import { Input,FormControl,Button,Box} from '@chakra-ui/react';
import Styles from "../pages/style/message.module.css"
import Navbar from "./Navbar";
export default function Message()
{
return (

    <div>
        <Navbar/>
        <div className={Styles.conversation}>
            
        </div>
       <Box position="fixed" bottom="0" left="0" width="100%" p={4} bgColor="white" boxShadow="md">
       <FormControl isRequired>
          <Input type='email' placeholder="Enter the message" w={"80%"} float={"left"} ml={"3%"}/>
          <Button  colorScheme='blue'type='submit' > Send</Button>
       </FormControl>

</Box>
    </div>
)
}