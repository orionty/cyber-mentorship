import { Box, Flex, Text, VStack, HStack, Badge as ChakraBadge, IconButton, Tooltip, Collapse, Button, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaBell, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp, FaExclamationCircle, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

const MotionBox = motion(Box);

const Notifications = () => {
  // Sample Notifications Data
  const notifications = [
    {
      id: 1,
      title: 'System Maintenance Scheduled',
      date: '2024-11-10',
      message: 'Our system will be undergoing maintenance on November 10th from 12:00 AM to 4:00 AM. Please save your work.',
      priority: 'High',
      unread: true,
    },
    {
      id: 2,
      title: 'Password Changed Successfully',
      date: '2024-11-08',
      message: 'You have successfully changed your password. If this wasn’t you, please contact support immediately.',
      priority: 'Medium',
      unread: false,
    },
    {
      id: 3,
      title: 'New Cybersecurity Webinar',
      date: '2024-11-15',
      message: 'Join our upcoming webinar on Cybersecurity Trends, featuring industry experts. Click here to register.',
      priority: 'Low',
      unread: true,
    },
    {
      id: 4,
      title: 'Profile Completion Reminder',
      date: '2024-11-05',
      message: 'Complete your profile to gain access to all features of the platform.',
      priority: 'Medium',
      unread: false,
    },
  ];

  const [expanded, setExpanded] = useState({}); // State for expanded notifications

  // Toggle Read/Unread State
  const toggleReadStatus = (id) => {
    const updatedNotifications = notifications.map(notification => 
      notification.id === id ? { ...notification, unread: !notification.unread } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Toggle Expanded State for Message
  const toggleExpand = (id) => {
    setExpanded(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <Box p={4}>
      <VStack align="flex-start" mb={4}>
        <Text fontSize="2xl" fontWeight="bold" color="teal.700">Notifications</Text>
        <Text fontSize="sm" color="gray.500">Stay updated with recent notifications and alerts.</Text>
      </VStack>

      {/* Notification Cards */}
      <VStack spacing={4} divider={<Divider borderColor="gray.200" />}>
        {notifications.map((notification, index) => (
          <MotionBox
            key={notification.id}
            p={5}
            bg={notification.unread ? "blue.50" : "white"}
            borderRadius="md"
            boxShadow="md"
            textAlign="left"
            whileHover={{ scale: 1.02, y: -3 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
          >
            {/* Header with Title, Priority Icon, and Status Badge */}
            <Flex justify="space-between" align="center" mb={2}>
              <HStack>
                <Text fontSize="lg" fontWeight="bold" color="gray.700">
                  {notification.title}
                </Text>
                {notification.priority && (
                  <Tooltip label={notification.priority}>
                    <Box>
                      {notification.priority === 'High' && <FaExclamationCircle color="red" />}
                      {notification.priority === 'Medium' && <FaInfoCircle color="orange" />}
                      {notification.priority === 'Low' && <FaCheckCircle color="green" />}
                    </Box>
                  </Tooltip>
                )}
              </HStack>
              <Flex>
                {notification.priority && (
                  <ChakraBadge
                    colorScheme={
                      notification.priority === 'High' ? 'red' :
                      notification.priority === 'Medium' ? 'orange' : 'green'
                    }
                    borderRadius="full"
                    px={2}
                  >
                    {notification.priority}
                  </ChakraBadge>
                )}
                <Tooltip label={notification.unread ? 'Mark as Read' : 'Mark as Unread'} aria-label="Read Status">
                  <IconButton
                    icon={notification.unread ? <FaEyeSlash /> : <FaEye />}
                    variant="ghost"
                    colorScheme="teal"
                    onClick={() => toggleReadStatus(notification.id)}
                    aria-label="Read Status"
                    size="sm"
                    ml={2}
                  />
                </Tooltip>
              </Flex>
            </Flex>

            {/* Notification Date */}
            <Text fontSize="xs" color="gray.500" mb={2}>
              {notification.date}
            </Text>

            {/* Collapsible Message */}
            <Collapse in={expanded[notification.id]} startingHeight={20}>
              <Text fontSize="sm" color="gray.600">
                {notification.message}
              </Text>
            </Collapse>
            <Button
              size="sm"
              variant="link"
              colorScheme="teal"
              mt={2}
              onClick={() => toggleExpand(notification.id)}
              rightIcon={expanded[notification.id] ? <FaChevronUp /> : <FaChevronDown />}
            >
              {expanded[notification.id] ? 'Show Less' : 'Show More'}
            </Button>
          </MotionBox>
        ))}
      </VStack>
    </Box>
  );
};

export default Notifications;
