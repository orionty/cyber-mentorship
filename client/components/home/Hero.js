import { Box, Heading, Text, Button, Flex, Container, useBreakpointValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaPlayCircle, FaArrowRight } from 'react-icons/fa';
import NextLink from 'next/link';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionModalContent = motion(ModalContent);

const HeroSection = () => {
  const [currentBg, setCurrentBg] = useState(0);
  const bgImages = [
    'url("/images/cyber-bg-1.jpg")',
    'url("/images/cyber-bg-2.jpg")',
    'url("/images/cyber-bg-3.jpg")',
  ];

  const headingSize = useBreakpointValue({ base: '4xl', md: '5xl', lg: '6xl' });
  const textSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prevBg) => (prevBg + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MotionBox
      position="relative"
      minH={{ base: '110vh', md: '90vh' }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <AnimatePresence initial={false}>
        <MotionBox
          key={currentBg}
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgImage={bgImages[currentBg]}
          bgSize="cover"
          bgPosition="center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      <MotionBox
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bgGradient="linear(to-r, rgba(20, 184, 166, 0.7), rgba(30, 64, 175, 0.7))"
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex
          direction="column"
          align={{ base: 'center', md: 'flex-start' }}
          textAlign={{ base: 'center', md: 'left' }}
          color="white"
        >
          <MotionBox
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Heading fontSize={headingSize} fontWeight="extrabold" mb={4} lineHeight="shorter">
              Empowering the Next Generation of Cybersecurity Experts
            </Heading>
          </MotionBox>

          <MotionBox
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Text fontSize={textSize} mb={8} maxW="2xl">
              Connect, Learn, and Grow with Cybersecurity Mentors Worldwide. Build
              Your Skills and Join a Thriving Cyber Community.
            </Text>
          </MotionBox>

          <Flex gap={4} flexDirection={{ base: 'column', sm: 'row' }} width={{ base: '100%', sm: 'auto' }}>
            <NextLink href="/signup" passHref>
              <MotionButton
                as="a"
                bg="goldenrod"
                color="white"
                size="lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                fontWeight="bold"
                _hover={{ bg: 'yellow.600' }}
                rightIcon={<FaArrowRight />}
                width={{ base: '100%', sm: 'auto' }}
              >
                Get Started
              </MotionButton>
            </NextLink>

            <MotionButton
              variant="outline"
              size="lg"
              leftIcon={<FaPlayCircle />}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              borderColor="white"
              fontWeight="bold"
              _hover={{ bg: 'whiteAlpha.200' }}
              width={{ base: '100%', sm: 'auto' }}
              onClick={onOpen}
            >
              Watch Video
            </MotionButton>
          </Flex>
        </Flex>
      </Container>

      <MotionBox
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        height="150px"
        bgGradient="linear(to-t, rgba(0,0,0,0.7), transparent)"
      />

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.300" />
        <MotionModalContent
          bg="gray.900"
          border="1px"
          borderColor="gray.700"
          borderRadius="xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <MotionBox
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgGradient="linear(to-br, rgba(20, 184, 166, 0.1), rgba(30, 64, 175, 0.1))"
            borderRadius="xl"
            zIndex={-1}
          />
          <ModalHeader color="white">Watch Our Introduction Video</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <Box
              as="iframe"
              width="100%"
              height="315px"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              borderRadius="md"
              boxShadow="xl"
            />
          </ModalBody>
        </MotionModalContent>
      </Modal>
    </MotionBox>
  );
};

export default HeroSection;
