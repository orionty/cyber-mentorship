import { 
    Box, 
    Flex, 
    VStack, 
    Icon, 
    Text, 
    Avatar, 
    useDisclosure,
    Spinner,
    useToast
  } from '@chakra-ui/react';
  import { motion } from 'framer-motion';
  import { useEffect, useState } from 'react';
  import { useRouter } from 'next/router';
  import {
    FaHome,
    FaTasks,
    FaChalkboardTeacher,
    FaChartLine,
    FaAward,
    FaBriefcase,
    FaBook,
    FaBullhorn,
    FaUser,
  } from 'react-icons/fa';
  
  const MotionBox = motion(Box);
  
  const Sidebar = () => {
    const { isOpen, onToggle } = useDisclosure();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const toast = useToast();
  
    const menuItems = [
      { label: 'Dashboard', icon: FaHome, path: '/dashboard' },
      { label: 'My Tasks', icon: FaTasks, path: '/dashboard/tasks' },
      { label: 'Mentorship Sessions', icon: FaChalkboardTeacher, path: '/dashboard/mentorship' },
      { label: 'Progress Tracker', icon: FaChartLine, path: '/dashboard/progress' },
      { label: 'Achievements & Badges', icon: FaAward, path: '/dashboard/achievements' },
      { label: 'Job Opportunities', icon: FaBriefcase, path: '/dashboard/jobs' },
      { label: 'Learning Resources', icon: FaBook, path: '/dashboard/resources' },
      { label: 'Announcements', icon: FaBullhorn, path: '/dashboard/announcements' },
      { label: 'Profile Settings', icon: FaUser, path: '/dashboard/settings' },
    ];
  
    useEffect(() => {
        const fetchUserProfile = async () => {
          try {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            if (!token) {
              console.error('No token found');
              router.push('/login');
              return;
            }
    
            // Get user data from localStorage as fallback
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
              setUser(JSON.parse(storedUser));
            }
    
            // Fetch fresh user data
            const response = await fetch('/api/user/profile', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              const error = await response.json();
              throw new Error(error.message || 'Failed to fetch user profile');
            }
    
            const { user: userData } = await response.json();
            
            // Update localStorage with fresh data
            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
          } catch (error) {
            console.error('Error fetching user profile:', error);
            toast({
              title: 'Error',
              description: error.message || 'Failed to load user profile',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
    
            // If token is invalid, redirect to login
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
  
    const handleNavigation = (path) => {
      router.push(path);
    };
  
    if (loading) {
      return (
        <Box
          bg="teal.700"
          minH="100vh"
          w="60px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner color="white" />
        </Box>
      );
    }
  
    return (
      <MotionBox
        bg="teal.700"
        color="white"
        minH="100vh"
        w={isOpen ? '250px' : '60px'}
        transition={{ width: { duration: 0.3 } }}
        display="flex"
        flexDirection="column"
        alignItems={isOpen ? 'flex-start' : 'center'}
        p={4}
        boxShadow="lg"
        position="fixed"
        left={0}
        top={0}
        zIndex={100}
      >
        {/* Profile Section */}
        <Flex
          direction="column"
          alignItems={isOpen ? 'flex-start' : 'center'}
          mb={6}
          cursor="pointer"
          onClick={onToggle}
          w="full"
        >
          <Flex
            align="center"
            justify={isOpen ? 'flex-start' : 'center'}
            w="full"
          >
            <Avatar
              name={user ? `${user.firstName} ${user.lastName}` : ''}
              src={user?.avatar}
              size={isOpen ? 'md' : 'sm'}
              mb={isOpen ? 2 : 0}
            />
            {isOpen && (
              <VStack align="flex-start" ml={3} spacing={0}>
                <Text fontWeight="bold">
                  {user ? `${user.firstName} ${user.lastName}` : ''}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.800">
                  {user?.email}
                </Text>
              </VStack>
            )}
          </Flex>
        </Flex>
  
        {/* Navigation Links */}
        <VStack spacing={2} align={isOpen ? 'flex-start' : 'center'} w="full">
          {menuItems.map((item, index) => (
            <MotionBox
              key={index}
              display="flex"
              alignItems="center"
              justifyContent={isOpen ? 'flex-start' : 'center'}
              p={3}
              w="full"
              cursor="pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation(item.path)}
              _hover={{ bg: 'teal.600' }}
              borderRadius="md"
              bg={router.pathname === item.path ? 'teal.600' : 'transparent'}
              transition="background 0.3s ease"
            >
              <Icon 
                as={item.icon} 
                boxSize={5} 
                mr={isOpen ? 4 : 0}
                color={router.pathname === item.path ? 'white' : 'whiteAlpha.900'}
              />
              {isOpen && (
                <Text 
                  fontSize="md"
                  color={router.pathname === item.path ? 'white' : 'whiteAlpha.900'}
                >
                  {item.label}
                </Text>
              )}
            </MotionBox>
          ))}
        </VStack>
      </MotionBox>
    );
  };
  
  export default Sidebar;