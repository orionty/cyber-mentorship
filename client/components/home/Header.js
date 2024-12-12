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
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  FaUser,
  FaChevronDown,
  FaSignInAlt,
  FaUserPlus,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
  
    // Check authentication status
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (token && userData) {
          setIsAuthenticated(true);
          setUser(JSON.parse(userData));
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };
  
    // Initial auth check
    checkAuth();
  
    // Set up scroll handler
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
  
    // Add event listeners
    window.addEventListener("scroll", handleScroll);
    
    // Set up auth state listener
    const handleStorageChange = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        checkAuth();
      }
    };
    window.addEventListener('storage', handleStorageChange);
  
    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <MotionBox
      bg={useColorModeValue(
        "rgba(20, 184, 166, 0.95)",
        "rgba(26, 32, 44, 0.95)"
      )}
      px={4}
      boxShadow={scrolled ? "md" : "none"}
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
            <Text as="span" color="yellow.400">
              Cyber1
            </Text>
            Mentorship
          </MotionFlex>

         {/* Desktop Navigation Links */}
<HStack spacing={8} alignItems="center">
  <HStack
    as="nav"
    spacing={6}
    display={{ base: "none", md: "flex" }}
    color="white"
  >
    {[
      "Home",
      "Features",
      "Programs",
      "Resources",
      ...(isAuthenticated ? [] : ["Login", "Sign Up"]),
    ].map((item) => (
      <MotionBox
        key={item}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        {item === "Programs" ? (
          <Popover trigger="hover" placement="bottom-start">
            <PopoverTrigger>
              <Button
                variant="ghost"
                rightIcon={<FaChevronDown />}
                color="white"
                _hover={{
                  bg: "whiteAlpha.200",
                  textDecoration: "none",
                }}
              >
                {item}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              bg="teal.700"
              border="none"
              boxShadow="xl"
              p={2}
            >
              <VStack align="stretch" spacing={2}>
                {["Beginner", "Intermediate", "Advanced"].map(
                  (program) => (
                    <NextLink
                      href={`/programs/${program.toLowerCase()}`}
                      passHref
                      key={program}
                    >
                      <Button
                        as={Link}
                        variant="ghost"
                        color="white"
                        justifyContent="flex-start"
                        _hover={{
                          bg: "teal.600",
                          textDecoration: "none",
                        }}
                      >
                        {program} Program
                      </Button>
                    </NextLink>
                  )
                )}
              </VStack>
            </PopoverContent>
          </Popover>
        ) : item === "Login" ? (
          <NextLink href="/login" passHref>
            <Button
              as={Link}
              leftIcon={<FaSignInAlt />}
              colorScheme="yellow"
              variant="solid"
              _hover={{ bg: "yellow.500", textDecoration: "none" }}
            >
              {item}
            </Button>
          </NextLink>
        ) : item === "Sign Up" ? (
          <NextLink href="/signup" passHref>
            <Button
              as={Link}
              leftIcon={<FaUserPlus />}
              bg="teal.800"
              color="white"
              variant="solid"
              _hover={{ bg: "teal.900", textDecoration: "none" }}
            >
              {item}
            </Button>
          </NextLink>
        ) : item === "Home" ? (
          <NextLink href="/" passHref>
            <Button
              as={Link}
              variant="ghost"
              color="white"
              _hover={{
                bg: "whiteAlpha.200",
                textDecoration: "none",
              }}
            >
              {item}
            </Button>
          </NextLink>
        ) : (
          <NextLink href={`/${item.toLowerCase()}`} passHref>
            <Button
              as={Link}
              variant="ghost"
              color="white"
              _hover={{
                bg: "whiteAlpha.200",
                textDecoration: "none",
              }}
            >
              {item}
            </Button>
          </NextLink>
        )}
      </MotionBox>
    ))}

    {/* User Profile Menu */}
    {isAuthenticated && (
      <MotionBox
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        position="relative"
      >
        <Menu>
          <MenuButton
            as={Button}
            variant="ghost"
            color="white"
            _hover={{ bg: "whiteAlpha.200", textDecoration: "none" }}
            _active={{ bg: "whiteAlpha.300" }}
            minW="200px"
          >
            <HStack spacing={2} justify="space-between" width="100%">
              <HStack spacing={2}>
                <Avatar
                  size="sm"
                  name={`${user?.firstName} ${user?.lastName}`}
                  src={user?.avatar}
                  bg="yellow.400"
                  color="black"
                />
                <Text>{user?.firstName}</Text>
              </HStack>
              <FaChevronDown />
            </HStack>
          </MenuButton>
          <MenuList
            bg="teal.800"
            borderColor="teal.700"
            boxShadow="xl"
            minW="200px"
          >
            <NextLink href="/dashboard" passHref>
              <MenuItem
                as={Link}
                icon={<FaUserCircle />}
                _hover={{ bg: "teal.700", textDecoration: "none" }}
                color="white"
                bg="teal.800"
              >
                Dashboard
              </MenuItem>
            </NextLink>
            <NextLink href="/settings" passHref>
              <MenuItem
                as={Link}
                icon={<FaCog />}
                _hover={{ bg: "teal.700", textDecoration: "none" }}
                color="white"
                bg="teal.800"
              >
                Settings
              </MenuItem>
            </NextLink>
            <MenuItem
              icon={<FaSignOutAlt />}
              onClick={handleLogout}
              _hover={{ bg: "teal.700", textDecoration: "none" }}
              color="white"
              bg="teal.800"
            >
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </MotionBox>
    )}
  </HStack>
