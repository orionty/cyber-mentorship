import { Box, Flex, Text, VStack, CircularProgress, CircularProgressLabel, SimpleGrid } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ProgressTracker = () => {
  // Sample Progress Data
  const progressData = [
    { title: 'Tasks Completed', percentage: 75, color: 'teal.500' },
    { title: 'Courses Completed', percentage: 50, color: 'blue.500' },
    { title: 'Mentorship Goals', percentage: 60, color: 'purple.500' },
    { title: 'Achievements Earned', percentage: 90, color: 'orange.500' },
  ];

  return (
    <Box p={4} ml={{ base: "60px", sm: "70px", md: "60px" }}>
      <VStack align="flex-start" mb={4}>
        <Text fontSize="3xl" fontWeight="extrabold" color="teal.700">Progress Tracker</Text>
        <Text fontSize="md" color="gray.500">Track your progress towards various mentorship goals.</Text>
      </VStack>

      {/* Progress Indicators */}
      <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing={8}>
        {progressData.map((item, index) => (
          <MotionBox
            key={index}
            p={8}
            bg="white"
            borderRadius="lg"
            boxShadow="2xl"
            textAlign="center"
            whileHover={{ scale: 1.1, rotate: 2 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
          >
            <CircularProgress
              value={item.percentage}
              color={item.color}
              size="120px"
              thickness="10px"
            >
              <CircularProgressLabel fontSize="2xl" fontWeight="bold">
                {item.percentage}%
              </CircularProgressLabel>
            </CircularProgress>
            <Text fontSize="xl" fontWeight="bold" color="gray.700" mt={4}>
              {item.title}
            </Text>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProgressTracker;
