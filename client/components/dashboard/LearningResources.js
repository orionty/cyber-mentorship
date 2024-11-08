import { Box, Flex, Text, Button, VStack, SimpleGrid, Badge as ChakraBadge, HStack, Tag, IconButton, Tooltip, Progress, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, useDisclosure, Image, Icon } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaDownload, FaExternalLinkAlt, FaStar, FaBookmark, FaBookmark as FaBookmarkSolid, FaPlayCircle, FaClock, FaUsers } from 'react-icons/fa';
import { useState } from 'react';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const LearningResources = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedResource, setSelectedResource] = useState(null);

  const initialResources = [
    {
      id: 1,
      title: 'Cybersecurity Fundamentals',
      description: 'An introductory course on cybersecurity principles and practices.',
      category: 'Security',
      difficulty: 'Beginner',
      status: 'New',
      rating: 4.5,
      bookmarked: false,
      progress: 0,
      link: '#',
      color: 'teal',
      duration: '8 weeks',
      students: '2.5k+',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b',
      curriculum: [
        'Introduction to Cybersecurity',
        'Network Security Basics',
        'Threat Detection',
        'Security Best Practices'
      ]
    },
    {
      id: 2,
      title: 'Network Security Essentials',
      description: 'In-depth materials on network security and threat detection.',
      category: 'Networking',
      difficulty: 'Intermediate', 
      status: 'Popular',
      rating: 4.0,
      bookmarked: true,
      progress: 60,
      link: '#',
      color: 'purple',
      duration: '10 weeks',
      students: '1.8k+',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31',
      curriculum: [
        'Advanced Network Protocols',
        'Firewall Configuration',
        'Intrusion Detection Systems',
        'Network Monitoring'
      ]
    },
    {
      id: 3,
      title: 'Data Privacy and Compliance',
      description: 'Guidelines on data privacy laws and compliance for professionals.',
      category: 'Data Privacy',
      difficulty: 'Advanced',
      status: 'New',
      rating: 5.0,
      bookmarked: false,
      progress: 0,
      link: '#',
      color: 'blue',
      duration: '6 weeks',
      students: '1.2k+',
      thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
      curriculum: [
        'Privacy Regulations Overview',
        'GDPR Compliance',
        'Data Protection Strategies',
        'Privacy Impact Assessments'
      ]
    },
    {
      id: 4,
      title: 'Advanced Threat Intelligence',
      description: 'Advanced techniques for identifying and mitigating threats.',
      category: 'Security',
      difficulty: 'Advanced',
      rating: 4.7,
      bookmarked: true,
      progress: 80,
      link: '#',
      color: 'cyan',
      duration: '12 weeks',
      students: '950+',
      thumbnail: 'https://images.unsplash.com/photo-1551808525-51a94da548ce',
      curriculum: [
        'Threat Intelligence Fundamentals',
        'Advanced Threat Hunting',
        'Incident Response',
        'Threat Analysis'
      ]
    },
  ];

  const [filter, setFilter] = useState('All');
  const [resources, setResources] = useState(initialResources);

  const toggleBookmark = (id) => {
    setResources(prev => prev.map(resource => 
      resource.id === id ? { ...resource, bookmarked: !resource.bookmarked } : resource
    ));
  };

  const handleViewCourse = (resource) => {
    setSelectedResource(resource);
    onOpen();
  };

  const filteredResources = resources.filter(resource =>
    filter === 'All' ? true : resource.category === filter
  );

  const headerGradient = "linear(to-r, teal.400, blue.500)";
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      y: -8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Box p={{ base: 6, md: 8 }} pl={{ base: 16, md: 24 }} bg="gray.50" minH="100vh">
      <MotionFlex
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        direction="column"
        align="flex-start"
        mb={8}
      >
        <Text 
          fontSize={{ base: "3xl", md: "4xl" }} 
          fontWeight="extrabold" 
          bgGradient={headerGradient}
          bgClip="text"
          letterSpacing="tight"
        >
          Learning Resources
        </Text>
        <Text fontSize="lg" color="gray.600" mt={3} maxW="xl">
          Enhance your cybersecurity expertise with our curated learning materials.
        </Text>

        <HStack spacing={4} mt={6} wrap="wrap">
          {['All', 'Security', 'Networking', 'Data Privacy'].map(category => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant={filter === category ? "solid" : "outline"}
                colorScheme="teal"
                onClick={() => setFilter(category)}
                borderRadius="full"
                px={6}
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "lg"
                }}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </HStack>
      </MotionFlex>

      <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={8}>
        <AnimatePresence>
          {filteredResources.map((resource, index) => (
            <MotionBox
              key={resource.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover="hover"
              transition={{ duration: 0.3, delay: index * 0.1 }}
              bg="white"
              borderRadius="2xl"
              overflow="hidden"
              position="relative"
              boxShadow="xl"
              height="100%"
              display="flex"
              flexDirection="column"
            >
              <Box 
                position="absolute" 
                top={0} 
                left={0} 
                right={0} 
                h="6px" 
                bgGradient={`linear(to-r, ${resource.color}.400, ${resource.color}.600)`}
              />
              
              <Box p={8} flex="1" display="flex" flexDirection="column">
                <Flex justify="space-between" align="center" mb={4}>
                  <Text 
                    fontSize="2xl" 
                    fontWeight="bold"
                    bgGradient={`linear(to-r, ${resource.color}.700, ${resource.color}.500)`}
                    bgClip="text"
                  >
                    {resource.title}
                  </Text>
                  <Flex align="center" gap={2}>
                    {resource.status && (
                      <ChakraBadge
                        colorScheme={resource.status === 'New' ? 'green' : 'purple'}
                        borderRadius="full"
                        px={3}
                        py={1}
                        textTransform="uppercase"
                        fontSize="xs"
                        fontWeight="bold"
                      >
                        {resource.status}
                      </ChakraBadge>
                    )}
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                      <IconButton
                        icon={resource.bookmarked ? <FaBookmarkSolid /> : <FaBookmark />}
                        variant="ghost"
                        colorScheme={resource.color}
                        onClick={() => toggleBookmark(resource.id)}
                        aria-label="Bookmark"
                        size="sm"
                      />
                    </motion.div>
                  </Flex>
                </Flex>

                <Text fontSize="md" color="gray.600" mb={4} lineHeight="tall">
                  {resource.description}
                </Text>

                <Flex align="center" gap={4} mb={4}>
                  <HStack spacing={1}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div key={i} whileHover={{ scale: 1.2 }}>
                        <FaStar color={i < Math.round(resource.rating) ? '#F6AD55' : '#CBD5E0'} />
                      </motion.div>
                    ))}
                  </HStack>
                  <Tag 
                    colorScheme={resource.color} 
                    size="md"
                    borderRadius="full"
                    px={4}
                  >
                    {resource.difficulty}
                  </Tag>
                </Flex>

                {resource.progress > 0 && (
                  <Box mt={4}>
                    <Flex justify="space-between" align="center" mb={2}>
                      <Text fontSize="sm" fontWeight="medium" color={`${resource.color}.500`}>
                        Progress
                      </Text>
                      <Text fontSize="sm" fontWeight="bold" color={`${resource.color}.600`}>
                        {resource.progress}%
                      </Text>
                    </Flex>
                    <Progress 
                      value={resource.progress} 
                      colorScheme={resource.color} 
                      borderRadius="full"
                      size="sm"
                      hasStripe
                      isAnimated
                    />
                  </Box>
                )}

                <HStack spacing={4} mt="auto" pt={6}>
                  <Button
                    size="md"
                    colorScheme={resource.color}
                    leftIcon={<FaPlayCircle />}
                    onClick={() => handleViewCourse(resource)}
                    flex={1}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg"
                    }}
                  >
                    View Course
                  </Button>
                  <Button
                    size="md"
                    variant="outline"
                    colorScheme={resource.color}
                    leftIcon={<FaDownload />}
                    onClick={() => alert(`Downloading: ${resource.title}`)}
                    flex={1}
                    _hover={{
                      transform: "translateY(-2px)",
                      boxShadow: "lg"
                    }}
                  >
                    Download
                  </Button>
                </HStack>
              </Box>
            </MotionBox>
          ))}
        </AnimatePresence>
      </SimpleGrid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent borderRadius="2xl" overflow="hidden">
          {selectedResource && (
            <>
              <Box position="relative" h="200px">
                <Image
                  src={selectedResource.thumbnail}
                  alt={selectedResource.title}
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bg="blackAlpha.600"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    color="white"
                    textAlign="center"
                    px={4}
                  >
                    {selectedResource.title}
                  </Text>
                </Box>
              </Box>
              <ModalCloseButton color="white" />
              <ModalBody py={6}>
                <VStack spacing={6} align="stretch">
                  <HStack spacing={6} justify="center">
                    <Flex align="center">
                      <Icon as={FaClock} color={`${selectedResource.color}.500`} mr={2} />
                      <Text fontWeight="medium">{selectedResource.duration}</Text>
                    </Flex>
                    <Flex align="center">
                      <Icon as={FaUsers} color={`${selectedResource.color}.500`} mr={2} />
                      <Text fontWeight="medium">{selectedResource.students} Students</Text>
                    </Flex>
                    <Flex align="center">
                      <Icon as={FaStar} color="orange.400" mr={2} />
                      <Text fontWeight="medium">{selectedResource.rating} Rating</Text>
                    </Flex>
                  </HStack>

                  <Box>
                    <Text fontSize="lg" fontWeight="bold" mb={3}>Course Curriculum</Text>
                    <VStack align="stretch" spacing={3}>
                      {selectedResource.curriculum.map((item, index) => (
                        <Flex
                          key={index}
                          p={3}
                          bg={`${selectedResource.color}.50`}
                          borderRadius="lg"
                          align="center"
                        >
                          <Box
                            bg={`${selectedResource.color}.500`}
                            color="white"
                            w={8}
                            h={8}
                            borderRadius="full"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            mr={3}
                          >
                            {index + 1}
                          </Box>
                          <Text>{item}</Text>
                        </Flex>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              </ModalBody>
              <ModalFooter bg="gray.50">
                <Button
                  colorScheme={selectedResource.color}
                  size="lg"
                  leftIcon={<FaPlayCircle />}
                  onClick={() => window.open(selectedResource.link, '_blank')}
                  w="full"
                >
                  Start Learning
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default LearningResources;
