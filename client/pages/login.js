import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  VStack,
  Icon,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Container,
  Image,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash, FaHome } from "react-icons/fa";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const glowKeyframes = keyframes`
  0% { box-shadow: 0 0 10px rgba(49, 151, 149, 0.3); }
  50% { box-shadow: 0 0 20px rgba(49, 151, 149, 0.5); }
  100% { box-shadow: 0 0 10px rgba(49, 151, 149, 0.3); }
`;

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.200");
  const primaryColor = useColorModeValue("teal.500", "teal.300");
  const glowAnimation = `${glowKeyframes} 2s infinite`;

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => console.log("Google login success:", response),
    onError: () => console.log("Google login error"),
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and user data
      localStorage.setItem("token",  data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast({
        title: "Success",
        description: "Logged in successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to dashboard or home page
      router.push("/"); // or wherever you want to redirect after login
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      bgGradient="linear(to-br, #1a365d, #2a4365, #2c5282)"
      overflow="hidden"
    >
      {/* Home Button */}
      <Button
        position="absolute"
        top={4}
        left={4}
        leftIcon={<FaHome />}
        onClick={() => router.push("/")}
        colorScheme="teal"
        variant="solid"
        size="md"
        zIndex={10}
      >
        Home
      </Button>

      {/* Left Section - Login Form */}
      <MotionFlex
        w={{ base: "100%", md: "50%" }}
        p={{ base: 8, md: 20 }}
        direction="column"
        justify="center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        bg={useColorModeValue(
          "rgba(255, 255, 255, 0.95)",
          "rgba(26, 32, 44, 0.95)"
        )}
        backdropFilter="blur(20px)"
        borderRadius={{ base: "none", md: "3xl" }}
        m={{ base: 0, md: 8 }}
        boxShadow="2xl"
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          background: "linear-gradient(45deg, #00A3C4, #319795, #2C7A7B)",
          borderRadius: "inherit",
          zIndex: -1,
          filter: "blur(10px)",
          opacity: 0.5,
        }}
      >
        <Container maxW="md">
          <VStack spacing={8} align="start" w="full">
            <Box>
              <Heading
                fontSize={{ base: "3xl", md: "4xl" }}
                bgGradient="linear(to-r, teal.400, blue.500)"
                bgClip="text"
                letterSpacing="tight"
                mb={3}
                fontWeight="extrabold"
              >
                Welcome Back
              </Heading>
              <Text color={textColor} fontSize="lg" fontWeight="medium">
                Your security is our top priority
              </Text>
            </Box>

            <VStack spacing={6} w="full" as="form" onSubmit={handleLogin}>
              <InputGroup size="lg">
                <Input
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                  bg={useColorModeValue("white", "gray.700")}
                  border="2px solid"
                  borderColor={useColorModeValue("teal.100", "teal.700")}
                  _focus={{
                    borderColor: "teal.400",
                    boxShadow: "0 0 0 1px teal.400",
                  }}
                  _hover={{
                    borderColor: "teal.300",
                  }}
                  transition="all 0.3s"
                  isDisabled={isLoading}
                  type="email"
                  required
                />
              </InputGroup>

              <InputGroup size="lg">
                <Input
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  bg={useColorModeValue("white", "gray.700")}
                  border="2px solid"
                  borderColor={useColorModeValue("teal.100", "teal.700")}
                  _focus={{
                    borderColor: "teal.400",
                    boxShadow: "0 0 0 1px teal.400",
                  }}
                  _hover={{
                    borderColor: "teal.300",
                  }}
                  transition="all 0.3s"
                  isDisabled={isLoading}
                  required
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    variant="ghost"
                    color="teal.500"
                    _hover={{ bg: "teal.50" }}
                    isDisabled={isLoading}
                  >
                    <Icon as={showPassword ? FaEyeSlash : FaEye} />
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Button
                colorScheme="teal"
                size="lg"
                width="full"
                fontSize="md"
                as={motion.button}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 20px rgba(49, 151, 149, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                bgGradient="linear(to-r, teal.400, teal.500)"
                _hover={{
                  bgGradient: "linear(to-r, teal.500, teal.600)",
                }}
                animation={glowAnimation}
                transition="all 0.3s"
                type="submit"
                isLoading={isLoading}
                loadingText="Signing in..."
              >
                Sign in
              </Button>

              <Flex align="center" w="full">
                <Box
                  flex={1}
                  h="1px"
                  bgGradient="linear(to-r, transparent, teal.200, transparent)"
                />
                <Text
                  px={3}
                  color={textColor}
                  fontSize="sm"
                  fontWeight="medium"
                >
                  or continue with
                </Text>
                <Box
                  flex={1}
                  h="1px"
                  bgGradient="linear(to-r, transparent, teal.200, transparent)"
                />
              </Flex>

              <Button
                onClick={() => handleGoogleLogin()}
                variant="outline"
                size="lg"
                width="full"
                leftIcon={<FaGoogle />}
                as={motion.button}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 15px rgba(49, 151, 149, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                borderColor="teal.400"
                color="teal.500"
                _hover={{
                  bg: useColorModeValue("teal.50", "rgba(49, 151, 149, 0.1)"),
                  borderColor: "teal.500",
                }}
                transition="all 0.3s"
                isDisabled={isLoading}
              >
                Continue with Google
              </Button>
            </VStack>

            <Text color={textColor} fontSize="md" w="full" textAlign="center">
              Don't have an account?{" "}
              <Text
                as="span"
                color={primaryColor}
                cursor="pointer"
                fontWeight="semibold"
                _hover={{
                  textDecoration: "underline",
                  color: "teal.400",
                }}
                transition="all 0.3s"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </Text>
            </Text>
          </VStack>
        </Container>
      </MotionFlex>

      {/* Right Section - Cybersecurity Background */}
      <MotionBox
        display={{ base: "none", md: "block" }}
        w="50%"
        h="100vh"
        position="relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          bgGradient="linear(to-br, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7))"
          zIndex={1}
        />
        <Box
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
          bgImage="url('/images/login-cyber.jpg')"
          bgSize="cover"
          bgPosition="center"
          filter="brightness(0.7)"
          transform="scale(1.1)"
          transition="transform 0.3s ease-in-out"
          _hover={{ transform: "scale(1.15)" }}
        />
        <VStack
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={2}
          spacing={6}
          textAlign="center"
          color="white"
          bg="rgba(0, 0, 0, 0.4)"
          p={12}
          borderRadius="2xl"
          backdropFilter="blur(10px)"
          boxShadow="dark-lg"
          maxW="500px"
          w="90%"
        >
          <Heading
            size="2xl"
            color="white"
            bgGradient="linear(to-r, teal.200, blue.200)"
            bgClip="text"
            letterSpacing="wider"
          >
            Secure Login
          </Heading>
          <Text fontSize="xl" maxW="md" lineHeight="tall" fontWeight="medium">
            Experience state-of-the-art security with our advanced
            authentication system. Your data, your control.
          </Text>
        </VStack>
      </MotionBox>
    </Flex>
  );
};

export default LoginPage;