</HStack>

          {/* Mobile Menu Icon */}
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            color="white"
            bg="teal.700"
            _hover={{ bg: "teal.500" }}
          />
        </Flex>

        {/* Mobile Navigation Menu */}
<Collapse in={isOpen} animateOpacity>
  <Box pb={4} display={{ md: "none" }}>
    <Stack as="nav" spacing={4}>
      {[
        "Home",
        "Features",
        "Programs",
        "Resources",
        ...(isAuthenticated ? [] : ["Login", "Sign Up"]),
      ].map((item) =>
        item === "Programs" ? (
          <Accordion allowToggle key={item}>
            <AccordionItem border="none">
              <AccordionButton
                as={Button}
                w="full"
                variant="ghost"
                color="white"
                justifyContent="space-between"
                _hover={{
                  bg: "whiteAlpha.200",
                  textDecoration: "none",
                }}
              >
                {item}
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={2}>
                <VStack align="stretch" spacing={2}>
                  {["Beginner", "Intermediate", "Advanced"].map(
                    (program) => (
                      <NextLink
                        href={`/programs/${program.toLowerCase()}`}
                        passHref
                        key={program}
                      >
                        <Button
                          as={Link}
                          w="full"
                          variant="ghost"
                          color="white"
                          justifyContent="flex-start"
                          onClick={onClose}
                          _hover={{
                            bg: "whiteAlpha.200",
                            textDecoration: "none",
                          }}
                        >
                          {program} Program
                        </Button>
                      </NextLink>
                    )
                  )}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ) : (
          <NextLink
            href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
            passHref
            key={item}
          >
            <Button
              as={Link}
              w="full"
              variant={
                item === "Login"
                  ? "solid"
                  : item === "Sign Up"
                  ? "solid"
                  : "ghost"
              }
              colorScheme={
                item === "Login"
                  ? "yellow"
                  : item === "Sign Up"
                  ? "teal"
                  : "whiteAlpha"
              }
              color={
                item === "Login" || item === "Sign Up"
                  ? "black"
                  : "white"
              }
              justifyContent="flex-start"
              onClick={onClose}
              leftIcon={
                item === "Login" ? (
                  <FaSignInAlt />
                ) : item === "Sign Up" ? (
                  <FaUserPlus />
                ) : undefined
              }
              _hover={{ textDecoration: "none" }}
            >
              {item}
            </Button>
          </NextLink>
        )
      )}

      {/* User Profile Section for Mobile */}
      {isAuthenticated && (
        <>
          <Box py={2}>
            <Flex
              align="center"
              p={2}
              borderRadius="md"
              bg="whiteAlpha.100"
            >
              <Avatar
                size="sm"
                name={`${user?.firstName} ${user?.lastName}`}
                src={user?.avatar}
                bg="yellow.400"
                color="black"
              />
              <Text color="white" ml={3} fontWeight="medium">
                {user?.firstName} {user?.lastName}
              </Text>
            </Flex>
          </Box>

          <NextLink href="/dashboard" passHref>
            <Button
              as={Link}
              w="full"
              variant="ghost"
              color="white"
              leftIcon={<FaUserCircle />}
              justifyContent="flex-start"
              onClick={onClose}
              _hover={{
                bg: "whiteAlpha.200",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Button>
          </NextLink>

          <NextLink href="/settings" passHref>
            <Button
              as={Link}
              w="full"
              variant="ghost"
              color="white"
              leftIcon={<FaCog />}
              justifyContent="flex-start"
              onClick={onClose}
              _hover={{
                bg: "whiteAlpha.200",
                textDecoration: "none",
              }}
            >
              Settings
            </Button>
          </NextLink>

          <Button
            w="full"
            variant="ghost"
            color="white"
            leftIcon={<FaSignOutAlt />}
            justifyContent="flex-start"
            onClick={() => {
              handleLogout();
              onClose();
            }}
            _hover={{
              bg: "whiteAlpha.200",
              textDecoration: "none",
            }}
          >
            Logout
          </Button>
        </>
      )}
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
        style={{ scaleX, transformOrigin: "0%" }}
      />
    </MotionBox>
  );
};

export default dynamic(() => Promise.resolve(Header), { ssr: false });
