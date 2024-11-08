import { Box, Flex, Text, VStack, SimpleGrid, Badge as ChakraBadge, IconButton, Tooltip, HStack, Collapse, Button, useColorModeValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, useDisclosure, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaEye, FaEyeSlash, FaThumbtack, FaShareAlt, FaClock, FaCalendarAlt, FaExclamationCircle, FaLink, FaTwitter, FaLinkedin, FaFacebook, FaCopy } from 'react-icons/fa';
import { useState } from 'react';

const MotionBox = motion(Box);

const Announcements = () => {
  // Sample Announcements Data
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'New Cybersecurity Course Available!',
      date: '2024-11-01',
      description: 'Enroll in our latest cybersecurity course designed to improve your skills in network protection and threat detection.',
      priority: 'Urgent',
      unread: true,
      pinned: true,
    },
    {
      id: 2,
      title: 'Scheduled Maintenance on November 10th',
      date: '2024-11-10', 
      description: 'Our system will be undergoing scheduled maintenance on November 10th. Please save your work before this date.',
      priority: 'Update',
      unread: true,
      pinned: false,
    },
    {
      id: 3,
      title: 'Cybersecurity Webinar Next Week',
      date: '2024-11-15',
      description: 'Join us for an exclusive webinar featuring industry experts discussing the latest trends in cybersecurity.',
      priority: 'Event',
      unread: false,
      pinned: false,
    },
    {
      id: 4,
      title: 'Feature Update: Enhanced Security Dashboard',
      date: '2024-11-20',
      description: "We've updated your dashboard to include new security features that allow better tracking of your progress. Learn more about these enhancements and how they can benefit you in achieving your security goals. Detailed steps and FAQs are available in our Help Center.",
      priority: 'Update',
      unread: true,
      pinned: false,
    },
  ]);

  const [expanded, setExpanded] = useState({});
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const unreadBgColor = useColorModeValue('blue.50', 'blue.900');
  const textColor = useColorModeValue('gray.700', 'white');
  const subTextColor = useColorModeValue('gray.500', 'gray.400');
  const modalBg = useColorModeValue('white', 'gray.800');

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const toggleReadStatus = (id) => {
    setAnnouncements(prevAnnouncements => 
      prevAnnouncements.map(announcement => 
        announcement.id === id ? { ...announcement, unread: !announcement.unread } : announcement
      )
    );
  };

  const toggleExpand = (id) => {
    setExpanded(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  const handleShare = (announcement) => {
    setSelectedAnnouncement(announcement);
    onOpen();
  };

  const getShareUrl = (announcementId) => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/announcement/${announcementId}`;
    }
    return '';
  };

  const copyToClipboard = () => {
    const shareUrl = getShareUrl(selectedAnnouncement.id);
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  const shareToSocial = (platform) => {
    const shareUrl = getShareUrl(selectedAnnouncement.id);
    const text = encodeURIComponent(selectedAnnouncement.title);
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
    };

    if (typeof window !== 'undefined') {
      window.open(urls[platform], '_blank');
    }
  };

  return (
    <Box p={6} pl={{ base: 16, md: 24 }}>
      <VStack align="flex-start" mb={8} spacing={4}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Text 
            fontSize="3xl" 
            fontWeight="extrabold" 
            bgGradient="linear(to-r, teal.400, blue.500)"
            bgClip="text"
          >
            Announcements
          </Text>
        </motion.div>
        <Text fontSize="md" color={subTextColor}>Stay updated with the latest news and events in the program.</Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
        <AnimatePresence>
          {announcements
            .sort((a, b) => b.pinned - a.pinned)
            .map((announcement, index) => (
              <MotionBox
                key={announcement.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                p={6}
                bg={announcement.unread ? unreadBgColor : bgColor}
                borderRadius="xl"
                boxShadow="lg"
                position="relative"
                _hover={{
                  transform: "translateY(-5px)",
                  boxShadow: "2xl",
                  transition: "all 0.3s ease"
                }}
                borderLeft="4px solid"
                borderLeftColor={announcement.priority === 'Urgent' ? 'red.400' : 
                               announcement.priority === 'Event' ? 'purple.400' : 'blue.400'}
              >
                {announcement.pinned && (
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                  >
                    <IconButton
                      icon={<FaThumbtack />}
                      colorScheme="yellow"
                      variant="solid"
                      size="sm"
                      isRound
                      aria-label="Pinned"
                    />
                  </motion.div>
                )}

                <Flex direction="column" gap={4}>
                  <HStack justify="space-between" align="flex-start">
                    <VStack align="start" spacing={2}>
                      <Text fontSize="xl" fontWeight="bold" color={textColor}>
                        {announcement.title}
                      </Text>
                      <HStack spacing={3}>
                        <ChakraBadge
                          colorScheme={
                            announcement.priority === 'Urgent' ? 'red' :
                            announcement.priority === 'Event' ? 'purple' : 'blue'
                          }
                          borderRadius="full"
                          px={3}
                          py={1}
                          variant="subtle"
                        >
                          {announcement.priority}
                        </ChakraBadge>
                        <Text fontSize="sm" color={subTextColor}>
                          {announcement.date}
                        </Text>
                      </HStack>
                    </VStack>
                  </HStack>

                  <Box>
                    <Collapse in={expanded[announcement.id]} startingHeight={50}>
                      <Text fontSize="md" color={subTextColor} lineHeight="tall">
                        {announcement.description}
                      </Text>
                    </Collapse>
                    <Button
                      size="sm"
                      variant="ghost"
                      colorScheme="teal"
                      onClick={() => toggleExpand(announcement.id)}
                      mt={2}
                      _hover={{ bg: 'teal.50' }}
                    >
                      {expanded[announcement.id] ? 'Show Less' : 'Show More'}
                    </Button>
                  </Box>

                  <HStack justify="space-between" mt={2}>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <IconButton
                        icon={announcement.unread ? <FaEyeSlash /> : <FaEye />}
                        variant="ghost"
                        colorScheme="teal"
                        onClick={() => toggleReadStatus(announcement.id)}
                        aria-label="Read Status"
                        size="md"
                      />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <IconButton
                        icon={<FaShareAlt />}
                        variant="ghost"
                        colorScheme="teal"
                        aria-label="Share"
                        size="md"
                        onClick={() => handleShare(announcement)}
                      />
                    </motion.div>
                  </HStack>
                </Flex>
              </MotionBox>
            ))}
        </AnimatePresence>
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent bg={modalBg} borderRadius="xl" mx={4}>
          <ModalHeader borderBottomWidth="1px" pb={4}>
            Share Announcement
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <VStack spacing={6}>
              <Box w="full">
                <Text mb={2} fontWeight="medium">Share Link</Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaLink color="gray.300" />
                  </InputLeftElement>
                  <Input 
                    value={getShareUrl(selectedAnnouncement?.id)}
                    isReadOnly
                    pr="4.5rem"
                  />
                  <Button
                    position="absolute"
                    right={0}
                    top={0}
                    h="full"
                    px={4}
                    colorScheme="teal"
                    onClick={copyToClipboard}
                    leftIcon={<FaCopy />}
                  >
                    Copy
                  </Button>
                </InputGroup>
              </Box>
              
              <Box w="full">
                <Text mb={3} fontWeight="medium">Share on Social Media</Text>
                <HStack spacing={4} justify="center">
                  <IconButton
                    icon={<FaTwitter />}
                    colorScheme="twitter"
                    rounded="full"
                    size="lg"
                    onClick={() => shareToSocial('twitter')}
                  />
                  <IconButton
                    icon={<FaLinkedin />}
                    colorScheme="linkedin"
                    rounded="full"
                    size="lg"
                    onClick={() => shareToSocial('linkedin')}
                  />
                  <IconButton
                    icon={<FaFacebook />}
                    colorScheme="facebook"
                    rounded="full"
                    size="lg"
                    onClick={() => shareToSocial('facebook')}
                  />
                </HStack>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter borderTopWidth="1px" pt={4}>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Announcements;
