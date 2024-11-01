// Header.js
import { HStack, IconButton, Avatar, Tooltip, Badge, useColorMode, Menu, MenuButton, MenuList, MenuItem, Button, Box, Input, InputGroup, InputLeftElement, useDisclosure, useColorModeValue, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/react';
import { FaBell, FaSun, FaMoon, FaSearch, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();

  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const inputBgColor = useColorModeValue('gray.100', 'gray.700');
  const inputHoverBgColor = useColorModeValue('gray.200', 'gray.600');
  const menuHoverBgColor = useColorModeValue('teal.50', 'teal.900');
  const menuItemTextColor = useColorModeValue('gray.700', 'gray.100');
  const menuLogoutHoverBg = useColorModeValue('red.50', 'red.900');
  const menuLogoutHoverColor = useColorModeValue('red.500', 'red.200');

  const buttonAnimation = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const notificationBadgeAnimation = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    transition: { type: "spring", stiffness: 500, damping: 30 }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HStack 
        justify="space-between" 
        mb={5} 
        w="full" 
        alignItems="center"
        p={4}
        bg={bgColor}
        boxShadow="sm"
        borderRadius="lg"
      >
        {/* Search Section */}
        <Box display={{ base: 'none', md: 'block' }} flex={1} maxW="400px">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaSearch color={colorMode === 'light' ? 'gray.400' : 'gray.500'} />
            </InputLeftElement>
            <Input 
              placeholder="Search..."
              bg={inputBgColor}
              _hover={{ bg: inputHoverBgColor }}
              _focus={{ 
                borderColor: "teal.500", 
                boxShadow: "0 0 0 1px teal.500",
                bg: inputHoverBgColor 
              }}
              color={menuItemTextColor}
            />
          </InputGroup>
        </Box>

        {/* Mobile Search Button */}
        <MotionIconButton
          display={{ base: 'flex', md: 'none' }}
          icon={<FaSearch />}
          variant="ghost"
          colorScheme="teal"
          aria-label="Search"
          whileHover="hover"
          whileTap="tap"
          variants={buttonAnimation}
          onClick={onSearchOpen}
        />

        {/* Mobile Search Drawer */}
        <Drawer isOpen={isSearchOpen} placement="top" onClose={onSearchClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Search</DrawerHeader>
            <DrawerBody pb={4}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaSearch color={colorMode === 'light' ? 'gray.400' : 'gray.500'} />
                </InputLeftElement>
                <Input 
                  placeholder="Search..."
                  bg={inputBgColor}
                  _hover={{ bg: inputHoverBgColor }}
                  _focus={{ 
                    borderColor: "teal.500", 
                    boxShadow: "0 0 0 1px teal.500",
                    bg: inputHoverBgColor 
                  }}
                  color={menuItemTextColor}
                  autoFocus
                />
              </InputGroup>
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        {/* Action Icons */}
        <HStack spacing={4}>
          <Tooltip label="Notifications" hasArrow>
            <MotionIconButton
              icon={
                <Box position="relative">
                  <FaBell />
                  <MotionBox
                    as={Badge}
                    colorScheme="red"
                    variant="solid"
                    position="absolute"
                    top="-2"
                    right="-2"
                    borderRadius="full"
                    {...notificationBadgeAnimation}
                  >
                    3
                  </MotionBox>
                </Box>
              }
              variant="ghost"
              colorScheme="teal"
              aria-label="Notifications"
              whileHover="hover"
              whileTap="tap"
              variants={buttonAnimation}
            />
          </Tooltip>

          <Tooltip label={`Switch to ${colorMode === "light" ? "Dark" : "Light"} Mode`} hasArrow>
            <MotionIconButton
              icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
              variant="ghost"
              onClick={toggleColorMode}
              aria-label="Toggle Color Mode"
              whileHover="hover"
              whileTap="tap"
              variants={buttonAnimation}
            />
          </Tooltip>

          {/* Profile Menu */}
          <Menu isOpen={isOpen} onClose={onClose}>
            <MenuButton
              as={MotionIconButton}
              whileHover="hover"
              whileTap="tap"
              variants={buttonAnimation}
            >
              <Avatar 
                size="sm" 
                name="Admin" 
                src="https://bit.ly/broken-link" 
                bg="teal.500"
                _hover={{ transform: 'scale(1.05)' }}
                transition="all 0.2s"
              />
            </MenuButton>
            <MenuList
              border="none"
              boxShadow="lg"
              p={2}
              bg={bgColor}
            >
              <MenuItem 
                icon={<FaUser />} 
                _hover={{ bg: menuHoverBgColor, color: 'teal.500' }}
                color={menuItemTextColor}
              >
                Profile
              </MenuItem>
              <MenuItem 
                icon={<FaCog />} 
                _hover={{ bg: menuHoverBgColor, color: 'teal.500' }}
                color={menuItemTextColor}
              >
                Settings
              </MenuItem>
              <MenuItem 
                icon={<FaSignOutAlt />} 
                _hover={{ bg: menuLogoutHoverBg, color: menuLogoutHoverColor }}
                color={menuItemTextColor}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </HStack>
    </MotionBox>
  );
};

export default Header;
