import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Container,
  Text,
  Collapse,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FaUser, FaChevronDown, FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import NextLink from 'next/link';
import dynamic from 'next/dynamic';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <MotionBox
      bg={useColorModeValue('rgba(20, 184, 166, 0.95)', 'rgba(26, 32, 44, 0.95)')}
      px={4}
      boxShadow={scrolled ? 'md' : 'none'}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex="1000"
      transition="all 0.3s ease-in-out"
      backdropFilter="blur(10px)"
    >
      <Container maxW="container.xl">
        <Flex h={20} alignItems="center" justifyContent="space-between">
          {/* Logo */}
          <MotionFlex
            color="white"
            fontWeight="bold"
            fontSize="2xl"
            alignItems="center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Text as="span" color="yellow.400">Cyber</Text>
            Mentorship
          </MotionFlex>

          {/* Desktop Navigation Links */}
          <HStack spacing={8} alignItems="center">
            <HStack as="nav" spacing={6} display={{ base: 'none', md: 'flex' }} color="white">
              {['Home', 'Features', 'Programs', 'Resources', 'Login', 'Sign Up'].map((item) => (
                <MotionBox
                  key={item}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {item === 'Programs' ? (
                    <Popover trigger="hover" placement="bottom-start">
                      <PopoverTrigger>
                        <Button variant="ghost" rightIcon={<FaChevronDown />} color="white" _hover={{ bg: 'whiteAlpha.200', textDecoration: 'none' }}>
                          {item}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent bg="teal.700" border="none" boxShadow="xl" p={2}>
                        <VStack align="stretch" spacing={2}>
                          {['Beginner', 'Intermediate', 'Advanced'].map((program) => (
                            <NextLink href={`/programs/${program.toLowerCase()}`} passHref key={program}>
                              <Button as={Link} variant="ghost" color="white" justifyContent="flex-start" _hover={{ bg: 'teal.600', textDecoration: 'none' }}>{program} Program</Button>
                            </NextLink>
                          ))}
                        </VStack>
                      </PopoverContent>
                    </Popover>
                  ) : item === 'Login' ? (
                    <NextLink href="/login" passHref>
                      <Button as={Link} leftIcon={<FaSignInAlt />} colorScheme="yellow" variant="solid" _hover={{ bg: 'yellow.500', textDecoration: 'none' }}>{item}</Button>
                    </NextLink>
                  ) : item === 'Sign Up' ? (
                    <NextLink href="/signup" passHref>
                      <Button as={Link} leftIcon={<FaUserPlus />} bg="teal.800" color="white" variant="solid" _hover={{ bg: 'teal.900', textDecoration: 'none' }}>{item}</Button>
                    </NextLink>
                  ) : item === 'Home' ? (
                    <NextLink href="/" passHref>
                      <Button as={Link} variant="ghost" color="white" _hover={{ bg: 'whiteAlpha.200', textDecoration: 'none' }}>{item}</Button>
                    </NextLink>
                  ) : (
                    <NextLink href={`/${item.toLowerCase()}`} passHref>
                      <Button as={Link} variant="ghost" color="white" _hover={{ bg: 'whiteAlpha.200', textDecoration: 'none' }}>{item}</Button>
                    </NextLink>
                  )}
                </MotionBox>
              ))}
            </HStack>
          </HStack>

          {/* Mobile Menu Icon */}
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            color="white"
            bg="teal.700"
            _hover={{ bg: 'teal.500' }}
          />
        </Flex>

        {/* Mobile Navigation Menu */}
        <Collapse in={isOpen} animateOpacity>
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as="nav" spacing={4}>
              {['Home', 'Features', 'Programs', 'Resources', 'Login', 'Sign Up'].map((item) => (
                item === 'Programs' ? (
                  <Accordion allowToggle key={item}>
                    <AccordionItem border="none">
                      <AccordionButton
                        as={Button}
                        w="full"
                        variant="ghost"
                        color="white"
                        justifyContent="space-between"
                        _hover={{ bg: 'whiteAlpha.200', textDecoration: 'none' }}
                      >
                        {item}
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={2}>
                        <VStack align="stretch" spacing={2}>
                          {['Beginner', 'Intermediate', 'Advanced'].map((program) => (
                            <NextLink href={`/programs/${program.toLowerCase()}`} passHref key={program}>
                              <Button 
                                as={Link}
                                w="full"
                                variant="ghost"
                                color="white"
                                justifyContent="flex-start"
                                onClick={onClose}
                                _hover={{ bg: 'whiteAlpha.200', textDecoration: 'none' }}
                              >
                                {program} Program
                              </Button>
                            </NextLink>
                          ))}
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <NextLink href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} passHref key={item}>
                    <Button 
                      as={Link}
                      w="full" 
                      variant={item === 'Login' ? 'solid' : item === 'Sign Up' ? 'solid' : 'ghost'}
                      colorScheme={item === 'Login' ? 'yellow' : item === 'Sign Up' ? 'teal' : 'whiteAlpha'}
                      color={item === 'Login' || item === 'Sign Up' ? 'black' : 'white'}
                      justifyContent="flex-start" 
                      onClick={onClose}
                      leftIcon={
                        item === 'Login' ? <FaSignInAlt /> :
                        item === 'Sign Up' ? <FaUserPlus /> :
                        undefined
                      }
                      _hover={{ textDecoration: 'none' }}
                    >
                      {item}
                    </Button>
                  </NextLink>
                )
              ))}
            </Stack>
          </Box>
        </Collapse>
      </Container>

      {/* Scroll Progress Bar */}
      <MotionBox
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        height="3px"
        bg="yellow.400"
        style={{ scaleX, transformOrigin: '0%' }}
      />
    </MotionBox>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
