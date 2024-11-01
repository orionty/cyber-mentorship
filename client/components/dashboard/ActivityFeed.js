import { Box, Flex, Text, VStack, HStack, Badge as ChakraBadge, IconButton, Tooltip, Collapse, Button, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaUserCheck, FaPen, FaBell, FaSignInAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useState } from 'react';

const MotionBox = motion(Box);

const ActivityFeed = () => {
  // Sample Activity Feed Data
  const activities = [
    {
      id: 1,
      title: 'Login Successful',
      timestamp: '2024-11-10 08:45 AM',
      description: 'User logged in from a new device in New York, USA.',
      type: 'Login',
    },
    {
      id: 2,
      title: 'Profile Updated',
      timestamp: '2024-11-08 03:15 PM',
      description: 'User updated personal information including phone number and email address.',
      type: 'Update',
    },
    {
      id: 3,
      title: 'New Feature Alert',
      timestamp: '2024-11-05 10:00 AM',
      description: 'Check out the new dark mode feature available in settings. Customize your dashboard appearance to suit your preference.',
      type: 'Alert',
    },
    {
      id: 4,
      title: 'Password Changed',
      timestamp: '2024-11-01 07:30 PM',
      description: 'User successfully changed account password.',
      type: 'Security',
    },
  ];

  const [expanded, setExpanded] = useState({}); // State for expanded messages

  // Toggle Expanded State for Description
  const toggleExpand = (id) => {
    setExpanded(prevState => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <Box p={4}>
      <VStack align="flex-start" mb={4}>
        <Text fontSize="2xl" fontWeight="bold" color="teal.700">Activity Feed</Text>
        <Text fontSize="sm" color="gray.500">Stay up-to-date with recent activities in your account.</Text>
      </VStack>

      {/* Activity Cards */}
      <VStack spacing={4} divider={<Divider borderColor="gray.200" />}>
        {activities.map((activity, index) => (
          <MotionBox
            key={activity.id}
            p={5}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            textAlign="left"
            whileHover={{ scale: 1.02, y: -3 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
          >
            {/* Header with Title, Type Icon, and Badge */}
            <Flex justify="space-between" align="center" mb={2}>
              <HStack>
                <Text fontSize="lg" fontWeight="bold" color="gray.700">
                  {activity.title}
                </Text>
                <Tooltip label={activity.type}>
                  <Box>
                    {activity.type === 'Login' && <FaSignInAlt color="blue" />}
                    {activity.type === 'Update' && <FaPen color="green" />}
                    {activity.type === 'Alert' && <FaBell color="orange" />}
                    {activity.type === 'Security' && <FaUserCheck color="red" />}
                  </Box>
                </Tooltip>
              </HStack>
              <ChakraBadge
                colorScheme={
                  activity.type === 'Login' ? 'blue' :
                  activity.type === 'Update' ? 'green' :
                  activity.type === 'Alert' ? 'orange' : 'red'
                }
                borderRadius="full"
                px={2}
              >
                {activity.type}
              </ChakraBadge>
            </Flex>

            {/* Timestamp */}
            <Text fontSize="xs" color="gray.500" mb={2}>
              {activity.timestamp}
            </Text>

            {/* Collapsible Description */}
            <Collapse in={expanded[activity.id]} startingHeight={20}>
              <Text fontSize="sm" color="gray.600">
                {activity.description}
              </Text>
            </Collapse>
            <Button
              size="sm"
              variant="link"
              colorScheme="teal"
              mt={2}
              onClick={() => toggleExpand(activity.id)}
              rightIcon={expanded[activity.id] ? <FaChevronUp /> : <FaChevronDown />}
            >
              {expanded[activity.id] ? 'Show Less' : 'Show More'}
            </Button>
          </MotionBox>
        ))}
      </VStack>
    </Box>
  );
};

export default ActivityFeed;
