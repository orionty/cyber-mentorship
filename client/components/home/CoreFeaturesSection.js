import { Box, Heading, Text, SimpleGrid, Flex, Container, useColorModeValue } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaChalkboardTeacher,
  FaBell,
  FaBriefcase,
  FaTasks,
  FaLock,
  FaChartLine,
} from 'react-icons/fa';
import { useEffect } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);

const CoreFeaturesSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Data for the core features
  const features = [
    {
      icon: FaChalkboardTeacher,
      title: 'Personalized Mentorship',
      description: 'Get one-on-one guidance from experienced mentors in the cybersecurity field.',
    },
    {
      icon: FaBell,
      title: 'Real-Time Notifications',
      description: 'Stay updated with task alerts, session reminders, and mentorship updates.',
    },
    {
      icon: FaBriefcase,
      title: 'Job Placement Assistance',
      description: 'Connect with leading companies and find job opportunities tailored to your skills.',
    },
    {
      icon: FaTasks,
      title: 'Task Management',
      description: 'Organize your learning journey with personalized tasks and assignments.',
    },
    {
      icon: FaLock,
      title: 'Secure Data',
      description: 'Benefit from strong security measures to protect your data and privacy.',
    },
    {
      icon: FaChartLine,
      title: 'Progress Tracking',
      description: 'Monitor your progress and milestones as you advance through your mentorship journey.',
    },
  ];

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('teal.600', 'teal.300');
  const iconColor = useColorModeValue('teal.500', 'teal.300');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Box bg={bgColor} py={20} px={8}>
      <Container maxW="container.xl">
        <MotionHeading
          fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
          fontWeight="bold"
          color={headingColor}
          mb={16}
          textAlign="center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Core Features of Cyber1Mentorship
        </MotionHeading>
        <MotionBox
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {features.map((feature, index) => (
              <MotionFlex
                key={index}
                direction="column"
                align="center"
                justify="center"
                bg={cardBgColor}
                p={8}
                borderRadius="xl"
                boxShadow="xl"
                height="100%"
                position="relative"
                overflow="hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.05, boxShadow: '2xl' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Box
                  position="absolute"
                  top="-20px"
                  left="-20px"
                  bg={iconColor}
                  opacity={0.1}
                  borderRadius="full"
                  width="100px"
                  height="100px"
                />
                <Box as={feature.icon} size="50px" color={iconColor} mb={6} zIndex={1} />
                <MotionText
                  fontSize="2xl"
                  fontWeight="bold"
                  mb={4}
                  color={headingColor}
                  textAlign="center"
                >
                  {feature.title}
                </MotionText>
                <MotionText fontSize="md" color={textColor} textAlign="center">
                  {feature.description}
                </MotionText>
              </MotionFlex>
            ))}
          </SimpleGrid>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default CoreFeaturesSection;
