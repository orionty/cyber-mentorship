import { Box, Heading, Text, SimpleGrid, Flex, Container, useColorModeValue, VStack, Badge, Icon, Button } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaUserGraduate, FaChalkboardTeacher, FaArrowRight } from 'react-icons/fa';
import { useEffect } from 'react';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionBadge = motion(Badge);

const MentorshipProgramsSection = () => {
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

  // Data for the programs
  const programs = [
    {
      level: 'Beginner Program',
      duration: '3 Months',
      description: 'Get introduced to the basics of cybersecurity and foundational skills.',
      icon: FaGraduationCap,
      highlights: ['Fundamentals of Cybersecurity', 'Network Basics', 'Security Best Practices'],
      color: 'blue',
      price: '$299'
    },
    {
      level: 'Intermediate Program', 
      duration: '6 Months',
      description: 'Build on your knowledge with practical skills and real-world projects.',
      icon: FaUserGraduate,
      highlights: ['Advanced Security Concepts', 'Hands-on Projects', 'Industry Certifications'],
      color: 'purple',
      price: '$499'
    },
    {
      level: 'Advanced Program',
      duration: '9 Months', 
      description: 'Master advanced topics and prepare for leadership roles in cybersecurity.',
      icon: FaChalkboardTeacher,
      highlights: ['Leadership Training', 'Specialized Skills', 'Career Development'],
      color: 'teal',
      price: '$799'
    },
  ];

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('teal.700', 'teal.300');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const buttonBgColor = useColorModeValue('teal.500', 'teal.300');
  const buttonHoverBgColor = useColorModeValue('teal.600', 'teal.400');

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const glowAnimation = {
    initial: { opacity: 0.5, scale: 1 },
    animate: {
      opacity: [0.5, 1, 0.5],
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Box bg={bgColor} py={20} px={8} position="relative" overflow="hidden">
      <MotionBox
        position="absolute"
        top="-50%"
        left="-20%"
        width="140%"
        height="200%"
        bg="linear-gradient(45deg, rgba(66, 153, 225, 0.1) 0%, rgba(129, 230, 217, 0.1) 100%)"
        style={{ borderRadius: "50%" }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <Container maxW="container.xl" position="relative">
        <VStack spacing={16}>
          <MotionHeading
            fontSize={{ base: '4xl', md: '5xl', lg: '6xl' }}
            fontWeight="extrabold"
            color={headingColor}
            textAlign="center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <MotionText
              display="inline-block"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Explore Our
            </MotionText>{' '}
            Mentorship Programs
            <MotionBox
              width="100px"
              height="4px"
              bg={headingColor}
              mx="auto"
              mt={4}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            />
          </MotionHeading>

          <MotionBox
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            w="100%"
          >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
              {programs.map((program, index) => (
                <MotionBox
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '2xl',
                    transition: { duration: 0.3 }
                  }}
                >
                  <Flex
                    direction="column"
                    bg={cardBgColor}
                    p={8}
                    borderRadius="xl"
                    boxShadow="xl"
                    height="100%"
                    position="relative"
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor={`${program.color}.200`}
                  >
                    <MotionBox
                      position="absolute"
                      top={0}
                      right={0}
                      width="150px"
                      height="150px"
                      bg={`${program.color}.50`}
                      opacity={0.2}
                      borderBottomLeftRadius="100%"
                      variants={glowAnimation}
                      initial="initial"
                      animate="animate"
                    />
                    
                    <Box>
                      <Icon
                        as={program.icon}
                        w={12}
                        h={12}
                        color={`${program.color}.500`}
                        mb={4}
                      />
                    </Box>
                    
                    <MotionBadge
                      colorScheme={program.color}
                      alignSelf="flex-start"
                      mb={2}
                      fontSize="sm"
                      px={3}
                      py={1}
                      borderRadius="full"
                      whileHover={{ scale: 1.1 }}
                    >
                      {program.duration}
                    </MotionBadge>

                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color={headingColor}
                      mb={4}
                    >
                      {program.level}
                    </Text>

                    <Text fontSize="md" color={textColor} mb={6}>
                      {program.description}
                    </Text>

                    <VStack align="start" spacing={3} mt="auto">
                      {program.highlights.map((highlight, i) => (
                        <MotionText
                          key={i}
                          color={textColor}
                          fontSize="sm"
                          display="flex"
                          alignItems="center"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Box
                            as="span"
                            w={2}
                            h={2}
                            borderRadius="full"
                            bg={`${program.color}.500`}
                            mr={2}
                          />
                          {highlight}
                        </MotionText>
                      ))}
                    </VStack>

                    <Text
                      fontSize="2xl"
                      fontWeight="bold"
                      color={`${program.color}.500`}
                      mt={6}
                      mb={4}
                      textAlign="center"
                    >
                      {program.price}
                    </Text>

                    <Button
                      colorScheme={program.color}
                      size="lg"
                      rightIcon={<FaArrowRight />}
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                      }}
                      transition="all 0.2s"
                    >
                      Get Started
                    </Button>
                  </Flex>
                </MotionBox>
              ))}
            </SimpleGrid>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default MentorshipProgramsSection;
