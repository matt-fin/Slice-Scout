"use client"

import { useState, useEffect } from "react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
    VStack,
    HStack,
    Box,
    Heading,
    useToast
} from "@chakra-ui/react";
//import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ContactUsButton from "@/components/ContactUsButton";
import { handleEnterKey } from "@/utils/handleEnterKeyEvents";
import { clientConnection } from "@/utils/supabase/server";


const supabase = await clientConnection();


const SubmitForm = () => {
    const toast = useToast();

    const [pizzeriaId, setPizzeriaId] = useState<number | "">(0);
    const [requestType, setRequestType] = useState<string>("");
    const [locationName, setLocationName] = useState<string>("");
    const [addressLine1, setAddressLine1] = useState<string>("");
    const [addressLine2, setAddressLine2] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [websiteLink, setWebsiteLink] = useState<string>("");
    const [reviewsLink, setReviewsLink] = useState<string>("");
    const [openTime, setOpenTime] = useState<string>("");
    const [closeTime, setCloseTime] = useState<string>("");
    const [openAmPm, setOpenAmPm] = useState<string>("AM");
    const [closeAmPm, setCloseAmPm] = useState<string>("PM");
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    //checks if user currently is logged in
    useEffect(() => {
      const checkUserSession = async () => {
          const { data: { session }, error } = await supabase.auth.getSession();
          if (error || !session) {
              router.push("/pages/login");
          } else {
              setUser(session.user); // Set user data when session exists
          }
      };
      checkUserSession();
  }, [router]);

    //Geocode the latitude longitude entered
    const geocodeAddress = async (address: string) => {
      const GEOAPIFY_API_KEY = 'ecd6fc145e144344af43dab38ba513e4';
      const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
        address
      )}&apiKey=${GEOAPIFY_API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.features && data.features.length > 0) {
          const { lat, lon } = data.features[0].properties;
          return { lat, lon };
        } else {
          console.error("No geocode results found");
          return null;
        }
      } catch (error) {
        console.error("Error during geocoding:", error);
        return null;
      }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) return;

        const userId = user.id;
        const fullAddress = `${addressLine1}, ${addressLine2 || ""}, ${city}, ${zipCode}`;
        const geocodeResult = await geocodeAddress(fullAddress);
    
        if (!geocodeResult) {
          alert("Failed to geocode address. Please try again.");
          return;
        }
    
        const { lat, lon } = geocodeResult;

        try {
            const res = await fetch("/api/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId,
                  pizzeriaId,
                  requestType,
                  locationName,
                  addressLine1,
                  addressLine2,
                  city,
                  zipCode,
                  phoneNumber,
                  websiteLink,
                  reviewsLink,
                  openTime: `${openTime} ${openAmPm}`,
                  closeTime: `${closeTime} ${closeAmPm}`,
                  lat,
                  lon,
                })
            });
            if (res.ok) {
              toast({
                title: "Form submitted successfully.",
                description: "Your request has been submitted. Thank you!",
                status: "success",
                duration: 4000,
                isClosable: true,
              });

                console.log("Form submission success!");
                setPizzeriaId("");
                setRequestType("");
                setLocationName("");
                setAddressLine1("");
                setAddressLine2("");
                setCity("");
                setZipCode("");
                setPhoneNumber("");
                setWebsiteLink("");
                setReviewsLink("");
                setOpenTime("");
                setCloseTime("");
            }
        }
        catch (error) {
            console.error("Form submission failure");
        }
    }

return (
    <Box backgroundImage={"/pizzaimg.png"} bgRepeat="repeat" position="relative">
    <Box maxWidth="907px" mx="auto" pt={"120px"} pb={"50px"} pl={"150px"} pr={"150px"} bg={"orange.100"} position="relative" opacity="95%">
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Heading bg="red.300" borderRadius="50%" padding="15px">Submission Form</Heading>
          <Text>Please use this form if you would like to source out a new pizzeria location, or you would like to correct a wrong location to a pizzeria. Make sure you include the pizzeria ID found on the pizzeria's page if you would like to make a change.</Text>
          {requestType === "Update Location" && (
            <FormControl isRequired>
              <FormLabel fontWeight={"600"}>Pizzeria ID</FormLabel>
              <Input variant="fill" opacity={"70%"} type="number" value={pizzeriaId} onChange={(e) => setPizzeriaId(Number(e.target.value) || "")} />
            </FormControl>
            )}
          <FormControl isRequired>
            <FormLabel fontWeight={"600"}>Request Type</FormLabel>
            <Select variant="fill" opacity={"70%"} value={requestType} onChange={(e) => setRequestType(e.target.value)}>
              <option value="">Select Request</option>
              <option value="Update Location">Update Location</option>
              <option value="Add Location">Add Location</option>
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
          <FormControl isRequired pb={"25px"}>
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
          <FormControl isRequired pb={"25px"}>
            <FormLabel fontWeight={"600"}>Zipcode/Postal Code</FormLabel>
            <Input variant="fill" opacity={"70%"} value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
          </FormControl>

          {requestType === "Add Location" && (
            <>
              <FormControl>
                <FormLabel fontWeight={"600"}>Phone Number</FormLabel>
                <Input variant="fill" opacity={"70%"} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"600"}>Website Link</FormLabel>
                <Input variant="fill" opacity={"70%"} value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"600"}>Reviews Link</FormLabel>
                <Input variant="fill" opacity={"70%"} value={reviewsLink} onChange={(e) => setReviewsLink(e.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"600"}>Open Time</FormLabel>
                <HStack>
                  <Input type="number" variant="fill" opacity={"70%"} value={openTime} onChange={(e) => setOpenTime(e.target.value)}/>
                  <Select variant="fill" opacity={"70%"} value={openAmPm} onChange={(e) => setOpenAmPm(e.target.value)}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </Select>
                </HStack>
              </FormControl>
              <FormControl pb={"25px"}>
                <FormLabel fontWeight={"600"}>Closing Time</FormLabel>
                <HStack>
                  <Input type="number" variant="fill" opacity={"70%"} value={closeTime} onChange={(e) => setCloseTime(e.target.value)}/>
                  <Select variant="fill" opacity={"70%"} value={closeAmPm} onChange={(e) => setCloseAmPm(e.target.value)}>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </Select>
                </HStack>
              </FormControl>
            </>
            )
          };
          <Button type="submit" colorScheme="orange" onKeyDown={handleEnterKey(handleSubmit)}>
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