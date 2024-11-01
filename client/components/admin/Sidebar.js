// Sidebar.js
import { VStack, Text, Button, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody, Box, useColorModeValue } from '@chakra-ui/react';
import { FaChartBar, FaUserShield, FaFileAlt, FaCog, FaBars, FaChartLine, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

const Sidebar = ({ activeSection, setActiveSection }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  
  const sidebarLinks = [
    { name: 'Overview', icon: FaChartBar, href: '/admin' },
    { name: 'User Management', icon: FaUsers, href: '/admin/users' },
    { name: 'Content Management', icon: FaFileAlt, href: '/admin/content' },
    { name: 'Analytics', icon: FaChartLine, href: '/admin/analytics' },
    { name: 'Settings', icon: FaCog, href: '/admin/settings' },
  ];

  // Set active section based on current route
  useEffect(() => {
    const currentPath = router.pathname;
    const currentLink = sidebarLinks.find(link => link.href === currentPath);
    if (currentLink) {
      setActiveSection(currentLink.name);
    }
  }, [router.pathname]);

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const buttonHoverBg = useColorModeValue('teal.50', 'teal.900');
  const activeButtonBg = useColorModeValue('teal.500', 'teal.200');
  const activeTextColor = useColorModeValue('white', 'gray.800');

  const sidebarAnimation = {
    hidden: { x: -100, opacity: 0 },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { x: -20, opacity: 0 },
    show: { x: 0, opacity: 1 }
  };

  const handleLinkClick = (name, href) => {
    setActiveSection(name);
    router.push(href);
    onClose();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <MotionButton
        as={IconButton}
        icon={<FaBars />}
        display={{ base: 'flex', md: 'none' }}
        position="fixed"
        top="4"
        left="4"
        zIndex="overlay"
        variant="solid"
        colorScheme="teal"
        onClick={onOpen}
        aria-label="Open Menu"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />

      {/* Desktop Sidebar */}
      <MotionVStack
        initial="hidden"
        animate="show"
        variants={sidebarAnimation}
        w={{ base: 'full', md: '280px' }}
        h="100vh"
        bg={bgColor}
        p={6}
        spacing={8}
        boxShadow="2xl"
        position="sticky"
        top="0"
        align="stretch"
        display={{ base: 'none', md: 'flex' }}
      >
        <MotionBox
          variants={itemAnimation}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Text 
            fontSize="2xl" 
            fontWeight="bold" 
            color="teal.500"
            textAlign="center"
            pb={4}
            borderBottom="2px solid"
            borderColor="teal.500"
          >
            Admin Panel
          </Text>
        </MotionBox>

        {sidebarLinks.map((link, index) => (
          <MotionButton
            key={index}
            leftIcon={<link.icon />}
            bg={activeSection === link.name ? activeButtonBg : 'transparent'}
            color={activeSection === link.name ? activeTextColor : textColor}
            w="full"
            h="50px"
            justifyContent="flex-start"
            onClick={() => handleLinkClick(link.name, link.href)}
            variants={itemAnimation}
            whileHover={{ 
              backgroundColor: activeSection === link.name ? activeButtonBg : buttonHoverBg,
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            _hover={{
              transform: "translateX(5px)"
            }}
            position="relative"
            _before={{
              content: '""',
              position: "absolute",
              left: "-6px",
              top: "0",
              bottom: "0",
              width: "4px",
              bg: activeSection === link.name ? "teal.500" : "transparent",
              borderRadius: "0 4px 4px 0"
            }}
          >
            {link.name}
          </MotionButton>
        ))}
      </MotionVStack>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg={bgColor}>
          <DrawerCloseButton color={textColor} />
          <DrawerBody p={6}>
            <MotionVStack
              initial="hidden"
              animate="show"
              variants={sidebarAnimation}
              align="stretch"
              spacing={8}
              mt={12}
            >
              <MotionBox variants={itemAnimation}>
                <Text 
                  fontSize="2xl" 
                  fontWeight="bold" 
                  color="teal.500"
                  textAlign="center"
                  pb={4}
                  borderBottom="2px solid"
                  borderColor="teal.500"
                >
                  Admin Panel
                </Text>
              </MotionBox>

              {sidebarLinks.map((link, index) => (
                <MotionButton
                  key={index}
                  leftIcon={<link.icon />}
                  bg={activeSection === link.name ? activeButtonBg : 'transparent'}
                  color={activeSection === link.name ? activeTextColor : textColor}
                  w="full"
                  h="50px"
                  justifyContent="flex-start"
                  onClick={() => handleLinkClick(link.name, link.href)}
                  variants={itemAnimation}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  position="relative"
                  _before={{
                    content: '""',
                    position: "absolute",
                    left: "-6px",
                    top: "0",
                    bottom: "0",
                    width: "4px",
                    bg: activeSection === link.name ? "teal.500" : "transparent",
                    borderRadius: "0 4px 4px 0"
                  }}
                >
                  {link.name}
                </MotionButton>
              ))}
            </MotionVStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
