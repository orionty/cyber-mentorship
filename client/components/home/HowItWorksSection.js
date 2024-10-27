import { Box, Heading, Text, Flex, Container, useColorModeValue, VStack, HStack, Circle } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaUserPlus, FaUsersCog, FaTasks, FaChartLine } from 'react-icons/fa';
import { useEffect } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);

const HowItWorksSection = () => {
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

  // Steps Data
  const steps = [
    {
      icon: FaUserPlus,
      title: 'Sign Up',
      description: 'Create your account and set up your profile to start your journey.',
    },
    {
      icon: FaUsersCog,
      title: 'Match with a Mentor',
      description: 'Get paired with an experienced mentor in your area of interest.',
    },
    {
      icon: FaTasks,
      title: 'Complete Tasks',
      description: 'Engage in guided tasks and assignments to build your skills.',
    },
    {
      icon: FaChartLine,
      title: 'Track Your Progress',
      description: 'Monitor your milestones and achievements as you advance.',
    },
  ];

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('teal.700', 'teal.300');
  const iconBgColor = useColorModeValue('teal.500', 'teal.300');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const lineColor = useColorModeValue('teal.500', 'teal.300');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Box bg={bgColor} py={20} px={8} overflow="hidden">
      <Container maxW="container.xl">
        <MotionHeading
          fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
          fontWeight="extrabold"
          color={headingColor}
          mb={20}
          textAlign="center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <MotionBox
            display="inline-block"
            initial={{ rotate: -5 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            How It Works
          </MotionBox>
        </MotionHeading>
        <MotionBox
          width="100px"
          height="4px"
          bg={headingColor}
          mx="auto"
          mb={16}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        />
        <MotionBox
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <VStack spacing={12} align="stretch">
            {steps.map((step, index) => (
              <MotionFlex
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                bg={cardBgColor}
                p={6}
                rounded="xl"
                boxShadow="lg"
                position="relative"
              >
                <HStack spacing={8} width="100%" position="relative">
                  {index !== 0 && (
                    <Box
                      position="absolute"
                      top="-86px"
                      left="25px"
                      width="2px"
                      height="86px"
                      bg={lineColor}
                    />
                  )}
                  <Circle size="50px" bg={iconBgColor} color="white">
                    <Box as={step.icon} size="24px" />
                  </Circle>
                  <VStack align="start" spacing={2} flex={1}>
                    <MotionText
                      fontSize="2xl"
                      fontWeight="bold"
                      color={headingColor}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {step.title}
                    </MotionText>
                    <MotionText
                      fontSize="md"
                      color={textColor}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      {step.description}
                    </MotionText>
                  </VStack>
                </HStack>
              </MotionFlex>
            ))}
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
