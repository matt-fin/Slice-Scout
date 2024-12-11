"use client"
import { 
  Box, 
  chakra, 
  Container, 
  Image, 
  Flex, 
  Stack, 
  Text, 
  Button,
  VisuallyHidden 
} from "@chakra-ui/react"
import { FaInstagram, FaTwitter } from "react-icons/fa"
import { ReactNode } from "react"
import Link from "next/link"
import SliceScoutLogo from "../../public/slicescoutlogo.png"

const Logo = ({ 
  width = 100,  // Default width of 100px
  height = 100  // Default height of 100px
}) => {
  return (
    <Link href="/">
      <Image 
        src={SliceScoutLogo.src} 
        alt="Slice Scout Logo" 
        width={width}
        height={height}
        objectFit="contain"
        cursor="pointer"
      />
    </Link>
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
      bg={'whiteAlpha.100'}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: 'whiteAlpha.200',
      }}
      color="white"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  return (
    <Box
      bg={"darkred"}
      color={"white"}
    >
      <Container
        maxW={'6xl'}
        py={4}
      >
        <Flex 
          justifyContent="center" 
          mb={4}
        >
          <Button 
            as="a" 
            href="/pages/submit-form" 
            colorScheme="orange"
          >
            Sourced out a new Location or need to edit a wrong location?
          </Button>
        </Flex>

        <Flex 
          justifyContent="center" 
          alignItems="center" 
          gap={8}
        >
          {/* First Container - Navigation and Social */}
          <Flex 
            direction="column" 
            align="center" 
            maxW="300px" 
            w="full"
          >
            <Flex 
              direction={{ base: 'column', md: 'row' }} 
              gap={4} 
              justifyContent={'center'}
              textAlign={'center'}
              mb={4}
            >
              <Link href="/">Home</Link>
              <Link href="/pages/about">About Us</Link>
              <Link href="/pages/profile">Account</Link>
              <Link href="/faq">FAQ</Link>
            </Flex>

            <Stack direction={'row'} spacing={6} mb={4}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
            </Stack>

            <Text fontSize={'sm'} textAlign={'center'}>
              © 2024 Slice Scout
            </Text>
          </Flex>

          {/* Second Container - Logo */}
          <Flex 
            direction="column" 
            align="center" 
            maxW="300px" 
            w="full"
          >
            <Logo width={150} height={150} />
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}