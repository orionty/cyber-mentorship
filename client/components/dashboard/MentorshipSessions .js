import {
  Box,
  Flex,
  Text,
  Icon,
  Badge,
  Button,
  SimpleGrid,
  HStack,
  VStack,
  Heading,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Tooltip,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  ModalFooter,
  Divider,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaVideo,
  FaRedo,
  FaClock,
  FaGraduationCap,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideoSlash,
  FaExclamationCircle,
  FaComments,
  FaLink,
} from "react-icons/fa";
import { useState } from "react";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const MentorshipSessions = () => {
  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onClose: onDetailsClose,
  } = useDisclosure();
  const {
    isOpen: isJoinOpen,
    onOpen: onJoinOpen,
    onClose: onJoinClose,
  } = useDisclosure();
  const {
    isOpen: isRescheduleOpen,
    onOpen: onRescheduleOpen,
    onClose: onRescheduleClose,
  } = useDisclosure();

  const [selectedSession, setSelectedSession] = useState(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const toast = useToast();

  // Sample Sessions Data
  const sessions = [
    {
      id: 1,
      title: "Cybersecurity Fundamentals",
      mentor: "Alice Johnson",
      date: "2024-11-10",
      time: "10:00 AM",
      status: "Upcoming",
      description:
        "Learn the basics of cybersecurity including threat detection, prevention strategies, and best practices.",
      location: "Virtual Meeting Room 1",
      expertise: "Cybersecurity Expert",
    },
    {
      id: 2,
      title: "Advanced Threat Detection",
      mentor: "Bob Smith",
      date: "2024-11-15",
      time: "02:00 PM",
      status: "Upcoming",
      description:
        "Deep dive into advanced threat detection techniques and tools used in modern cybersecurity.",
      location: "Virtual Meeting Room 2",
      expertise: "Security Analyst",
    },
    {
      id: 3,
      title: "Network Security Basics",
      mentor: "Charlie Brown",
      date: "2024-11-01",
      time: "12:00 PM",
      status: "Completed",
      description:
        "Introduction to network security concepts and implementation strategies.",
      location: "Virtual Meeting Room 3",
      expertise: "Network Security Specialist",
    },
    {
      id: 4,
      title: "Data Protection Laws",
      mentor: "Diana Prince",
      date: "2024-11-05",
      time: "04:00 PM",
      status: "Completed",
      description:
        "Overview of international data protection laws and compliance requirements.",
      location: "Virtual Meeting Room 4",
      expertise: "Legal Consultant",
    },
  ];

  const [filter, setFilter] = useState("All");
  const bgColor = useColorModeValue("white", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const modalBg = useColorModeValue("white", "gray.800");

  const filteredSessions = sessions.filter((session) =>
    filter === "All" ? true : session.status === filter
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.2,
      },
    },
  };

  const handleJoinSession = (session) => {
    setSelectedSession(session);
    onJoinOpen();
  };

  const handleReschedule = (session) => {
    setSelectedSession(session);
    onRescheduleOpen();
  };

  const handleViewDetails = (session) => {
    setSelectedSession(session);
    onDetailsOpen();
  };

  const joinSession = () => {
    toast({
      title: "Session Joined",
      description: "You have successfully joined the mentorship session.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onJoinClose();
  };

  const submitReschedule = () => {
    toast({
      title: "Reschedule Requested",
      description: "Your reschedule request has been submitted successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    onRescheduleClose();
  };

  return (
    <Box
      p={{ base: 4, md: 6, lg: 8 }}
      ml={{ base: "60px", sm: "70px", md: "160px" }}
      mr={{ base: 2, sm: 3, md: 4 }}
      my={{ base: 2, sm: 3, md: 4 }}
      bg={bgColor}
      minH="100vh"
      borderRadius="xl"
      overflowX="hidden"
      boxShadow="sm"
    >
      <MotionFlex
        direction="column"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Flex align="center" mb={6}>
          <Icon as={FaGraduationCap} w={8} h={8} color="teal.500" mr={3} />
          <Heading
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
            fontWeight="bold"
            bgGradient="linear(to-r, teal.400, blue.500, purple.500)"
            bgClip="text"
          >
            Mentorship Sessions
          </Heading>
        </Flex>

        <HStack
          spacing={4}
          mb={8}
          flexWrap="wrap"
          bg={cardBg}
          p={4}
          borderRadius="lg"
          boxShadow="md"
        >
          {["All", "Upcoming", "Completed"].map((status) => (
            <Button
              key={status}
              size="md"
              variant={filter === status ? "solid" : "outline"}
              colorScheme="teal"
              onClick={() => setFilter(status)}
              _hover={{ transform: "translateY(-2px)", shadow: "lg" }}
              transition="all 0.3s"
            >
              {status}
            </Button>
          ))}
        </HStack>
      </MotionFlex>

      <AnimatePresence>
        <SimpleGrid
          columns={{ base: 1, lg: 2, xl: 3 }}
          spacing={6}
          as={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredSessions.map((session, index) => (
            <MotionBox
              key={session.id}
              variants={cardVariants}
              whileHover="hover"
              p={6}
              bg={cardBg}
              borderRadius="2xl"
              boxShadow="lg"
              position="relative"
              overflow="hidden"
              _before={{
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "4px",
                bgGradient: "linear(to-r, teal.400, blue.500, purple.500)",
              }}
            >
              <Flex justify="space-between" align="center" mb={4}>
                <Text
                  fontSize="xl"
                  fontWeight="bold"
                  color={textColor}
                  _hover={{ color: "teal.500" }}
                  transition="color 0.2s"
                >
                  {session.title}
                </Text>
                <Badge
                  px={3}
                  py={1}
                  borderRadius="full"
                  colorScheme={session.status === "Upcoming" ? "blue" : "green"}
                  textTransform="uppercase"
                  fontSize="xs"
                  fontWeight="bold"
                  boxShadow="sm"
                >
                  {session.status}
                </Badge>
              </Flex>

              <VStack align="stretch" spacing={4}>
                <Flex align="center" bg="gray.50" p={2} borderRadius="md">
                  <Icon
                    as={FaChalkboardTeacher}
                    color="teal.500"
                    mr={3}
                    w={5}
                    h={5}
                  />
                  <Text fontSize="md" color={textColor}>
                    {session.mentor}
                  </Text>
                </Flex>

                <Flex align="center" bg="gray.50" p={2} borderRadius="md">
                  <Icon as={FaClock} color="teal.500" mr={3} w={5} h={5} />
                  <Text fontSize="md" color={textColor}>
                    {session.date} at {session.time}
                  </Text>
                </Flex>
              </VStack>

              <HStack spacing={4} mt={6}>
                {session.status === "Upcoming" && (
                  <>
                    <Button
                      size="md"
                      colorScheme="teal"
                      leftIcon={<FaVideo />}
                      onClick={() => handleJoinSession(session)}
                      flex={1}
                      _hover={{
                        transform: "translateY(-2px)",
                        shadow: "lg",
                        bg: "teal.500",
                      }}
                      transition="all 0.3s"
                      whiteSpace="nowrap"
                    >
                      Join Now
                    </Button>
                    <Button
                      size="md"
                      colorScheme="orange"
                      leftIcon={<FaRedo />}
                      onClick={() => handleReschedule(session)}
                      flex={1}
                      _hover={{
                        transform: "translateY(-2px)",
                        shadow: "lg",
                        bg: "orange.500",
                      }}
                      transition="all 0.3s"
                      whiteSpace="nowrap"
                    >
                      Reschedule
                    </Button>
                  </>
                )}
                <Button
                  size="md"
                  variant="outline"
                  colorScheme="teal"
                  leftIcon={<FaCalendarAlt />}
                  onClick={() => handleViewDetails(session)}
                  flex={session.status === "Completed" ? 1 : undefined}
                  _hover={{
                    transform: "translateY(-2px)",
                    bg: "teal.50",
                    shadow: "lg",
                  }}
                  transition="all 0.3s"
                  whiteSpace="nowrap"
                >
                  Details
                </Button>
              </HStack>
            </MotionBox>
          ))}
        </SimpleGrid>
      </AnimatePresence>

      {/* Join Session Modal */}
      <Modal isOpen={isJoinOpen} onClose={onJoinClose} size="xl">
        <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.600" />
        <ModalContent
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          bg={modalBg}
          borderRadius="xl"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h="4px"
            bgGradient="linear(to-r, teal.400, blue.500, purple.500)"
          />
          <ModalHeader>
            <Heading
              size="lg"
              bgGradient="linear(to-r, teal.400, blue.500)"
              bgClip="text"
            >
              Join Mentorship Session
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6}>
              <Box
                w="full"
                h="200px"
                bg="gray.100"
                borderRadius="lg"
                position="relative"
                overflow="hidden"
              >
                <Flex
                  position="absolute"
                  bottom={4}
                  left={4}
                  right={4}
                  justify="center"
                  gap={4}
                >
                  <Tooltip label={audioEnabled ? "Mute Audio" : "Unmute Audio"}>
                    <IconButton
                      icon={
                        audioEnabled ? <FaMicrophone /> : <FaMicrophoneSlash />
                      }
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      colorScheme={audioEnabled ? "teal" : "red"}
                      variant="solid"
                      isRound
                      size="lg"
                    />
                  </Tooltip>
                  <Tooltip
                    label={videoEnabled ? "Turn Off Video" : "Turn On Video"}
                  >
                    <IconButton
                      icon={videoEnabled ? <FaVideo /> : <FaVideoSlash />}
                      onClick={() => setVideoEnabled(!videoEnabled)}
                      colorScheme={videoEnabled ? "teal" : "red"}
                      variant="solid"
                      isRound
                      size="lg"
                    />
                  </Tooltip>
                </Flex>
              </Box>

              <VStack spacing={4} w="full">
                <Flex
                  w="full"
                  bg="gray.50"
                  p={4}
                  borderRadius="lg"
                  align="center"
                >
                  <Icon
                    as={FaUserGraduate}
                    color="teal.500"
                    boxSize={5}
                    mr={3}
                  />
                  <Box flex={1}>
                    <Text fontWeight="bold">{selectedSession?.mentor}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {selectedSession?.expertise}
                    </Text>
                  </Box>
                </Flex>

                <HStack spacing={4} w="full">
                  <Button
                    leftIcon={<FaComments />}
                    colorScheme="blue"
                    variant="outline"
                    flex={1}
                  >
                    Open Chat
                  </Button>
                  <Button
                    leftIcon={<FaLink />}
                    colorScheme="purple"
                    variant="outline"
                    flex={1}
                  >
                    Share Link
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          </ModalBody>

          <ModalFooter bg="gray.50" borderTopWidth="1px">
            <Button
              colorScheme="red"
              mr={3}
              onClick={onJoinClose}
              leftIcon={<FaExclamationCircle />}
            >
              Leave
            </Button>
            <Button
              colorScheme="teal"
              onClick={joinSession}
              leftIcon={<FaVideo />}
              _hover={{
                transform: "translateY(-2px)",
                shadow: "lg",
              }}
              transition="all 0.3s"
            >
              Join Session
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Reschedule Modal */}
      <Modal isOpen={isRescheduleOpen} onClose={onRescheduleClose} size="xl">
        <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.600" />
        <ModalContent
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          bg={modalBg}
          borderRadius="xl"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h="4px"
            bgGradient="linear(to-r, orange.400, red.500)"
          />
          <ModalHeader>
            <Heading
              size="lg"
              bgGradient="linear(to-r, orange.400, red.500)"
              bgClip="text"
            >
              Reschedule Session
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={6}>
              <FormControl>
                <FormLabel>Preferred Date</FormLabel>
                <Input type="date" />
              </FormControl>

              <FormControl>
                <FormLabel>Preferred Time</FormLabel>
                <Select placeholder="Select time slot">
                  <option>09:00 AM - 10:00 AM</option>
                  <option>10:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 12:00 PM</option>
                  <option>02:00 PM - 03:00 PM</option>
                  <option>03:00 PM - 04:00 PM</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Reason for Rescheduling</FormLabel>
                <Textarea
                  placeholder="Please provide a brief reason for rescheduling..."
                  resize="vertical"
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter bg="gray.50" borderTopWidth="1px">
            <Button mr={3} onClick={onRescheduleClose}>
              Cancel
            </Button>
            <Button
              colorScheme="orange"
              onClick={submitReschedule}
              leftIcon={<FaCalendarAlt />}
              _hover={{
                transform: "translateY(-2px)",
                shadow: "lg",
              }}
              transition="all 0.3s"
            >
              Submit Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={onDetailsClose} size="lg">
        <ModalOverlay backdropFilter="blur(10px)" bg="blackAlpha.700" />
        <ModalContent
          as={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          bg={modalBg}
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="2xl"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            h="6px"
            bgGradient="linear(to-r, teal.400, blue.500, purple.600)"
          />
          <ModalHeader>
            <Heading
              size="lg"
              bgGradient="linear(to-r, teal.400, blue.500, purple.600)"
              bgClip="text"
            >
              Session Details
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4} align="start">
              <Text fontWeight="bold" fontSize="2xl" color="teal.600">
                {selectedSession?.title}
              </Text>
              <Text color="gray.500" fontSize="md">
                {selectedSession?.description}
              </Text>
              <Divider borderColor="gray.300" />
              <Text>
                <strong>Mentor:</strong> {selectedSession?.mentor}
              </Text>
              <Text>
                <strong>Expertise:</strong> {selectedSession?.expertise}
              </Text>
              <Text>
                <strong>Date:</strong> {selectedSession?.date}
              </Text>
              <Text>
                <strong>Time:</strong> {selectedSession?.time}
              </Text>
              <Text>
                <strong>Location:</strong> {selectedSession?.location}
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter bg="gray.100" borderTopWidth="1px">
            <Button
              onClick={onDetailsClose}
              colorScheme="teal"
              variant="outline"
              _hover={{ bg: "teal.100" }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MentorshipSessions;
