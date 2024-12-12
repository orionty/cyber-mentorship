import { useState, useEffect } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  SimpleGrid, 
  Flex, 
  Image, 
  Container,
  Badge,
  useColorModeValue,
  Icon,
  Center
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUserTie, 
  FaGraduationCap, 
  FaBriefcase, 
  FaAward 
} from 'react-icons/fa';

// Create motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

// Wrap the component to prevent hydration issues
const CountingNumber = ({ value, ...props }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return <Text {...props}>{value}+</Text>;
};

const AboutSection = () => {
  const [counts, setCounts] = useState({
    mentors: 0,
    mentees: 0,
    jobs: 0,
    success: 0
  });

  // Color mode values
  const bgGradient = useColorModeValue(
    'linear(to-b, gray.50, white)',
    'linear(to-b, gray.900, gray.800)'
  );
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const headingColor = useColorModeValue('gray.900', 'white');

  useEffect(() => {
    const incrementCount = (key, target, duration = 2000) => {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCounts(prevCounts => ({
          ...prevCounts,
          [key]: Math.floor(progress * target)
        }));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    };

    // Start counting animation
    incrementCount('mentors', 200);
    incrementCount('mentees', 500);
    incrementCount('jobs', 150);
    incrementCount('success', 300);
  }, []);

  const statItems = [
    { 
      icon: FaUserTie, 
      label: 'Expert Mentors', 
      count: counts.mentors,
      gradient: 'linear(to-r, teal.400, teal.600)'
    },
    { 
      icon: FaGraduationCap, 
      label: 'Active Mentees', 
      count: counts.mentees,
      gradient: 'linear(to-r, cyan.400, blue.600)'
    },
    { 
      icon: FaBriefcase, 
      label: 'Job Placements', 
      count: counts.jobs,
      gradient: 'linear(to-r, purple.400, pink.600)'
    },
    { 
      icon: FaAward, 
      label: 'Success Stories', 
      count: counts.success,
      gradient: 'linear(to-r, orange.400, red.600)'
    }
  ];

  return (
    <AnimatePresence>
      <MotionBox
        w="full"
        py={{ base: 16, md: 24 }}
        bgGradient={bgGradient}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container maxW="container.xl" px={{ base: 4, sm: 6, lg: 8 }}>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align={{ base: 'center', lg: 'flex-start' }}
            justify="space-between"
            gap={12}
          >
            {/* Left Content Section */}
            <Box flex="1" w="full">
              <Flex direction="column" gap={8} align={{ base: 'center', lg: 'flex-start' }}>
                <Box textAlign={{ base: 'center', lg: 'left' }}>
                  <Badge
                    mb={4}
                    px={4}
                    py={1}
                    colorScheme="teal"
                    rounded="full"
                    textTransform="none"
                    fontSize="sm"
                  >
                    About Us
                  </Badge>
                  <Heading
                    as="h2"
                    fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
                    fontWeight="bold"
                    color={headingColor}
                    lineHeight="tight"
                    mb={4}
                  >
                    Welcome to{' '}
                    <Text
                      as="span"
                      bgGradient="linear(to-r, teal.500, cyan.600)"
                      bgClip="text"
                    >
                      Cyber1Mentorship
                    </Text>
                  </Heading>
                  <Text
                    fontSize={{ base: 'lg', md: 'xl' }}
                    color={textColor}
                    lineHeight="tall"
                  >
                    Cyber1Mentorship is committed to empowering future cybersecurity
                    professionals by connecting them with industry-leading mentors, offering
                    hands-on learning opportunities, and providing resources for career
                    advancement.
                  </Text>
                </Box>

                <Box
                  position="relative"
                  overflow="hidden"
                  rounded="2xl"
                  shadow="2xl"
                  maxW={{ base: '100%', lg: '500px' }}
                >
                  <Box
                    position="absolute"
                    inset="0"
                    bgGradient="linear(to-r, teal.500, cyan.500)"
                    opacity={0.1}
                  />
                  <Image
                    src="/images/about-cybersecurity.jpg"
                    alt="Cybersecurity Mentorship"
                    w="full"
                    h="auto"
                    objectFit="cover"
                    transition="transform 0.3s ease"
                    _hover={{ transform: 'scale(1.05)' }}
                  />
                </Box>
              </Flex>
            </Box>

            {/* Right Stats Grid */}
            <Box flex="1" w="full">
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
                {statItems.map((item, index) => (
                  <MotionFlex
                    key={item.label}
                    direction="column"
                    bg={cardBg}
                    p={6}
                    rounded="xl"
                    shadow="lg"
                    position="relative"
                    role="group"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    cursor="pointer"
                  >
                    <Box
                      position="absolute"
                      inset="0"
                      bgGradient={item.gradient}
                      opacity={0}
                      transition="opacity 0.3s"
                      _groupHover={{ opacity: 0.05 }}
                      rounded="xl"
                    />
                    <Center>
                      <Box
                        w={12}
                        h={12}
                        mb={4}
                        rounded="lg"
                        bgGradient={item.gradient}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Icon as={item.icon} boxSize={6} color="white" />
                      </Box>
                    </Center>
                    <CountingNumber
                      value={item.count}
                      fontSize="4xl"
                      fontWeight="bold"
                      color={headingColor}
                      textAlign="center"
                    />
                    <Text
                      fontSize="lg"
                      fontWeight="medium"
                      color={textColor}
                      mt={2}
                      textAlign="center"
                    >
                      {item.label}
                    </Text>
                  </MotionFlex>
                ))}
              </SimpleGrid>
            </Box>
          </Flex>
        </Container>
      </MotionBox>
    </AnimatePresence>
  );
};

export default AboutSection;