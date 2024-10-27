import { Box, Heading, SimpleGrid, Flex, Text, Button, Image, Container, useColorModeValue, Icon, VStack } from '@chakra-ui/react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { FaHandshake, FaArrowRight } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);
const MotionContainer = motion(Container);

const JobPlacementPartnershipsSection = () => {
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

  // Example partner companies with logos or placeholder images
  const partners = [
    { name: 'CyberTech Solutions', logo: 'https://cdn-icons-png.flaticon.com/512/2716/2716612.png' },
    { name: 'SecureNet Inc.', logo: 'https://cdn-icons-png.flaticon.com/512/2716/2716614.png' },
    { name: 'InfoGuard', logo: 'https://cdn-icons-png.flaticon.com/512/6195/6195699.png' },
    { name: 'ShieldCyber', logo: 'https://cdn-icons-png.flaticon.com/512/2092/2092663.png' },
    { name: 'DefensePro', logo: 'https://cdn-icons-png.flaticon.com/512/1067/1067566.png' },
    { name: 'GlobalSecure', logo: 'https://cdn-icons-png.flaticon.com/512/2716/2716652.png' },
  ];

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('teal.700', 'teal.300');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const cardBg = useColorModeValue('white', 'gray.800');
  const glowColor = useColorModeValue('rgba(49, 151, 149, 0.2)', 'rgba(129, 230, 217, 0.2)');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <Box bg={bgColor} py={20} px={8} position="relative" overflow="hidden" ref={ref}>
      <MotionBox
        position="absolute"
        top="-50%"
        left="-20%"
        width="140%"
        height="200%"
        bg="linear-gradient(45deg, rgba(49, 151, 149, 0.1) 0%, rgba(129, 230, 217, 0.1) 100%)"
        style={{ borderRadius: "50%" }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 50,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <MotionContainer maxW="7xl" initial="hidden" animate={controls} variants={containerVariants}>
        <VStack spacing={8} align="center">
          <MotionFlex align="center" variants={itemVariants}>
            <Icon as={FaHandshake} w={10} h={10} color="teal.500" mr={4} />
            <MotionHeading
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              bgGradient="linear(to-r, teal.400, teal.600)"
              bgClip="text"
            >
              Trusted Job Placement Partners
            </MotionHeading>
          </MotionFlex>

          <MotionText
            fontSize={{ base: "lg", md: "xl" }}
            color={textColor}
            maxW="3xl"
            textAlign="center"
            variants={itemVariants}
          >
            Our job placement partners are committed to helping our mentees succeed by providing career opportunities in cybersecurity. Join a network of esteemed companies and launch your career in the industry.
          </MotionText>

          <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing={8} w="full" mb={12}>
            {partners.map((partner, index) => (
              <MotionBox
                key={index}
                p={6}
                bg={cardBg}
                borderRadius="xl"
                boxShadow="xl"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: `0 20px 30px ${glowColor}`,
                }}
                initial="hidden"
                animate="visible"
              >
                <Flex direction="column" align="center" position="relative">
                  <MotionBox
                    position="absolute"
                    top="-20%"
                    left="-20%"
                    right="-20%"
                    bottom="-20%"
                    bg={`radial-gradient(circle, ${glowColor} 0%, rgba(0,0,0,0) 70%)`}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <Image 
                    src={partner.logo} 
                    alt={partner.name} 
                    boxSize="70px" 
                    mb={4}
                    transition="transform 0.3s ease"
                    _hover={{ transform: 'rotate(5deg)' }}
                  />
                  <Text 
                    fontSize="md" 
                    fontWeight="bold" 
                    color={headingColor}
                    textAlign="center"
                  >
                    {partner.name}
                  </Text>
                </Flex>
              </MotionBox>
            ))}
          </SimpleGrid>

          <MotionBox variants={itemVariants}>
            <Button
              colorScheme="teal"
              size="lg"
              fontSize="xl"
              px={8}
              py={6}
              rightIcon={<FaArrowRight />}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'xl',
              }}
              transition="all 0.3s ease"
            >
              Become a Partner
            </Button>
          </MotionBox>
        </VStack>
      </MotionContainer>
    </Box>
  );
};

export default JobPlacementPartnershipsSection;
