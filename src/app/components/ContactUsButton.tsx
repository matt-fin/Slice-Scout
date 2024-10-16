"use client"

import{
    IconButton,
    useDisclosure,
    Image,
} from "@chakra-ui/react"
import { CloseIcon } from '@chakra-ui/icons';
import React from "react";
import ContactUsModal from "./ContactUsModal";

export default function ContactUsButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
        <IconButton
        
        icon= 
        {   isOpen ? <CloseIcon boxSize={6} /> :

            <Image
                src="contacticon.png"
                alt="pizza_help_icon"
                h="50px"
                position="fixed"
                align="center"
            />
        }
        aria-label="Contact Us"
        position="fixed"
        bottom="30px"
        right="30px"
        colorScheme="orange"
        h="60px"
        w="60px"
        borderRadius={"50"}
        onClick={onOpen}
        />

        <ContactUsModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}