//sample page
"use client"

import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Stack,
  Text,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";  // Import next router for page navigation
import ContactUsButton from "@/components/ContactUsButton";
import { AuthApiError, createClient, isAuthApiError } from "@supabase/supabase-js";
import { handleEnterKey } from "@/utils/handleEnterKeyEvents";

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  //sets message for alert in response to failed signin
  const [alert, setAlert] = useState({isAlert: false, message: ""});

  const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const supabase = createClient(supabaseURL, anonKey); //create supabase client to handle authentication
  const router = useRouter();  // Create a router instance to handle redirection

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        // Handle sign-up logic
        await signupUser(email, password, username, supabase);
      } else {
        await loginUser(email, password, supabase);
      }
      
      router.push("/pages/profile");
    } catch(error) {
      if (isAuthApiError(error))
      {
        if (error.message === "Invalid login credentials")
        {
          setAlert({isAlert: true, message: "Invalid login credentials inputted. Please try again."});
        }
        else if (error.message === "missing email or phone")
        {
          setAlert({isAlert: true, message: "Please input an email."});
        }

      }
      else 
      {
        setAlert({isAlert: true, message: "Signin failed. Error was encountered."});
      }
    }
  };

  return (
    <Box backgroundImage={"/pizzatransparent.png"}>
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.50"
      p={4}
    >
      <Box
        maxW="400px"
        w="100%"
        p={8}
        bg="white"
        borderRadius="lg"
        boxShadow="md"
        onKeyDown={handleEnterKey(handleAuth)}
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          {isSignUp ? "Create an Account" : "Sign In"}
        </Heading>

        {alert.isAlert && (
          <Alert 
            status="error"
            mb={4}
          >
            <AlertIcon />
            <AlertTitle>Invalid Fields</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        {isSignUp && (
          <Input
            placeholder="Username"
            mb={4}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        <Input
          placeholder="Email"
          mb={4}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          mb={4}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          colorScheme="orange"
          w="100%"
          onClick={handleAuth}
          mb={4}
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>

        <Divider mb={4} />

        <Text textAlign="center" fontSize="sm">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <Button
            variant="link"
            colorScheme="orange"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </Button>
        </Text>
      </Box>
      <ContactUsButton/>
    </Flex>
    </Box>
  );
}

async function loginUser(email, password, client) {
  const { data: {user}, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  })

  if (user) {
    console.log("Signed in with: ", {email, password});
  }
  else if (error) {
    console.error("Signing in failed: ", error);
    throw error;
  }
} 

async function signupUser(email, password, username, client) {
  const { data: {user}, error } = await client.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        username: username,
        email: email,
      },
    },
  });

  if (user) {
    console.log("Signed up with: ", {email, password, username});
  }
  else if (error) {
    console.error("Signup failed: ", error);
    throw error;
  }
} 