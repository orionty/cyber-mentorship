import { Box, Heading, Text, Input, Button, Flex, Icon, VStack, useColorModeValue, Container, Stack } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { useState } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionIcon = motion(Icon);

const NewsletterSignupSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  
  const bgGradient = useColorModeValue(
    'linear(to-r, teal.500, teal.600, teal.700)',
    'linear(to-r, teal.700, teal.800, teal.900)'
  );

  const glowColor = useColorModeValue('rgba(49, 151, 149, 0.2)', 'rgba(129, 230, 217, 0.2)');

  return (
    <MotionBox
      bgGradient={bgGradient}
      py={{ base: 12, md: 20 }}
      px={{ base: 4, md: 8 }}
      position="relative"
      overflow="hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <MotionBox
        position="absolute"
        top="-50%"
        left="-20%"
        width="140%"
        height="200%"
        bg={`radial-gradient(circle, ${glowColor} 0%, transparent 70%)`}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <Container maxW="4xl" position="relative">
        <VStack spacing={{ base: 6, md: 8 }} align="center">
          <MotionHeading
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, yellow.100, white)"
            bgClip="text"
            letterSpacing="tight"
            textAlign="center"
            animate={{
              scale: [1, 1.02, 1],
              textShadow: ["0 0 0px rgba(255,255,255,0.5)", "0 0 20px rgba(255,255,255,0.8)", "0 0 0px rgba(255,255,255,0.5)"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Stay Updated with CyberMentorship!
          </MotionHeading>

          <MotionText
            fontSize={{ base: "md", sm: "lg", md: "xl" }}
            maxW="2xl"
            textAlign="center"
            color="whiteAlpha.900"
            px={{ base: 4, md: 0 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Join our exclusive community to receive the latest news, expert insights, special offers, and updates on upcoming events and mentorship opportunities in cybersecurity.
          </MotionText>

          <Stack
            w="full"
            maxW="md"
            spacing={{ base: 4, md: 0 }}
            direction={{ base: "column", md: "row" }}
            bg="whiteAlpha.100"
            backdropFilter="blur(10px)"
            borderRadius="xl"
            p={2}
            boxShadow="xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            as={motion.div}
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <Flex 
              align="center" 
              flex={1} 
              bg="white" 
              borderRadius="lg" 
              px={4}
              py={{ base: 2, md: 0 }}
            >
              <Icon as={FaEnvelope} color="teal.500" mr={3} />
              <Input
                placeholder="Enter your email address"
                border="none"
                _focus={{ boxShadow: "none" }}
                _placeholder={{ color: "gray.400" }}
                color="teal.800"
                fontSize={{ base: "sm", md: "md" }}
              />
            </Flex>
            <Button
              colorScheme="yellow"
              size={{ base: "md", md: "lg" }}
              borderRadius="lg"
              px={{ base: 6, md: 8 }}
              ml={{ base: 0, md: 2 }}
              rightIcon={<FaPaperPlane />}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "xl"
              }}
              whileTap={{ scale: 0.95 }}
              w={{ base: "full", md: "auto" }}
            >
              Subscribe
            </Button>
          </Stack>
        </VStack>
      </Container>
    </MotionBox>
  );
};

export default NewsletterSignupSection;
