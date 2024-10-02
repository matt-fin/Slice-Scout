'use client'

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box>
      <Flex
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg={useColorModeValue('orange.200', 'gray.800')}
        color={useColorModeValue('red.800', 'white')}
        minH={'70px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={2}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.100', 'gray.900')}
        align={'center'}
        zIndex={1000}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontSize='2xl'
            color={useColorModeValue('gray.800', 'white')}>
            Slice Scout
          </Text>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Button as={'a'} fontSize={'md'} fontWeight={400} variant={'link'} href={'#'}>
            About
          </Button>
          <Button as={'a'} fontSize={'md'} fontWeight={400} variant={'link'} href={'#'}>
            Sign In
          </Button>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'md'}
            fontWeight={600}
            color={'white'}
            bg={'red.400'}
            href={'#'}
            _hover={{
              bg: 'red.300',
            }}>
            Sign Up
          </Button>
        </Stack>
      </Flex>
    </Box>
  )
}
