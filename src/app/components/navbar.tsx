"use client"

import {
  Box,
  Flex,
  Image,
  Text,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  CloseIcon,
} from "@chakra-ui/icons"

export default function Navbar() {

  return (
    <Box>
      <Flex
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg={"orange.200"}
        maxH={"90px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={2}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.100", "gray.900")}
        align={"center"}
        zIndex={3000}>
        <Flex justify={{ base: "center" }}>
          <Image
           width={"150px"}
           height={"60px"}
           src="/navbar-slicescouticon.png"
           alt="Slice Scout Logo"
           position={"relative"}
          />
        </Flex>

        <Stack
          flex={{ base: 1 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}>
          <Button as={"a"} fontSize={"md"} fontWeight={400} variant={"link"} href={"#"}>
            About
          </Button>
          <Button as={"a"} fontSize={"md"} fontWeight={400} variant={"link"} href={"#"}>
            Sign In
          </Button>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"md"}
            fontWeight={600}
            color={"white"}
            bg={"red.400"}
            href={"#"}
            _hover={{
              bg: "red.300",
            }}>
            Sign Up
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}
