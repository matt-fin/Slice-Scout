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
import Link from 'next/link';
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseURL, anonKey); //create supabase client to handle authentication

  const router = useRouter();  // Create a router instance to handle redirection

  //defaults to signed out
  const [signedIn, setSignedIn] = useState(false);

  //signs user out (revokes JWT)
  const signout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  }

  //checks current state of session
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') {
      setSignedIn(true);
    }
    else if (event === 'SIGNED_OUT') {
      setSignedIn(false);
    }
  })
  
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
          <Link href="/">
            <Image
            width={"150px"}
            height={"60px"}
            src="/navbar-slicescouticon.png"
            alt="Slice Scout Logo"
            position={"relative"}
            />
          </Link>
        </Flex>

        <Stack
          flex={{ base: 1 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}>
          <Link href="/pages/about">
            <Button fontSize={"md"} fontWeight={400} variant={"link"} paddingTop="10px">
              About
            </Button>
          </Link>
          {signedIn ?
            <>
              <Button fontSize={"md"} fontWeight={400} variant={"link"} paddingTop="10px" onClick={signout}>
                Sign Out
              </Button>
            </>
            :
            <>
              <Link href="/pages/login">
                <Button fontSize={"md"} fontWeight={400} variant={"link"} paddingTop="10px">
                  Sign In
                </Button>
              </Link>
              <Link href="/pages/login">
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"md"}
                  fontWeight={600}
                  color={"white"}
                  bg={"red.400"}
                  _hover={{
                    bg: "red.300",
                  }}>
                  Sign Up
                </Button>
              </Link>
            </>
          }
        </Stack>
      </Flex>
    </Box>
  )
}
