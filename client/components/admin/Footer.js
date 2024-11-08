// Footer.js
import { Box, Text, HStack, Link, VStack, useBreakpointValue, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaHeart, FaBook, FaShieldAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionLink = motion(Link);

const Footer = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const bgGradient = useColorModeValue(
    'linear(to-r, gray.800, gray.900)',
    'linear(to-r, gray.900, black)'
  );
  const linkColor = useColorModeValue('teal.200', 'teal.300');
  
  const linkHoverStyle = {
    color: 'white',
    transform: 'translateY(-2px)',
    textShadow: '0 0 8px rgba(49, 151, 149, 0.6)'
  };

  const LinkWithAnimation = ({ children, icon, ...props }) => (
    <MotionLink
      href="#"
      color={linkColor}
      fontWeight="bold"
      display="flex"
      alignItems="center"
      gap={2}
      whileHover={linkHoverStyle}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <Icon as={icon} />
      {children}
    </MotionLink>
  );

  return (
    <MotionBox
      as="footer"
      py={6}
      px={4}
      textAlign="center"
      w="full"
      bgGradient={bgGradient}
      color="white"
      mt="auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      boxShadow="0 -4px 6px -1px rgba(0, 0, 0, 0.1)"
    >
      {isMobile ? (
        <VStack spacing={4}>
          <LinkWithAnimation icon={FaHeart}>Support</LinkWithAnimation>
          <LinkWithAnimation icon={FaBook}>Documentation</LinkWithAnimation>
          <LinkWithAnimation icon={FaShieldAlt}>Privacy Policy</LinkWithAnimation>
        </VStack>
      ) : (
        <HStack justify="center" spacing={8}>
          <LinkWithAnimation icon={FaHeart}>Support</LinkWithAnimation>
          <LinkWithAnimation icon={FaBook}>Documentation</LinkWithAnimation>
          <LinkWithAnimation icon={FaShieldAlt}>Privacy Policy</LinkWithAnimation>
        </HStack>
      )}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Text 
          fontSize="sm" 
          mt={4}
          opacity={0.9}
          letterSpacing="wide"
        >
          © 2024 Admin Panel. All rights reserved.
        </Text>
      </MotionBox>
    </MotionBox>
  );
};

export default Footer;
