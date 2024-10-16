"use client"

import {
  Box,
  chakra,
  Container,
  Image,
  Flex,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react"
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"
import { ReactNode } from "react"

const Logo = () => {
  return (
    <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
    <Image
     boxSize="80px"
     objectFit={"contain"}
     src="/slicescoutlogo.png"
     alt="Slice Scout Footer Logo"
    />
  </Flex>
  )
}

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  return (
    <Box
      bg={"rgb(242,240,239)"}
      color={"rgb(0, 0, 0)"}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}>
        <Logo />
        <Stack direction={"row"} spacing={6}>
          <Box as="a" href={"#"} >
            Home
          </Box>
          <Box as="a" href={"#"}>
            About Us
          </Box>
          <Box as="a" href={"#"}>
            Account
          </Box>
          <Box as="a" href={"#"}>
            FAQ
          </Box>
          <Box as="a" href={"#"}>
            Contact
          </Box>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={"rgb(53, 33, 0)"}
        bg={"rgb(127, 43, 10)"}
        color={"rgb(235, 235, 235)"}>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}>
          <Text fontSize="sm">© 2024 Slice Scout</Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton label={"Twitter"} href={"#"}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={"Instagram"} href={"#"}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
