import {
    Box,
    Container,
    Flex,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
    Text,
    Input,
    Button,
    Avatar,
    FormControl,
    FormLabel,
    Switch,
    Divider,
    useColorModeValue,
    useToast,
    InputGroup,
    InputRightElement,
    Icon,
    Grid,
    GridItem,
    Textarea,
    useBreakpointValue,
    ScaleFade,
    SlideFade,
  } from '@chakra-ui/react';
  import { useState, useEffect } from 'react';
  import { FaCamera, FaEye, FaEyeSlash, FaBell, FaLock, FaUser, FaSave } from 'react-icons/fa';
  import { motion, AnimatePresence } from 'framer-motion';
  import { useRouter } from 'next/router';

  const MotionBox = motion(Box);
  const MotionFlex = motion(Flex);
  
  const ProfileSettings = () => {
    const router = useRouter();
    const toast = useToast();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });
    
    // Form states
    const [profileData, setProfileData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      bio: '',
    });
    
    const [securityData, setSecurityData] = useState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    
    const [preferences, setPreferences] = useState({
      emailNotifications: true,
      smsNotifications: false,
      marketingEmails: true,
    });
  
    useEffect(() => {
      // Check authentication and get user data
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/login');
        return;
      }
      
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setProfileData({
        firstName: parsedUser.firstName || '',
        lastName: parsedUser.lastName || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        bio: parsedUser.bio || '',
      });
    }, [router]);
  
    const handleProfileUpdate = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      
      try {
        const response = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(profileData),
        });
  
        if (!response.ok) throw new Error('Failed to update profile');
  
        toast({
          title: 'Success',
          description: 'Profile updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          variant: 'subtle',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    const handlePasswordChange = async (e) => {
      e.preventDefault();
      if (securityData.newPassword !== securityData.confirmPassword) {
        toast({
          title: 'Error',
          description: 'New passwords do not match',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        return;
      }
      
      setIsLoading(true);
      // Add password change API call here
      setIsLoading(false);
    };
  
    const handlePreferencesUpdate = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      // Add preferences update API call here
      setIsLoading(false);
    };
  
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const cardHoverBg = useColorModeValue('gray.50', 'gray.700');
  
    const cardVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    };
  
    return (
     <>
      <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} pt={16} p={{ base: 2, sm: 4, md: 6 }}>
      <Container maxW="container.xl" py={8}>
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading mb={8} fontSize={{ base: "2xl", md: "3xl" }} color="teal.500">
            Account Settings
          </Heading>
          
          <Tabs variant="soft-rounded" colorScheme="teal" isLazy>
            <TabList 
              overflowX="auto" 
              py={2}
              css={{
                scrollbarWidth: 'none',
                '::-webkit-scrollbar': { display: 'none' },
              }}
            >
              <Tab _selected={{ color: 'white', bg: 'teal.500' }}><Icon as={FaUser} mr={2} /> Profile</Tab>
              <Tab _selected={{ color: 'white', bg: 'teal.500' }}><Icon as={FaLock} mr={2} /> Security</Tab>
              <Tab _selected={{ color: 'white', bg: 'teal.500' }}><Icon as={FaBell} mr={2} /> Preferences</Tab>
            </TabList>
  
            <TabPanels>
              {/* Profile Tab */}
              <TabPanel>
                <Grid templateColumns={{ base: '1fr', lg: '250px 1fr' }} gap={8}>
                  <GridItem>
                    <MotionBox
                      initial="hidden"
                      animate="visible"
                      variants={cardVariants}
                      transition={{ duration: 0.5 }}
                    >
                      <VStack spacing={6}>
                        <Box
                          position="relative"
                          borderRadius="full"
                          boxShadow="2xl"
                          p={2}
                          bg="teal.50"
                          _dark={{ bg: 'teal.900' }}
                        >
                          <Avatar
                            size="2xl"
                            name={`${profileData.firstName} ${profileData.lastName}`}
                            src={user?.avatar}
                            border="4px solid"
                            borderColor="teal.400"
                          />
                          <Button
                            position="absolute"
                            bottom={2}
                            right={2}
                            rounded="full"
                            size="sm"
                            colorScheme="teal"
                            leftIcon={<FaCamera />}
                            _hover={{ transform: 'scale(1.1)' }}
                            transition="all 0.3s"
                          >
                            Update
                          </Button>
                        </Box>
                        <Text color="gray.500" fontSize="sm" textAlign="center">
                          Recommended size: 400x400px
                        </Text>
                      </VStack>
                    </MotionBox>
                  </GridItem>

                  <GridItem>
                    <form onSubmit={handleProfileUpdate}>
                      <VStack spacing={6} align="stretch">
                        <AnimatePresence>
                          <MotionBox
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            p={6}
                            bg={bgColor}
                            borderRadius="2xl"
                            boxShadow="lg"
                            borderWidth="1px"
                            borderColor={borderColor}
                            _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
                           
                          >
                            <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.500">
                              Personal Information
                            </Text>
                            <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                              <FormControl>
                                <FormLabel fontWeight="medium">First Name</FormLabel>
                                <Input
                                  value={profileData.firstName}
                                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                  bg={useColorModeValue('white', 'gray.700')}
                                  borderRadius="lg"
                                  size="lg"
                                  _hover={{ borderColor: 'teal.300' }}
                                  _focus={{ borderColor: 'teal.500', ring: 2, ringColor: 'teal.500' }}
                                />
                              </FormControl>
                              <FormControl>
                                <FormLabel fontWeight="medium">Last Name</FormLabel>
                                <Input
                                  value={profileData.lastName}
                                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                  bg={useColorModeValue('white', 'gray.700')}
                                  borderRadius="lg"
                                  size="lg"
                                  _hover={{ borderColor: 'teal.300' }}
                                  _focus={{ borderColor: 'teal.500', ring: 2, ringColor: 'teal.500' }}
                                />
                              </FormControl>
                            </Grid>
                          </MotionBox>

                          <MotionBox
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            p={6}
                            mt={6}
                            bg={bgColor}
                            borderRadius="2xl"
                            boxShadow="lg"
                            borderWidth="1px"
                            borderColor={borderColor}
                            _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
                           
                          >
                            <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.500">
                              Contact Details
                            </Text>
                            <VStack spacing={4}>
                              <FormControl>
                                <FormLabel fontWeight="medium">Email Address</FormLabel>
                                <Input
                                  type="email"
                                  value={profileData.email}
                                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                  bg={useColorModeValue('white', 'gray.700')}
                                  borderRadius="lg"
                                  size="lg"
                                  _hover={{ borderColor: 'teal.300' }}
                                  _focus={{ borderColor: 'teal.500', ring: 2, ringColor: 'teal.500' }}
                                />
                              </FormControl>

                              <FormControl>
                                <FormLabel fontWeight="medium">Phone Number</FormLabel>
                                <Input
                                  type="tel"
                                  value={profileData.phone}
                                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                  bg={useColorModeValue('white', 'gray.700')}
                                  borderRadius="lg"
                                  size="lg"
                                  _hover={{ borderColor: 'teal.300' }}
                                  _focus={{ borderColor: 'teal.500', ring: 2, ringColor: 'teal.500' }}
                                />
                              </FormControl>
                            </VStack>
                          </MotionBox>

                          <MotionBox
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            p={6}
                            mt={6}
                            bg={bgColor}
                            borderRadius="2xl"
                            boxShadow="lg"
                            borderWidth="1px"
                            borderColor={borderColor}
                            _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
                           
                          >
                            <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.500">
                              About Me
                            </Text>
                            <FormControl>
                              <FormLabel fontWeight="medium">Bio</FormLabel>
                              <Textarea
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                bg={useColorModeValue('white', 'gray.700')}
                                borderRadius="lg"
                                size="lg"
                                _hover={{ borderColor: 'teal.300' }}
                                _focus={{ borderColor: 'teal.500', ring: 2, ringColor: 'teal.500' }}
                                minH="150px"
                                resize="vertical"
                              />
                            </FormControl>
                          </MotionBox>
                        </AnimatePresence>

                        <MotionBox
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                        >
                          <Button
                            type="submit"
                            colorScheme="teal"
                            size="lg"
                            isLoading={isLoading}
                            loadingText="Saving..."
                            w={{ base: 'full', md: 'auto' }}
                            h="56px"
                            leftIcon={<FaSave />}
                            _hover={{ 
                              transform: 'translateY(-2px)',
                              boxShadow: 'xl',
                              bg: 'teal.400'
                            }}
                            _active={{
                              transform: 'translateY(0)',
                              boxShadow: 'md'
                            }}
                            transition="all 0.2s"
                          >
                            Save Changes
                          </Button>
                        </MotionBox>
                      </VStack>
                    </form>
                  </GridItem>
                </Grid>
              </TabPanel>
  
              {/* Security Tab */}
              <TabPanel>
                <ScaleFade in={true} initialScale={0.9}>
                  <Box
                    bg={bgColor}
                    p={8}
                    borderRadius="2xl"
                    borderWidth="1px"
                    borderColor={borderColor}
                    boxShadow="xl"
                    maxW="2xl"
                    mx="auto"
                    _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
                    transition="all 0.3s"
                  >
                    <VStack spacing={6} align="stretch" mb={8}>
                      <Heading size="lg" color="teal.500">
                        Change Your Password
                      </Heading>
                      <Text color="gray.600" fontSize="lg">
                        Keep your account secure by using a strong password that you don't use elsewhere.
                      </Text>
                    </VStack>

                    <form onSubmit={handlePasswordChange}>
                      <VStack spacing={8} align="stretch">
                        <FormControl>
                          <FormLabel fontWeight="medium">Current Password</FormLabel>
                          <InputGroup size="lg">
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              value={securityData.currentPassword}
                              onChange={(e) => setSecurityData({
                                ...securityData,
                                currentPassword: e.target.value
                              })}
                              bg={useColorModeValue('white', 'gray.700')}
                              borderRadius="lg"
                              _hover={{ borderColor: 'teal.300' }}
                              _focus={{ borderColor: 'teal.500', ring: 2, ringColor: 'teal.500' }}
                            />
                            <InputRightElement width="4.5rem">
                              <Button
                                h="1.75rem"
                                size="sm"
                                variant="ghost"
                                onClick={() => setShowPassword(!showPassword)}
                                _hover={{ color: 'teal.500' }}
                              >
                                <Icon as={showPassword ? FaEyeSlash : FaEye} />
                              </Button>
                            </InputRightElement>
                          </InputGroup>
                        </FormControl>
  
                        <FormControl>
                          <FormLabel fontWeight="medium">New Password</FormLabel>
                          <Input
                            type="password"
                            size="lg"
                            value={securityData.newPassword}
                            onChange={(e) => setSecurityData({
                              ...securityData,
                              newPassword: e.target.value
                            })}
                            bg={useColorModeValue('white', 'gray.700')}
                            borderRadius="lg"
                            _hover={{ borderColor: 'teal.300' }}
                            _focus={{ borderColor: 'teal.500', ring: 2, ringColor: 'teal.500' }}
                          />
                        </FormControl>
  
                        <FormControl>
                          <FormLabel fontWeight="medium">Confirm New Password</FormLabel>
                          <Input
                            type="password"
                            size="lg"
                            value={securityData.confirmPassword}
                            onChange={(e) => setSecurityData({
                              ...securityData,
                              confirmPassword: e.target.value
                            })}
                            bg={useColorModeValue('white', 'gray.700')}
                            borderRadius="lg"
                            _hover={{ borderColor: 'teal.300' }}
                            _focus={{ borderColor: 'teal.500', ring: 2, ringColor: 'teal.500' }}
                          />
                        </FormControl>
  
                        <Button
                          type="submit"
                          colorScheme="teal"
                          size="lg"
                          isLoading={isLoading}
                          loadingText="Updating..."
                          fontSize="md"
                          fontWeight="bold"
                          w="full"
                          h="56px"
                          leftIcon={<FaLock />}
                          _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'xl',
                            bg: 'teal.400'
                          }}
                          _active={{
                            transform: 'translateY(0)',
                            boxShadow: 'md'
                          }}
                          transition="all 0.2s"
                        >
                          Update Password
                        </Button>
                      </VStack>
                    </form>
                  </Box>
                </ScaleFade>
              </TabPanel>
  
              {/* Preferences Tab */}
              <TabPanel>
                <SlideFade in={true} offsetY="20px">
                  <Box
                    bg={bgColor}
                    p={8}
                    borderRadius="2xl"
                    borderWidth="1px"
                    borderColor={borderColor}
                    boxShadow="xl"
                    _hover={{ borderColor: 'teal.200' }}
                    transition="all 0.3s"
                  >
                    <VStack spacing={8} align="stretch">
                      <Heading size="lg" color="teal.500" mb={2}>
                        Notification Preferences
                      </Heading>

                      <MotionBox
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormControl 
                          display="flex" 
                          alignItems="center" 
                          bg={useColorModeValue('white', 'gray.700')}
                          p={6}
                          borderRadius="xl"
                          boxShadow="md"
                          transition="all 0.2s"
                        >
                          <Box flex="1">
                            <FormLabel mb="0" fontSize="lg" fontWeight="bold">
                              Email Notifications
                            </FormLabel>
                            <Text fontSize="md" color="gray.500">
                              Receive updates and notifications via email
                            </Text>
                          </Box>
                          <Switch
                            colorScheme="teal"
                            size="lg"
                            isChecked={preferences.emailNotifications}
                            onChange={(e) => setPreferences({
                              ...preferences,
                              emailNotifications: e.target.checked
                            })}
                          />
                        </FormControl>
                      </MotionBox>

                      <MotionBox
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormControl 
                          display="flex" 
                          alignItems="center"
                          bg={useColorModeValue('white', 'gray.700')}
                          p={6}
                          borderRadius="xl"
                          boxShadow="md"
                          transition="all 0.2s"
                        >
                          <Box flex="1">
                            <FormLabel mb="0" fontSize="lg" fontWeight="bold">
                              SMS Notifications
                            </FormLabel>
                            <Text fontSize="md" color="gray.500">
                              Get instant alerts via text message
                            </Text>
                          </Box>
                          <Switch
                            colorScheme="teal"
                            size="lg"
                            isChecked={preferences.smsNotifications}
                            onChange={(e) => setPreferences({
                              ...preferences,
                              smsNotifications: e.target.checked
                            })}
                          />
                        </FormControl>
                      </MotionBox>

                      <MotionBox
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <FormControl 
                          display="flex" 
                          alignItems="center"
                          bg={useColorModeValue('white', 'gray.700')}
                          p={6}
                          borderRadius="xl"
                          boxShadow="md"
                          transition="all 0.2s"
                        >
                          <Box flex="1">
                            <FormLabel mb="0" fontSize="lg" fontWeight="bold">
                              Marketing Emails
                            </FormLabel>
                            <Text fontSize="md" color="gray.500">
                              Stay updated with our latest offers and news
                            </Text>
                          </Box>
                          <Switch
                            colorScheme="teal"
                            size="lg"
                            isChecked={preferences.marketingEmails}
                            onChange={(e) => setPreferences({
                              ...preferences,
                              marketingEmails: e.target.checked
                            })}
                          />
                        </FormControl>
                      </MotionBox>

                      <Button
                        colorScheme="teal"
                        size="lg"
                        isLoading={isLoading}
                        onClick={handlePreferencesUpdate}
                        alignSelf="flex-end"
                        mt={4}
                        loadingText="Saving..."
                        leftIcon={<Icon as={FaBell} />}
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'xl',
                          bg: 'teal.400'
                        }}
                        _active={{
                          transform: 'translateY(0)',
                          boxShadow: 'md'
                        }}
                        transition="all 0.2s"
                      >
                        Save Preferences
                      </Button>
                    </VStack>
                  </Box>
                </SlideFade>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </MotionBox>
      </Container>
      </Box>
     </>
    );
  };
  
  export default ProfileSettings;       