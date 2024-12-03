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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";  // Import next router for page navigation
import ContactUsButton from "@/components/ContactUsButton";
import Cookies from 'js-cookie';


export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const router = useRouter();  // Create a router instance to handle redirection

  // Simulate a basic authentication check (you can replace it with actual API calls)
  const handleAuth = () => {
    // This is just a mock check. You can replace this with an API call.
    const mockUserData = {
      email: "user@example.com",
      password: "password123",  // Hardcoded for demo purposes
    };

    if (isSignUp) {
      // Handle sign-up logic
      console.log("Signing up with:", { username, email, password });
      // In a real application, send these details to your backend for registration
    } else {
      // Handle sign-in logic
      if (email === mockUserData.email && password === mockUserData.password) {
        // Redirect to the user profile page after successful login
        console.log("Credentials are correct. Redirecting to profile...");
        Cookies.set('auth_token', 'your_unique_token_here', { expires: 7 });
        router.push("/pages/profile");
    } else {
        // Display an error message for incorrect credentials
        alert("Invalid email or password.");
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
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          {isSignUp ? "Create an Account" : "Sign In"}
        </Heading>

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
