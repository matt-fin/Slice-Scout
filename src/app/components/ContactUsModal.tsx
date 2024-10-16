"use client"

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Image,
} from "@chakra-ui/react"
import { useState } from "react"

export default function ContactUsModal({ isOpen, onClose}) {

  //const { isOpen, onOpen, onClose } = useDisclosure();
  
  return (
    
    <Modal 
      blockScrollOnMount={false} 
      isOpen={isOpen} 
      onClose={onClose} 
      size="sm" 
      isCentered={false}>
      <ModalOverlay bg="transparent"/>
      <ModalContent 
        position="fixed"
        maxWidth="35vw" 
        minWidth="25vw"
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
        <ModalBody
          paddingTop="90px"
        >
          <FormControl id="name" mb={4}>
            <FormLabel>Name</FormLabel>
            <Input type="text" placeholder="Your Name" />
          </FormControl>
          
          <FormControl id="email" mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Your Email" />
          </FormControl>
          
          <FormControl id="message" mb={4}>
            <FormLabel>Message</FormLabel>
            <Textarea placeholder="Your Message" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="orange" mr={3} onClick={onClose}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
