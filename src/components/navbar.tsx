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
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UUID } from "crypto";
import { clientConnection } from "@/utils/supabase/server";

export default function Navbar() {

  const router = useRouter();  // Create a router instance to handle redirection
  //defaults to signed out
  const [signedIn, setSignedIn] = useState(false);
  const [supabase, setSupabase] = useState(null);

  useEffect(() => {
    const initSupabase = async () => {
      const supabase = await clientConnection();
      setSupabase(supabase);

      supabase.auth.onAuthStateChange((event, session) => {
        if (event === "SIGNED_IN") {
          setSignedIn(true);
        } else if (event === "SIGNED_OUT") {
          setSignedIn(false);
        }
      });
    };

    initSupabase();
  }, []);

  // Sign out function
  const signout = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      router.push("/");
    }
  };

  
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
        borderColor={useColorModeValue("red.200", "red.400")}
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
          {signedIn ?
            <>
              <Text paddingTop="10px">Hello, {}</Text>
              <Link href="/pages/profile">
                <Button fontSize={"md"} fontWeight={400} variant={"link"} paddingTop="10px">
                  My Profile
                </Button>
              </Link>
              <Button fontSize={"md"} fontWeight={400} variant={"link"} paddingTop="10px" onClick={signout}>
                Sign Out
              </Button>
            </>
            :
            <>
              <Link href="/pages/about">
                <Button fontSize={"md"} fontWeight={400} variant={"link"} paddingTop="10px">
                  About
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
                  Sign Up/In
                </Button>
              </Link>
            </>
          }
        </Stack>
      </Flex>
    </Box>
  )
}
