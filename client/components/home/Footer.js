import { Box, Flex, Text, Link, Input, Button, VStack, HStack, Icon, useColorModeValue, Grid, GridItem, Divider, List, ListItem, Image, Container, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaYoutube, FaDiscord, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState } from 'react';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionText = motion(Text);
const MotionVStack = motion(VStack);
const MotionHStack = motion(HStack);
const MotionGrid = motion(Grid);
const MotionLink = motion(Link);

const Footer = () => {
  const [email, setEmail] = useState('');
  const bgGradient = useColorModeValue(
    'linear(to-b, teal.800, teal.900)',
    'linear(to-b, gray.900, black)'
  );
  
  const glowColor = useColorModeValue('rgba(49, 151, 149, 0.2)', 'rgba(129, 230, 217, 0.2)');
  const borderColor = useColorModeValue('whiteAlpha.300', 'whiteAlpha.200');

  const hoverAnimation = {
    scale: 1.05,
    transition: { duration: 0.2 }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <MotionBox
      bgGradient={bgGradient}
      color="white"
      position="relative"
      overflow="hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Animation */}
      <MotionBox
        position="absolute"
        top="-50%"
        left="-20%"
        width="140%"
        height="200%"
        bg={`radial-gradient(circle, ${glowColor} 0%, transparent 70%)`}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Main Footer Content */}
      <Container maxW="8xl" py={16} px={8} position="relative">
        <MotionGrid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap={8}
          mb={12}
          textAlign={{ base: 'center', md: 'left' }}
        >
          {/* Company Info */}
          <GridItem>
            <VStack align={{ base: 'center', md: 'flex-start' }} spacing={4}>
              <MotionText 
                fontSize="3xl" 
                fontWeight="bold"
                color="white"
                animate={{
                  textShadow: ["0 0 0px teal", "0 0 15px teal", "0 0 0px teal"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                CyberMentorship
              </MotionText>
              <Text fontSize="sm" color="gray.300" maxW="sm" lineHeight="tall">
                Empowering the next generation of cybersecurity professionals through mentorship and career guidance.
              </Text>
              <VStack align={{ base: 'center', md: 'flex-start' }} spacing={2}>
                <Flex align="center">
                  <Icon as={FaMapMarkerAlt} mr={2} color="teal.200" />
                  <Text fontSize="sm">123 Cyber Street, Tech Valley, CA 94043</Text>
                </Flex>
                <Flex align="center">
                  <Icon as={FaPhone} mr={2} color="teal.200" />
                  <Link href="tel:+1234567890">+1 (234) 567-890</Link>
                </Flex>
                <Flex align="center">
                  <Icon as={FaEnvelope} mr={2} color="teal.200" />
                  <Link href="mailto:contact@cybermentorship.com">contact@cybermentorship.com</Link>
                </Flex>
              </VStack>
            </VStack>
          </GridItem>

          {/* Services */}
          <GridItem>
            <VStack align={{ base: 'center', md: 'flex-start' }} spacing={4}>
              <Box position="relative">
                <Text fontSize="lg" fontWeight="bold" color="white">Our Services</Text>
                <Box 
                  position="absolute"
                  bottom="-2px"
                  left="0"
                  right="0"
                  height="2px"
                  bg="teal.200"
                  animate={{ width: ["0%", "100%"] }}
                  as={motion.div}
                  transition={{ duration: 0.5 }}
                />
              </Box>
              <List spacing={2}>
                {['Mentorship Programs', 'Career Guidance', 'Cybersecurity Training', 'Certification Prep', 'Job Placement', 'Industry Events'].map((service) => (
                  <ListItem key={service}>
                    <MotionLink 
                      href="#" 
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ duration: 0.2 }}
                      _hover={{ color: 'teal.200', textDecoration: 'none' }}
                    >
                      {service}
                    </MotionLink>
                  </ListItem>
                ))}
              </List>
            </VStack>
          </GridItem>

          {/* Resources */}
          <GridItem>
            <VStack align={{ base: 'center', md: 'flex-start' }} spacing={4}>
              <Box position="relative">
                <Text fontSize="lg" fontWeight="bold" color="white">Resources</Text>
                <Box 
                  position="absolute"
                  bottom="-2px"
                  left="0"
                  right="0"
                  height="2px"
                  bg="teal.200"
                  animate={{ width: ["0%", "100%"] }}
                  as={motion.div}
                  transition={{ duration: 0.5 }}
                />
              </Box>
              <List spacing={2}>
                {['Blog', 'Podcast', 'Webinars', 'Documentation', 'Community Forum', 'Support Center'].map((resource) => (
                  <ListItem key={resource}>
                    <MotionLink 
                      href="#" 
                      whileHover={{ scale: 1.05, x: 10 }}
                      transition={{ duration: 0.2 }}
                      _hover={{ color: 'teal.200', textDecoration: 'none' }}
                    >
                      {resource}
                    </MotionLink>
                  </ListItem>
                ))}
              </List>
            </VStack>
          </GridItem>

          {/* Newsletter */}
          <GridItem>
            <VStack align={{ base: 'center', md: 'flex-start' }} spacing={4}>
              <Box position="relative">
                <Text fontSize="lg" fontWeight="bold" color="white">Stay Connected</Text>
                <Box 
                  position="absolute"
                  bottom="-2px"
                  left="0"
                  right="0"
                  height="2px"
                  bg="teal.200"
                  animate={{ width: ["0%", "100%"] }}
                  as={motion.div}
                  transition={{ duration: 0.5 }}
                />
              </Box>
              <Text fontSize="sm">Join our newsletter for the latest updates and exclusive content.</Text>
              <form onSubmit={handleSubscribe} style={{ width: '100%' }}>
                <VStack spacing={3} width="100%">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    bg="whiteAlpha.100"
                    color="white"
                    _placeholder={{ color: "gray.400" }}
                    borderRadius="md"
                    _hover={{ bg: 'whiteAlpha.200' }}
                    _focus={{ borderColor: 'teal.300', boxShadow: '0 0 0 1px teal.300' }}
                  />
                  <Button
                    type="submit"
                    w="100%"
                    colorScheme="teal"
                    rightIcon={<FaEnvelope />}
                    _hover={{ transform: 'translateY(-2px)' }}
                  >
                    Subscribe
                  </Button>
                </VStack>
              </form>
              
              <HStack spacing={4} mt={4}>
                {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub, FaYoutube, FaDiscord].map((SocialIcon, index) => (
                  <MotionBox
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Link href="#" isExternal>
                      <Icon 
                        as={SocialIcon} 
                        boxSize={5} 
                        color="gray.300" 
                        _hover={{ color: 'teal.200' }}
                      />
                    </Link>
                  </MotionBox>
                ))}
              </HStack>
            </VStack>
          </GridItem>
        </MotionGrid>

        <Divider borderColor={borderColor} my={8} />

        {/* Bottom Footer */}
        <Flex 
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontSize="sm" color="gray.400">
            &copy; {new Date().getFullYear()} CyberMentorship. All rights reserved.
          </Text>
          <HStack spacing={6} color="gray.400" fontSize="sm">
            <MotionLink 
              href="#" 
              whileHover={{ scale: 1.05 }}
              _hover={{ color: 'teal.200' }}
            >
              Terms of Service
            </MotionLink>
            <MotionLink 
              href="#" 
              whileHover={{ scale: 1.05 }}
              _hover={{ color: 'teal.200' }}
            >
              Privacy Policy
            </MotionLink>
            <MotionLink 
              href="#" 
              whileHover={{ scale: 1.05 }}
              _hover={{ color: 'teal.200' }}
            >
              Cookie Policy
            </MotionLink>
          </HStack>
        </Flex>

        {/* Scroll to Top Button */}
        <MotionBox
          position="fixed"
          bottom="4"
          right="4"
          zIndex="tooltip"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconButton
            aria-label="Scroll to top"
            icon={<FaArrowUp />}
            onClick={scrollToTop}
            colorScheme="teal"
            rounded="full"
            size="lg"
            shadow="lg"
          />
        </MotionBox>
      </Container>
    </MotionBox>
  );
};

export default Footer;
