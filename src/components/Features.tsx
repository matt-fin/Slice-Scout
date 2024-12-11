"use client"

import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react"
import MapWrapper from "@/mapcomponents/MapWrapper"
import PizzaCard from "@/app/pages/results/results-components/PizzaCard"

export default function Features() {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Features
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          See how our app works in action.
        </Text>
      </Stack>

      <Container maxW={"10000px"} maxH={{base:"100%", md: "1000px"}} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Box
            maxW={"400"}
            minH={"700"}
            w={"full"}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
          >
            <Heading size="md" mb={4}>Pizzeria Map</Heading>
            <MapWrapper 
              width="100%" 
              height="400px" 
              centerCoordinates={[40.7580, -73.9855]} 
            />
          </Box>
          
          <Box
            maxW={"400"}
            minH={"700"}
            w={"full"}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={5}
          >
            <Heading size="md" mb={4}>Pizza Card Demo</Heading>
            <PizzaCard demoMode={true} />
            <br/>
            <PizzaCard demoMode={true} />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}