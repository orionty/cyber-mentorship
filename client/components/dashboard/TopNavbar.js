import { 
    Box, 
    Flex, 
    Icon, 
    Input, 
    Avatar, 
    Text, 
    Menu, 
    MenuButton, 
    MenuList, 
    MenuItem, 
    Badge, 
    HStack,
    useDisclosure,
    useToast,
    Tooltip,
    Fade,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    Portal
  } from '@chakra-ui/react';
  import { motion, AnimatePresence } from 'framer-motion';
  import { FaSearch, FaBell, FaEnvelope, FaUser, FaCog, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
  import { useState, useEffect } from 'react';
  import { useRouter } from 'next/router';
  import NextLink from 'next/link';
  import Notifications from './Notifications';
  import ActivityFeed from './ActivityFeed';
  
  const MotionBox = motion(Box);
  const MotionFlex = motion(Flex);
  
  const TopNavbar = () => {
    const { isOpen, onToggle } = useDisclosure();
    const { 
      isOpen: isNotificationsOpen, 
      onToggle: onNotificationsToggle,
      onClose: onNotificationsClose
    } = useDisclosure();
    const {
      isOpen: isMessagesOpen,
      onToggle: onMessagesToggle,
      onClose: onMessagesClose
    } = useDisclosure();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const toast = useToast();
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            router.push('/login');
            return;
          }
  
          const response = await fetch('/api/user/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          }
  
          const { user: userData } = await response.json();
          setUser(userData);
        } catch (error) {
          console.error('Error fetching user profile:', error);
          toast({
            title: 'Error',
            description: 'Failed to load user profile',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right'
          });
  
          if (error.message === 'Invalid token' || error.message === 'Unauthorized') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            router.push('/login');
          }
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserProfile();
    }, [router, toast]);
  
    const handleLogout = async () => {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
        toast({
          title: 'Success',
          description: 'Logged out successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        });
      } catch (error) {
        console.error('Logout error:', error);
        toast({
          title: 'Error',
          description: 'Failed to logout',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right'
        });
      }
    };
  
    return (
      <MotionFlex
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        align="center"
        justify="space-between"
        bg="white"
        p={4}
        borderBottom="1px solid"
        borderColor="gray.200"
        position="sticky"
        top={0}
        zIndex={1}
        height="60px"
        width="calc(100% - 60px)"
        marginLeft="auto"
        boxShadow="sm"
      >
        {/* Left Section: Search Bar */}
        <MotionBox 
          display="flex" 
          alignItems="center"
          whileHover={{ scale: 1.02 }}
        >
          <Tooltip label="Search" placement="bottom">
            <Icon 
              as={FaSearch} 
              color="gray.500" 
              boxSize={5} 
              cursor="pointer" 
              onClick={onToggle}
              _hover={{ color: 'teal.500' }}
              transition="all 0.2s"
            />
          </Tooltip>
          <AnimatePresence>
            {isOpen && (
              <MotionBox
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  ml={4}
                  placeholder="Search..."
                  variant="filled"
                  bg="gray.50"
                  borderRadius="full"
                  focusBorderColor="teal.500"
                  transition="all 0.3s"
                  width={{ base: "150px", md: "200px", lg: "250px" }}
                  maxW="300px"
                  _hover={{ bg: 'gray.100' }}
                  _focus={{ bg: 'white', boxShadow: 'md' }}
                />
              </MotionBox>
            )}
          </AnimatePresence>
        </MotionBox>
  
        {/* Center Section: Title */}
        <Text 
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold" 
          color="teal.700" 
          textAlign="center" 
          flex="1"
          letterSpacing="wide"
          textTransform="capitalize"
        >
          {router.pathname.split('/').pop().replace(/-/g, ' ')}
        </Text>
  
        {/* Right Section: Icons and Profile */}
        <HStack spacing={6} align="center">
          {/* Notifications */}
          <Popover
            isOpen={isNotificationsOpen}
            onClose={onNotificationsClose}
            placement="bottom-end"
            closeOnBlur={true}
          >
            <PopoverTrigger>
              <Box position="relative" cursor="pointer" onClick={onNotificationsToggle}>
                <Icon 
                  as={FaBell} 
                  boxSize={6} 
                  color="gray.500"
                  _hover={{ color: 'teal.500' }}
                  transition="all 0.2s"
                />
                <Badge
                  colorScheme="red"
                  borderRadius="full"
                  position="absolute"
                  top="-2"
                  right="-2"
                  fontSize="0.7em"
                  p={1}
                  animation="pulse 2s infinite"
                >
                  3
                </Badge>
              </Box>
            </PopoverTrigger>
            <Portal>
              <PopoverContent width="400px" maxHeight="500px" overflowY="auto">
                <PopoverBody p={0}>
                  <Notifications />
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
  
          {/* Messages */}
          <Popover
            isOpen={isMessagesOpen}
            onClose={onMessagesClose}
            placement="bottom-end"
            closeOnBlur={true}
          >
            <PopoverTrigger>
              <Box position="relative" cursor="pointer" onClick={onMessagesToggle}>
                <Icon 
                  as={FaEnvelope} 
                  boxSize={6} 
                  color="gray.500"
                  _hover={{ color: 'teal.500' }}
                  transition="all 0.2s"
                />
                <Badge
                  colorScheme="yellow"
                  borderRadius="full"
                  position="absolute"
                  top="-2"
                  right="-2"
                  fontSize="0.7em"
                  p={1}
                  animation="pulse 2s infinite"
                >
                  5
                </Badge>
              </Box>
            </PopoverTrigger>
            <Portal>
              <PopoverContent width="400px" maxHeight="500px" overflowY="auto">
                <PopoverBody p={0}>
                  <ActivityFeed />
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
  
          {/* Profile Menu */}
          <Menu>
            <Tooltip label="Profile Menu" placement="bottom">
              <MenuButton>
                <Avatar
                  name={user ? `${user.firstName} ${user.lastName}` : ''}
                  src={user?.avatar}
                  size="sm"
                  cursor="pointer"
                  borderWidth={2}
                  borderColor="teal.500"
                  _hover={{ 
                    transform: 'scale(1.05)',
                    boxShadow: 'md'
                  }}
                  transition="all 0.2s"
                />
              </MenuButton>
            </Tooltip>
            <MenuList
              border="1px solid"
              borderColor="gray.200"
              boxShadow="lg"
              borderRadius="md"
              p={2}
            >
              <NextLink href="/dashboard/profile" passHref>
                <MenuItem 
                  icon={<FaUserCircle />}
                  _hover={{ bg: 'teal.50' }}
                  borderRadius="md"
                >
                  {user ? `${user.firstName} ${user.lastName}` : 'Profile'}
                </MenuItem>
              </NextLink>
              <NextLink href="/dashboard/settings" passHref>
                <MenuItem 
                  icon={<FaCog />}
                  _hover={{ bg: 'teal.50' }}
                  borderRadius="md"
                >
                  Settings
                </MenuItem>
              </NextLink>
              <MenuItem 
                onClick={handleLogout} 
                color="red.500" 
                icon={<FaSignOutAlt />}
                _hover={{ bg: 'red.50' }}
                borderRadius="md"
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </MotionFlex>
    );
  };
  
  export default TopNavbar;