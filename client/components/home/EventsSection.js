import { Box, Heading, Text, Button, SimpleGrid, Flex, Container, useColorModeValue, Icon, VStack, Badge, Tooltip, IconButton } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaUsers, FaArrowRight, FaBell, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionBadge = motion(Badge);

const EventCard = ({ title, date, time, description }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const cardBg = useColorModeValue('white', 'gray.800');
  const titleColor = useColorModeValue('teal.700', 'teal.300');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const timeColor = useColorModeValue('teal.500', 'teal.200');
  const iconColor = useColorModeValue('teal.500', 'teal.300');
  const glowColor = useColorModeValue('rgba(49, 151, 149, 0.2)', 'rgba(129, 230, 217, 0.2)');

  useEffect(() => {
    const eventDate = new Date(date + ' ' + time);
    const updateCountdown = () => {
      const now = new Date();
      const difference = eventDate - now;

      if (difference <= 0) {
        setTimeLeft('Event Started');
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    };

    updateCountdown();
    const timerId = setInterval(updateCountdown, 1000);
    return () => clearInterval(timerId);
  }, [date, time]);

  return (
    <MotionBox
      p={8}
      bg={cardBg}
      boxShadow="2xl"
      borderRadius="2xl"
      height="500px"
      display="flex"
      flexDirection="column"
      position="relative"
      overflow="hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05,
        boxShadow: `0 20px 30px ${glowColor}`,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        duration: 0.4
      }}
    >
      <MotionBox
        position="absolute"
        top="-50%"
        left="-50%"
        width="200%"
        height="200%"
        background={`radial-gradient(circle, ${glowColor} 0%, rgba(0,0,0,0) 70%)`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <VStack spacing={4} flex="1" justify="space-between" position="relative">
        <VStack spacing={4}>
          <MotionFlex 
            align="center" 
            justify="center"
            direction="column"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <MotionBadge
              colorScheme="teal"
              mb={2}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              Featured Event
            </MotionBadge>

            <Heading 
              fontSize="2xl" 
              fontWeight="bold" 
              color={titleColor} 
              mb={3}
              textAlign="center"
              bgGradient="linear(to-r, teal.400, teal.600)"
              bgClip="text"
            >
              {title}
            </Heading>
            
            <Tooltip label="Event Date" placement="top">
              <Flex align="center" mb={2}>
                <Icon as={FaCalendarAlt} color={iconColor} mr={2} />
                <Text fontSize="md" color={textColor}>{date}</Text>
              </Flex>
            </Tooltip>
            
            <Tooltip label="Event Time" placement="top">
              <Flex align="center" mb={4}>
                <Icon as={FaClock} color={iconColor} mr={2} />
                <Text fontSize="md" color={textColor}>{time}</Text>
              </Flex>
            </Tooltip>

            <MotionText
              fontSize="xl"
              color={timeColor}
              fontWeight="bold"
              textAlign="center"
              animate={{
                scale: [1, 1.05, 1],
                textShadow: [
                  "0 0 0px rgba(49, 151, 149, 0.5)",
                  "0 0 10px rgba(49, 151, 149, 0.8)",
                  "0 0 0px rgba(49, 151, 149, 0.5)"
                ],
                transition: { 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            >
              {timeLeft}
            </MotionText>
          </MotionFlex>

          <Text 
            fontSize="md" 
            color={textColor} 
            textAlign="center"
            lineHeight="tall"
          >
            {description}
          </Text>
        </VStack>

        <Flex direction="column" width="full" gap={2}>
          <Button
            colorScheme="teal"
            size="lg"
            width="full"
            rightIcon={<FaUsers />}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            transition="all 0.2s"
          >
            Register Now
          </Button>
          <Button
            variant="outline"
            colorScheme="teal"
            size="sm"
            width="full"
            rightIcon={<FaBell />}
            _hover={{
              transform: 'translateY(-2px)',
            }}
            transition="all 0.2s"
          >
            Set Reminder
          </Button>
        </Flex>
      </VStack>
    </MotionBox>
  );
};

const UpcomingEventsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('teal.700', 'teal.300');

  const events = [
    {
      title: 'Cybersecurity Essentials Webinar',
      date: '2024-11-15',
      time: '15:00',
      description: 'An introductory webinar covering fundamental cybersecurity practices and essential defense mechanisms. Join industry experts for an engaging session!',
    },
    {
      title: 'Advanced Threat Detection Workshop',
      date: '2024-12-05',
      time: '10:00',
      description: 'A hands-on workshop exploring the latest threat detection techniques and tools. Perfect for security professionals looking to enhance their skills.',
    },
    {
      title: 'Networking and Career Fair',
      date: '2024-12-20',
      time: '14:00',
      description: 'Meet industry experts and explore career opportunities in cybersecurity. Connect with leading companies and discover your next career move!',
    },
    {
      title: 'Ethical Hacking Masterclass',
      date: '2025-01-10',
      time: '13:00',
      description: 'Learn advanced ethical hacking techniques from industry experts. Hands-on practice with real-world scenarios and cutting-edge tools.',
    },
    {
      title: 'Cloud Security Summit',
      date: '2025-01-25',
      time: '09:00',
      description: 'Deep dive into cloud security best practices, featuring talks from leading cloud security professionals and hands-on workshops.',
    },
    {
      title: 'Security Automation Conference',
      date: '2025-02-15',
      time: '11:00',
      description: 'Explore the latest in security automation and orchestration. Learn how to streamline your security operations with modern tools and techniques.',
    }
  ];

  const eventsPerPage = 3;
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentEvents = events.slice(
    currentPage * eventsPerPage,
    (currentPage + 1) * eventsPerPage
  );

  return (
    <Box bg={bgColor} py={20} px={8}>
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <MotionHeading
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="extrabold"
            bgGradient="linear(to-r, teal.400, teal.600)"
            bgClip="text"
            textAlign="center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            _hover={{
              bgGradient: "linear(to-r, teal.600, teal.400)",
              transition: "all 0.3s ease"
            }}
          >
            Upcoming Events and Webinars
          </MotionHeading>

          <MotionBox
            width="100px"
            height="4px"
            bgGradient="linear(to-r, teal.400, teal.600)"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            _hover={{
              width: "150px",
              transition: "all 0.3s ease"
            }}
          />

          <Box position="relative" width="100%">
            <AnimatePresence mode="wait">
              <SimpleGrid 
                columns={{ base: 1, md: 2, lg: 3 }} 
                spacing={10}
                width="100%"
                key={currentPage}
              >
                {currentEvents.map((event, index) => (
                  <MotionBox
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <EventCard {...event} />
                  </MotionBox>
                ))}
              </SimpleGrid>
            </AnimatePresence>

            <Flex justify="center" mt={8} gap={4}>
              <IconButton
                onClick={prevPage}
                icon={<FaChevronLeft />}
                colorScheme="teal"
                variant="outline"
                aria-label="Previous page"
                isDisabled={currentPage === 0}
              />
              <IconButton
                onClick={nextPage}
                icon={<FaChevronRight />}
                colorScheme="teal"
                aria-label="Next page"
                isDisabled={currentPage === totalPages - 1}
              />
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default UpcomingEventsSection;
