import React from 'react';
import { Box, Container, Heading, Text, VStack, useColorModeValue, Flex, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';
import Services from '../components/Services';
import { FaShieldAlt } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const ServicesPage = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('#002952', 'teal.200');
  const overlayColor = useColorModeValue('rgba(0, 41, 82, 0.8)', 'rgba(0, 0, 0, 0.8)');

  return (
    <>
      <Header />
      <Box as="main" minHeight="100vh" bg={bgColor}>
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          backgroundImage="url('/images/cyber-security-bg.jpg')"
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundAttachment="fixed"
          position="relative"
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg={overlayColor}
            backdropFilter="blur(4px)"
          />
          <Flex
            direction="column"
            align="center"
            justify="center"
            minHeight={{ base: "70vh", md: "80vh" }}
            position="relative"
            zIndex="1"
            px={4}
          >
            <Container maxW="container.xl">
              <VStack spacing={8} as="section" textAlign="center">
                <MotionHeading
                  as="h1"
                  size={{ base: "4xl", md: "5xl", lg: "6xl" }}
                  color="white"
                  fontWeight="extrabold"
                  letterSpacing="tight"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  textShadow="2px 2px 4px rgba(0,0,0,0.3)"
                >
                  <Box as="span" color="teal.300" fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}>Cyber Security</Box>{" "}
                  <Box as="span" fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}>Services</Box>
                </MotionHeading>
                <MotionText
                  fontSize={{ base: "xl", md: "2xl" }}
                  color="gray.200"
                  maxW="3xl"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Safeguarding your digital frontier with state-of-the-art technology and unparalleled expertise.
                  Elevate your online security to new heights.
                </MotionText>
                <MotionButton
                  leftIcon={<FaShieldAlt />}
                  colorScheme="teal"
                  size="lg"
                  fontSize="md"
                  fontWeight="bold"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get a Free Consultation
                </MotionButton>
              </VStack>
            </Container>
          </Flex>
        </MotionBox>
        <Services />
      </Box>
      <Footer />
    </>
  );
};

export default ServicesPage;
