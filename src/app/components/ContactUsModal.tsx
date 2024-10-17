"use client"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  Text
} from "@chakra-ui/react"
import { useState } from "react"

export default function ContactUsModal({isOpen, onClose}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleFormSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitted(true);
  };

  const handleFormClosure = () => {
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitted(false);
    onClose();
  }
  
  return (
    
    <Modal 
      blockScrollOnMount={false} 
      isOpen={isOpen} 
      onClose={handleFormClosure} 
      size="sm" 
      isCentered={false}
      closeOnOverlayClick={false}>
      <ModalOverlay bg="transparent"/>
      <ModalContent 
        position="fixed"
        maxWidth={{ base: "60vw", md: "35vw", lg: "40vw" }} 
        minWidth={{ base: "40vw", md: "25vw", lg: "30vw" }}
        width="100%"
        bottom="35px"
        right="30px"
        borderRadius="20">
        <ModalHeader
          bg="orange.300"
          borderTopLeftRadius="20"
          borderTopRightRadius="20"
          position="fixed"
          width="100%"
        >Contact Us</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          paddingTop="90px"
          paddingBottom="60px"
        >
          {isSubmitted ? (
            <Box textAlign="center">
              <Text fontSize="30px">Thank You, {name}!</Text>
              <br/>
              <p>Your message has been received. We will get back to you within 2 business days.</p>
            </Box>
          ) : (
          <form onSubmit={handleFormSubmit}>
            <FormControl id="name" mb={4} isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" placeholder="Your Name" value={name}
                onChange={(e) => setName(e.target.value)}/>
            </FormControl>
          
            <FormControl id="email" mb={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Your Email" value={email}
                onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
          
            <FormControl id="message" mb={4} isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea placeholder="Your Message" value={message}
                onChange={(e) => setMessage(e.target.value)} />
            </FormControl>
            <ModalFooter>
              <Button colorScheme="orange" type="submit" marginTop="30px">
              Submit
              </Button>
            </ModalFooter>
          </form>)}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
