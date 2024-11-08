import { Box, Flex, Text, Icon, VStack, SimpleGrid, Progress, Badge as ChakraBadge, Tooltip } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaAward, FaLock, FaCheckCircle, FaMedal, FaStar } from 'react-icons/fa';

const MotionBox = motion(Box);

const AchievementsAndBadges = () => {
  // Enhanced Badges Data with more engaging descriptions
  const badges = [
    { 
      title: 'Cybersecurity Guardian', 
      description: 'Mastered the fundamentals of cybersecurity and demonstrated exceptional knowledge in protecting digital assets.',
      icon: FaMedal,
      level: 'Gold',
      status: 'Earned',
      color: 'yellow.400',
      stars: 5
    },
    {
      title: 'Network Sentinel',
      description: 'Achieved outstanding expertise in network security protocols and threat detection.',
      icon: FaMedal,
      level: 'Silver',
      status: 'Earned',
      color: 'gray.500',
      stars: 4
    },
    {
      title: 'Mentorship Champion',
      description: 'On track to becoming a valued member of our mentorship community.',
      icon: FaCheckCircle,
      level: 'Bronze',
      status: 'In Progress',
      progress: 60,
      color: 'orange.500',
      stars: 3
    },
    {
      title: 'Privacy Warrior',
      description: 'The ultimate recognition for mastering advanced data privacy concepts and implementations.',
      icon: FaLock,
      level: 'Gold',
      status: 'Locked',
      color: 'gray.400',
      stars: 5
    },
  ];

  return (
    <Box p={6} ml={{ base: "60px", sm: "70px", md: "60px" }} bg="gray.50">
      <VStack align="flex-start" mb={6}>
        <Text 
          fontSize="3xl" 
          fontWeight="extrabold" 
          bgGradient="linear(to-r, teal.500, blue.500)"
          bgClip="text"
          letterSpacing="tight"
        >
          Achievements Gallery
        </Text>
        <Text fontSize="md" color="gray.600" maxW="xl" lineHeight="tall">
          Your journey of excellence captured through prestigious badges and remarkable achievements.
        </Text>
      </VStack>

      <AnimatePresence>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 2, lg: 4 }} spacing={8}>
          {badges.map((badge, index) => (
            <Tooltip 
              label={badge.description} 
              key={index} 
              hasArrow 
              placement="top" 
              bg="gray.700" 
              color="white"
              p={3}
              borderRadius="md"
            >
              <MotionBox
                p={6}
                bg="white"
                borderRadius="xl"
                boxShadow="xl"
                textAlign="center"
                position="relative"
                overflow="hidden"
                whileHover={{ 
                  scale: 1.05,
                  rotate: badge.status === 'Earned' ? 3 : 0,
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: index * 0.2, duration: 0.5 }
                }}
                _before={{
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: badge.status === 'Earned' 
                    ? `linear-gradient(to right, ${badge.color}, teal.300)`
                    : 'gray.200'
                }}
              >
                <Flex justify="center" position="relative" mb={6}>
                  <Icon
                    as={badge.icon}
                    boxSize={16}
                    color={badge.color}
                    style={{
                      filter: badge.level === 'Gold' 
                        ? 'drop-shadow(0 0 12px rgba(255, 215, 0, 0.8))'
                        : badge.level === 'Silver'
                        ? 'drop-shadow(0 0 8px rgba(192, 192, 192, 0.6))'
                        : 'none',
                    }}
                  />
                  <ChakraBadge
                    position="absolute"
                    top="-2"
                    right="-2"
                    px={3}
                    py={1}
                    borderRadius="full"
                    bg={badge.level === 'Gold' ? 'yellow.400' : badge.level === 'Silver' ? 'gray.400' : 'orange.400'}
                    color="white"
                    fontSize="xs"
                    fontWeight="bold"
                    boxShadow="md"
                  >
                    {badge.level}
                  </ChakraBadge>
                </Flex>

                <Text 
                  fontSize="xl" 
                  fontWeight="bold" 
                  color="gray.800"
                  mb={2}
                >
                  {badge.title}
                </Text>

                <Flex justify="center" mb={3}>
                  {[...Array(badge.stars)].map((_, i) => (
                    <Icon 
                      key={i} 
                      as={FaStar} 
                      color={badge.status === 'Locked' ? 'gray.300' : 'yellow.400'} 
                      boxSize={4}
                      mx={0.5}
                    />
                  ))}
                </Flex>

                {badge.status === 'Earned' && (
                  <ChakraBadge 
                    colorScheme="green" 
                    variant="solid" 
                    borderRadius="full" 
                    px={3}
                    py={1}
                  >
                    Earned
                  </ChakraBadge>
                )}
                {badge.status === 'In Progress' && (
                  <Box mt={4}>
                    <Text fontSize="sm" color="orange.500" mb={2} fontWeight="medium">
                      {badge.progress}% Complete
                    </Text>
                    <Progress 
                      value={badge.progress} 
                      colorScheme="orange" 
                      size="sm" 
                      borderRadius="full"
                      hasStripe 
                      isAnimated 
                    />
                  </Box>
                )}
                {badge.status === 'Locked' && (
                  <ChakraBadge 
                    colorScheme="gray" 
                    variant="subtle" 
                    borderRadius="full"
                    px={3}
                    py={1}
                  >
                    Locked
                  </ChakraBadge>
                )}
              </MotionBox>
            </Tooltip>
          ))}
        </SimpleGrid>
      </AnimatePresence>
    </Box>
  );
};

export default AchievementsAndBadges;
