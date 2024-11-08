import { Box, Flex, Text, Icon, SimpleGrid, Container } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTasks,
  FaChalkboardTeacher,
  FaChartLine,
  FaBell,
  FaClock,
  FaGraduationCap,
  FaUsers,
  FaInbox,
  FaTrophy,
} from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const Overview = () => {
  const metrics = [
    {
      title: 'Total Tasks',
      icon: FaTasks,
      count: 120,
      color: 'teal.500',
    },
    {
      title: 'Upcoming Sessions', 
      icon: FaChalkboardTeacher,
      count: 3,
      color: 'blue.500',
    },
    {
      title: 'Progress',
      icon: FaChartLine,
      count: '75%',
      color: 'green.500',
    },
    {
      title: 'Notifications',
      icon: FaBell,
      count: 8,
      color: 'orange.500',
    },
    {
      title: 'Mentorship Hours',
      icon: FaClock,
      count: '25h',
      color: 'purple.500',
    },
    {
      title: 'Completed Courses',
      icon: FaGraduationCap,
      count: 5,
      color: 'cyan.500',
    },
    {
      title: 'Active Mentors',
      icon: FaUsers,
      count: 2,
      color: 'pink.500',
    },
    {
      title: 'Pending Tasks',
      icon: FaTasks,
      count: 12,
      color: 'red.500',
    },
    {
      title: 'New Messages',
      icon: FaInbox,
      count: 4,
      color: 'yellow.500',
    },
    {
      title: 'Achievements Earned',
      icon: FaTrophy,
      count: 10,
      color: 'gold.500',
    },
  ];

  return (
    <Box
      width="100%"
      minHeight="100vh"
      bg="gray.50"
      p={{ base: 2, md: 8 }}
      ml={{ base: "60px", md: "60px" }}
      overflowX="hidden"
    >
      <AnimatePresence>
        <SimpleGrid 
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }} 
          spacing={{ base: 3, md: 6 }}
          width="100%"
          maxW="1400px"
          mx="auto"
          px={{ base: 2, md: 4 }}
        >
          {metrics.map((metric, index) => (
            <MotionBox
              key={index}
              bg="white"
              p={{ base: 4, md: 6 }}
              borderRadius="xl"
              boxShadow="lg"
              textAlign="center"
              position="relative"
              overflow="hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.4,
                  delay: index * 0.1,
                  ease: "easeOut"
                }
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "xl",
                transition: { 
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }}
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(135deg, ${metric.color}15, transparent)`,
                borderRadius: 'xl',
              }}
            >
              <MotionFlex
                direction="column"
                align="center"
                justify="center"
                height="100%"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: index * 0.1 + 0.2 }
                }}
              >
                <Icon
                  as={metric.icon}
                  boxSize={{ base: 6, md: 8 }}
                  color={metric.color}
                  mb={3}
                />
                <Text 
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold" 
                  color="gray.800"
                  mb={2}
                >
                  {metric.count}
                </Text>
                <Text 
                  fontSize={{ base: "xs", md: "sm" }}
                  color="gray.600"
                  fontWeight="medium"
                >
                  {metric.title}
                </Text>
              </MotionFlex>
            </MotionBox>
          ))}
        </SimpleGrid>
      </AnimatePresence>
    </Box>
  );
};

export default Overview;
