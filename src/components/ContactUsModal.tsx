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
import { useForm } from 'react-hook-form';

export default function ContactUsModal({isOpen, onClose}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleFormSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('/pages/api/ticketemail', {
          method: "POST",
          headers: {
            "Content-Type": 'application/json',
          },
          body: JSON.stringify({ name, email, message }),
        });
  
        if (response.ok) {
          setIsSubmitted(true);
        } else {
          const errorData = await response.json();
          console.error('Failed to send message:', errorData.message);
          alert('Failed to send message. Please try again.');
        }
      } catch (error) {
        console.error('Error occurred while sending message:', error);
        alert('An unexpected error occurred. Please try again.');
      }
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
      <ModalOverlay bg="transparent"
      />
      <ModalContent 
        position="fixed"
        maxWidth={{ base: "60vw" }} 
        minWidth={{ base: "40vw" }}
        width="auto"
        height="auto"
        maxHeight={{ base: "70vh" }}
        overflowY="auto"
        bottom="35px"
        right="30px"
        borderRadius="20">
        <ModalHeader
          bg="orange.300"
          borderTopLeftRadius="20"
          borderTopRightRadius="20"
          position="sticky"
          top="0"
          width="100%"
          zIndex={1200}
        >Contact Us</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          paddingTop="30px"
          paddingBottom="40px"
        >
          {isSubmitted ? (
            <Box textAlign="center">
              <Text fontSize="30px">Thank You, {name}!</Text>
              <br/>
              <Text>Your message has been received. We will get back to you within 2 business days.</Text>
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
              <Button colorScheme="orange" type="submit" marginTop="20px">
              Submit
              </Button>
            </ModalFooter>
          </form>)}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}


