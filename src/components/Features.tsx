"use client"

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { ReactElement } from "react"
import PizzaCard from "@/app/pages/results/results-components/PizzaCard"

interface CardProps {
  heading: string
  description: string
  href: string
  width: string
  height: string
}

const Card = ({ heading, description, href, width, height }: CardProps) => {
  return (
    <Box
      maxW={width}
      minH={height}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}>
      <Stack align={"start"} spacing={2}>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  )
}

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
          <Card
            heading={"Heading"}
            description={"Map will go here."}
            href={"#"}
            width={"600"}
            height={"700"}
          />
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