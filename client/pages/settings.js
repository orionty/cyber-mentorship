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
  } from '@chakra-ui/react';
  import { useState, useEffect } from 'react';
  import { FaCamera, FaEye, FaEyeSlash, FaBell, FaLock, FaUser } from 'react-icons/fa';
  import { motion } from 'framer-motion';
  import { useRouter } from 'next/router';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
  
  const MotionBox = motion(Box);
  
  const SettingsPage = () => {
    const router = useRouter();
    const toast = useToast();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
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
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
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
  
    return (
     <>
     <Header />
      <Box h={16} />
      <Container maxW="container.xl" py={8}>
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Heading mb={8}>Account Settings</Heading>
          
          <Tabs variant="enclosed" colorScheme="teal">
            <TabList>
              <Tab><Icon as={FaUser} mr={2} /> Profile</Tab>
              <Tab><Icon as={FaLock} mr={2} /> Security</Tab>
              <Tab><Icon as={FaBell} mr={2} /> Preferences</Tab>
            </TabList>
  
            <TabPanels>
              {/* Profile Tab */}
              <TabPanel>
                <Grid templateColumns={{ base: '1fr', md: '200px 1fr' }} gap={8}>
                  <GridItem>
                    <VStack spacing={6}>
                      <Box
                        position="relative"
                        borderRadius="full"
                        boxShadow="lg"
                        p={1}
                        bg="teal.50"
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
                          bottom={0}
                          right={0}
                          rounded="full"
                          size="sm"
                          colorScheme="teal"
                          leftIcon={<FaCamera />}
                          _hover={{ transform: 'scale(1.05)' }}
                          transition="all 0.2s"
                        >
                          Update
                        </Button>
                      </Box>
                      <Text color="gray.500" fontSize="sm" textAlign="center">
                        Recommended size: 400x400px
                      </Text>
                    </VStack>
                  </GridItem>

                  <GridItem>
                    <form onSubmit={handleProfileUpdate}>
                      <VStack spacing={8} align="stretch">
                        <Box
                          p={6}
                          bg={useColorModeValue('white', 'gray.800')}
                          borderRadius="xl"
                          boxShadow="sm"
                          borderWidth="1px"
                          borderColor={useColorModeValue('gray.100', 'gray.700')}
                        >
                          <Text fontSize="lg" fontWeight="semibold" mb={4}>
                            Personal Information
                          </Text>
                          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                            <FormControl>
                              <FormLabel fontWeight="medium">First Name</FormLabel>
                              <Input
                                value={profileData.firstName}
                                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                bg={useColorModeValue('gray.50', 'gray.900')}
                                borderRadius="md"
                                _hover={{ borderColor: 'teal.300' }}
                                _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
                              />
                            </FormControl>
                            <FormControl>
                              <FormLabel fontWeight="medium">Last Name</FormLabel>
                              <Input
                                value={profileData.lastName}
                                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                bg={useColorModeValue('gray.50', 'gray.900')}
                                borderRadius="md"
                                _hover={{ borderColor: 'teal.300' }}
                                _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
                              />
                            </FormControl>
                          </Grid>
                        </Box>

                        <Box
                          p={6}
                          bg={useColorModeValue('white', 'gray.800')}
                          borderRadius="xl"
                          boxShadow="sm"
                          borderWidth="1px"
                          borderColor={useColorModeValue('gray.100', 'gray.700')}
                        >
                          <Text fontSize="lg" fontWeight="semibold" mb={4}>
                            Contact Details
                          </Text>
                          <VStack spacing={4}>
                            <FormControl>
                              <FormLabel fontWeight="medium">Email Address</FormLabel>
                              <Input
                                type="email"
                                value={profileData.email}
                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                bg={useColorModeValue('gray.50', 'gray.900')}
                                borderRadius="md"
                                _hover={{ borderColor: 'teal.300' }}
                                _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
                              />
                            </FormControl>

                            <FormControl>
                              <FormLabel fontWeight="medium">Phone Number</FormLabel>
                              <Input
                                type="tel"
                                value={profileData.phone}
                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                bg={useColorModeValue('gray.50', 'gray.900')}
                                borderRadius="md"
                                _hover={{ borderColor: 'teal.300' }}
                                _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
                              />
                            </FormControl>
                          </VStack>
                        </Box>

                        <Box
                          p={6}
                          bg={useColorModeValue('white', 'gray.800')}
                          borderRadius="xl"
                          boxShadow="sm"
                          borderWidth="1px"
                          borderColor={useColorModeValue('gray.100', 'gray.700')}
                        >
                          <Text fontSize="lg" fontWeight="semibold" mb={4}>
                            About Me
                          </Text>
                          <FormControl>
                            <FormLabel fontWeight="medium">Bio</FormLabel>
                            <Textarea
                              value={profileData.bio}
                              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                              bg={useColorModeValue('gray.50', 'gray.900')}
                              borderRadius="md"
                              _hover={{ borderColor: 'teal.300' }}
                              _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
                              minH="120px"
                              resize="vertical"
                            />
                          </FormControl>
                        </Box>

                        <Button
                          type="submit"
                          colorScheme="teal"
                          size="lg"
                          isLoading={isLoading}
                          loadingText="Saving..."
                          w={{ base: 'full', md: 'auto' }}
                          alignSelf={{ base: 'stretch', md: 'flex-start' }}
                          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                          transition="all 0.2s"
                        >
                          Save Changes
                        </Button>
                      </VStack>
                    </form>
                  </GridItem>
                </Grid>
              </TabPanel>
  
              {/* Security Tab */}
              <TabPanel>
                <Box
                  bg={bgColor}
                  p={8}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={borderColor}
                  boxShadow="xl"
                  maxW="2xl"
                  mx="auto"
                >
                  <VStack spacing={6} align="stretch" mb={8}>
                    <Heading size="md" color="teal.500">
                      Change Your Password
                    </Heading>
                    <Text color="gray.600">
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
                            bg={useColorModeValue('gray.50', 'gray.900')}
                            borderRadius="md"
                            _hover={{ borderColor: 'teal.300' }}
                            _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
                          />
                          <InputRightElement width="4.5rem">
                            <Button
                              h="1.75rem"
                              size="sm"
                              variant="ghost"
                              color="gray.500"
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
                          bg={useColorModeValue('gray.50', 'gray.900')}
                          borderRadius="md"
                          _hover={{ borderColor: 'teal.300' }}
                          _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
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
                          bg={useColorModeValue('gray.50', 'gray.900')}
                          borderRadius="md"
                          _hover={{ borderColor: 'teal.300' }}
                          _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
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
                        _hover={{
                          transform: 'translateY(-2px)',
                          boxShadow: 'lg',
                        }}
                        transition="all 0.2s"
                      >
                        Update Password
                      </Button>
                    </VStack>
                  </form>
                </Box>
              </TabPanel>
  
              {/* Preferences Tab */}
              <TabPanel>
                <Box
                  bg={bgColor}
                  p={8}
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor={borderColor}
                  boxShadow="lg"
                  _hover={{ borderColor: 'teal.200' }}
                  transition="all 0.2s"
                >
                  <VStack spacing={8} align="stretch">
                    <Heading size="md" color="teal.500" mb={2}>
                      Notification Preferences
                    </Heading>

                    <FormControl 
                      display="flex" 
                      alignItems="center" 
                      bg={useColorModeValue('gray.50', 'gray.800')}
                      p={4}
                      borderRadius="md"
                      transition="all 0.2s"
                      _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                    >
                      <Box flex="1">
                        <FormLabel mb="0" fontSize="lg" fontWeight="medium">
                          Email Notifications
                        </FormLabel>
                        <Text fontSize="sm" color="gray.500">
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

                    <FormControl 
                      display="flex" 
                      alignItems="center"
                      bg={useColorModeValue('gray.50', 'gray.800')}
                      p={4}
                      borderRadius="md"
                      transition="all 0.2s"
                      _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                    >
                      <Box flex="1">
                        <FormLabel mb="0" fontSize="lg" fontWeight="medium">
                          SMS Notifications
                        </FormLabel>
                        <Text fontSize="sm" color="gray.500">
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

                    <FormControl 
                      display="flex" 
                      alignItems="center"
                      bg={useColorModeValue('gray.50', 'gray.800')}
                      p={4}
                      borderRadius="md"
                      transition="all 0.2s"
                      _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                    >
                      <Box flex="1">
                        <FormLabel mb="0" fontSize="lg" fontWeight="medium">
                          Marketing Emails
                        </FormLabel>
                        <Text fontSize="sm" color="gray.500">
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
                        boxShadow: 'lg',
                      }}
                      transition="all 0.2s"
                    >
                      Save Preferences
                    </Button>
                  </VStack>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </MotionBox>
      </Container>
     <Footer />
     </>
    );
  };
  
  export default SettingsPage;