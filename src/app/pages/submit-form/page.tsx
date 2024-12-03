"use client"

import { useState } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
    VStack,
    Box,
    Heading
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createClient } from '@supabase/supabase-js';
import ContactUsButton from "@/components/ContactUsButton";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

const SubmitForm = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [pizzeriaId, setPizzeriaId] = useState<number | "">("");
    const [requestType, setRequestType] = useState<string>("");
    const [locationName, setLocationName] = useState<string>("");
    const [addressLine1, setAddressLine1] = useState<string>("");
    const [addressLine2, setAddressLine2] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const state = "New York"
    const country = "United States"

    //Need to geocode latitude and longitude before storing

    if(!session) {
      router.push("./login")
      return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = {
            user_id: session.user.id,
            pizzeria_id: pizzeriaId,
            request_type: requestType,
            location_name: locationName,
            address_line1: addressLine1,
            address_line2: addressLine2,
            city: city,
            state: state,
            country: country,
            geocode_latitude: "12.345678901",
            geocode_longitude: "12.243253645",
        };

        const { data: submissionsData, error: submissionError } = await supabase
        .from("Submissions")
        .insert([
            {
                user_id: session.user.id,
                pizzeria_id: pizzeriaId,
                request_type: requestType,
                submission_status: "Pending"
            },
        ]).select("submission_id")
        .single();

        if (submissionError) throw new Error(submissionError.message);

        try {
            const res = await fetch("/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                console.log("Form submission success!");
                setPizzeriaId("");
                setRequestType("");
                setLocationName("");
                setAddressLine1("");
                setAddressLine2("");
                setCity("");
            }
        }
        catch (error) {
            console.error(error);
        }
    }

return (
    <Box backgroundImage={"/pizzaimg.png"} bgRepeat="repeat" position="relative">
    <Box maxWidth="907px" mx="auto" pt={"120px"} pb={"50px"} pl={"150px"} pr={"150px"} bg={"orange.100"} position="relative" opacity="95%">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Heading bg="red.300" borderRadius="50%" padding="15px">Submission Form</Heading>
          <Text>Please use this form if you would like to source out a new pizzeria location, or you would like to correct a wrong location to a pizzeria. Make sure you include the pizzeria ID found on the pizzeria's page if you would like to make a change.</Text>
          <FormControl>
            <FormLabel fontWeight={"600"}>Pizzeria ID</FormLabel>
            <Text>(If entering an update for an existing pizzeria. Ignore if it's a new pizzeria.)</Text>
            <Input variant="fill" opacity={"70%"} type="number" value={pizzeriaId} onChange={(e) => setPizzeriaId(Number(e.target.value) || "")} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight={"600"}>Request Type</FormLabel>
            <Select variant="fill" opacity={"70%"} value={requestType} onChange={(e) => setRequestType(e.target.value)}>
              <option value="">Select Request</option>
              <option value="update_location">Update Location</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight={"600"}>Pizzeria Name</FormLabel>
            <Input variant="fill" opacity={"70%"} value={locationName} onChange={(e) => setLocationName(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight={"600"}>Address Line 1</FormLabel>
            <Input variant="fill" opacity={"70%"} value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight={"600"}>Address Line 2</FormLabel>
            <Input variant="fill" opacity={"70%"} value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontWeight={"600"}>Borough</FormLabel>
            <Select variant="fill" opacity={"70%"} value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="">Select Borough</option>
                <option value="Brooklyn">Brooklyn</option>
                <option value="Manhattan">Manhattan</option>
                <option value="Queens">Queens</option>
                <option value="Staten Island">Staten Island</option>
                <option value="Bronx">Bronx</option>
            </Select>
          </FormControl>
          <Button type="submit" colorScheme="orange">
            Submit
          </Button>
        </VStack>
      </form>
    </Box>
    <ContactUsButton/>
    </Box>
  );
};

export default SubmitForm;