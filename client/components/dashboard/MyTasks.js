import { Box, Flex, Text, Icon, Badge, Button, SimpleGrid, HStack, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaFilter } from 'react-icons/fa';
import { useState } from 'react';

const MotionBox = motion(Box);

const MyTasks = () => {
  // Sample Tasks Data
  const tasks = [
    { id: 1, title: 'Complete Cybersecurity Course Module 1', dueDate: '2024-11-01', status: 'Pending' },
    { id: 2, title: 'Prepare for Mentorship Session', dueDate: '2024-11-05', status: 'In Progress' },
    { id: 3, title: 'Submit Project Report', dueDate: '2024-11-10', status: 'Completed' },
    { id: 4, title: 'Review Security Guidelines', dueDate: '2024-11-12', status: 'Pending' },
    { id: 5, title: 'Attend Networking Event', dueDate: '2024-11-15', status: 'In Progress' },
  ];

  const [filter, setFilter] = useState('All'); // Filter state

  // Filtered Tasks based on Status
  const filteredTasks = tasks.filter(task =>
    filter === 'All' ? true : task.status === filter
  );

  return (
    <Box 
      p={{ base: 2, sm: 4, md: 6 }}
      ml={{ base: "60px", sm: "70px", md: "100px" }}
      mr={{ base: 2, sm: 3, md: 4 }}
      my={{ base: 2, sm: 3, md: 4 }}
      bg="gray.50"
      minH="100vh"
      borderRadius="xl"
      overflowX="hidden"
      width="auto"
    >
      <VStack align="flex-start" mb={{ base: 3, md: 6 }} spacing={{ base: 2, md: 4 }}>
        <Text 
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="bold" 
          color="teal.700"
          bgGradient="linear(to-r, teal.500, teal.300)"
          bgClip="text"
        >
          My Tasks
        </Text>
        
        {/* Filter Options */}
        <HStack spacing={{ base: 2, md: 4 }} flexWrap="wrap">
          {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
            <Button
              key={status}
              size="sm"
              variant="outline"
              colorScheme={filter === status ? 'teal' : 'gray'}
              onClick={() => setFilter(status)}
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'md'
              }}
              transition="all 0.2s"
              mb={{ base: 1, md: 0 }}
            >
              {status}
            </Button>
          ))}
        </HStack>
      </VStack>

      {/* Task Cards */}
      <SimpleGrid 
        columns={{ base: 1, sm: 2, lg: 3 }} 
        spacing={{ base: 3, md: 6 }}
        width="100%"
      >
        {filteredTasks.map((task, index) => (
          <MotionBox
            key={task.id}
            p={{ base: 3, md: 6 }}
            bg="white"
            borderRadius="xl"
            boxShadow="base"
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "xl",
              translateY: -5
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.1, 
              duration: 0.4, 
              ease: 'easeOut',
              type: "spring",
              stiffness: 100
            }}
            width="100%"
          >
            <Flex justify="space-between" align="center" flexWrap="wrap">
              <Text 
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="bold" 
                color="gray.700"
                noOfLines={2}
                flex="1"
                mr={2}
              >
                {task.title}
              </Text>
              <Badge
                px={3}
                py={1}
                borderRadius="full"
                variant="subtle"
                colorScheme={
                  task.status === 'Pending'
                    ? 'yellow'
                    : task.status === 'In Progress'
                    ? 'blue'
                    : 'green'
                }
                mb={{ base: 2, md: 0 }}
              >
                {task.status}
              </Badge>
            </Flex>
            <Text fontSize="sm" color="gray.500" mt={3}>
              Due Date: {task.dueDate}
            </Text>
            <HStack spacing={{ base: 2, md: 4 }} mt={5} flexWrap="wrap">
              {/* Mark Complete Button */}
              {task.status !== 'Completed' && (
                <Button
                  size="sm"
                  colorScheme="teal"
                  leftIcon={<FaCheckCircle />}
                  onClick={() => alert(`Marking task ${task.title} as completed`)}
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'md'
                  }}
                  transition="all 0.2s"
                  mb={{ base: 2, md: 0 }}
                  width={{ base: "100%", md: "auto" }}
                >
                  Mark as Complete
                </Button>
              )}
              {/* Delete Button */}
              <Button
                size="sm"
                colorScheme="red"
                variant="outline"
                leftIcon={<FaTimesCircle />}
                onClick={() => alert(`Deleting task ${task.title}`)}
                _hover={{
                  transform: 'translateY(-2px)',
                  shadow: 'md',
                  bg: 'red.50'
                }}
                transition="all 0.2s"
                width={{ base: "100%", md: "auto" }}
              >
                Delete
              </Button>
            </HStack>
          </MotionBox>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default MyTasks;
