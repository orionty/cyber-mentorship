// DashboardOverview.js
import { Box, Flex, Text, VStack, Icon, useColorModeValue, SimpleGrid, Heading, Divider, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FaUsers, FaFileAlt, FaExclamationTriangle, FaClipboardCheck } from 'react-icons/fa';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const DashboardOverview = () => {
  // Responsive values
  const cardWidth = useBreakpointValue({ base: "100%", sm: "auto" });
  const cardPadding = useBreakpointValue({ base: 4, md: 6 });
  const iconSize = useBreakpointValue({ base: 6, md: 7 });
  const titleSize = useBreakpointValue({ base: "md", md: "lg" });
  const valueSize = useBreakpointValue({ base: "2xl", md: "4xl" });
  
  // Color mode values
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'white');
  const headingColor = useColorModeValue('gray.800', 'white');
  const dividerColor = useColorModeValue('gray.200', 'gray.600');

  // Sample metrics data
  const metrics = [
    {
      title: 'Total Users',
      value: '1,234',
      icon: FaUsers,
      color: 'teal.500',
      bgGradient: 'linear(to-r, teal.400, teal.600)',
    },
    {
      title: 'Total Content',
      value: '456',
      icon: FaFileAlt,
      color: 'blue.500',
      bgGradient: 'linear(to-r, blue.400, blue.600)',
    },
    {
      title: 'Pending Approvals',
      value: '32',
      icon: FaClipboardCheck,
      color: 'orange.500',
      bgGradient: 'linear(to-r, orange.400, orange.600)',
    },
    {
      title: 'System Alerts',
      value: '5',
      icon: FaExclamationTriangle,
      color: 'purple.500',
      bgGradient: 'linear(to-r, purple.400, purple.600)',
    },
  ];

  const containerAnimation = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnimation = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <VStack align="stretch" spacing={8} w="full" px={{ base: 2, md: 4 }}>
      {/* Dashboard Overview Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Heading size={titleSize} color={headingColor} mb={2}>
          Dashboard Overview
        </Heading>
        <Divider borderColor={dividerColor} />
      </MotionBox>

      {/* Metric Cards */}
      <SimpleGrid 
        columns={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 4, md: 6 }}
        w="full"
      >
        {metrics.map((metric, index) => (
          <MotionBox
            key={index}
            variants={itemAnimation}
            initial="hidden"
            animate="show"
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            w={cardWidth}
          >
            <Box
              p={cardPadding}
              borderRadius="xl"
              boxShadow="xl"
              bgGradient={metric.bgGradient}
              color="white"
              position="relative"
              overflow="hidden"
              minH={{ base: "120px", md: "140px" }}
              _before={{
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                bgGradient: 'linear(to-r, whiteAlpha.100, whiteAlpha.200)',
                transform: 'skewX(-15deg) translateX(-100%)',
                transition: '0.5s',
              }}
              _hover={{
                _before: {
                  transform: 'skewX(-15deg) translateX(100%)',
                }
              }}
            >
              <Flex direction="column" h="full" justify="space-between">
                <Flex align="center" mb={3}>
                  <Icon as={metric.icon} boxSize={iconSize} mr={3} />
                  <Text fontSize={titleSize} fontWeight="bold">
                    {metric.title}
                  </Text>
                </Flex>
                <Text fontSize={valueSize} fontWeight="bold">
                  {metric.value}
                </Text>
              </Flex>
            </Box>
          </MotionBox>
        ))}
      </SimpleGrid>

      {/* Recent Activity Feed */}
      <MotionBox
        variants={itemAnimation}
        initial="hidden"
        animate="show"
        bg={bgColor}
        p={{ base: 4, md: 8 }}
        borderRadius="xl"
        boxShadow="xl"
        mt={6}
      >
        <Text fontSize={titleSize} fontWeight="bold" color={textColor} mb={4}>
          Recent Activity
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
          Your recent activity feed will appear here. Stay tuned for updates!
        </Text>
      </MotionBox>
    </VStack>
  );
};

export default DashboardOverview;
