import { Box, Flex, Text, Button, VStack, SimpleGrid, Badge as ChakraBadge, HStack, Tag, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Image, Avatar, useColorModeValue } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaInfoCircle, FaCheckCircle, FaExternalLinkAlt, FaDollarSign, FaStar } from 'react-icons/fa';
import { useState } from 'react';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const JobOpportunities = () => {
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const { isOpen: isApplyOpen, onOpen: onApplyOpen, onClose: onApplyClose } = useDisclosure();
  const [selectedJob, setSelectedJob] = useState(null);

  // Sample Jobs Data with Job Type and Additional Status
  const jobs = [
    {
      id: 1,
      title: 'Cybersecurity Analyst',
      company: 'Tech Solutions Inc.',
      location: 'Remote',
      deadline: '2024-11-20',
      type: 'Full-time',
      status: 'New',
      recommended: true,
      salary: '$80,000 - $120,000',
      description: 'Join our team as a Cybersecurity Analyst and help protect our digital assets...',
      requirements: ['5+ years experience', 'CISSP certification', 'Strong analytical skills'],
      companyLogo: 'https://example.com/techsolutions-logo.png',
      color: 'teal'
    },
    {
      id: 2,
      title: 'Network Security Specialist',
      company: 'CyberSafe Ltd.',
      location: 'New York, NY',
      deadline: '2024-11-25',
      type: 'Part-time',
      status: 'Closing Soon',
      trending: true,
      salary: '$60,000 - $90,000',
      description: 'Looking for a Network Security Specialist to strengthen our infrastructure...',
      requirements: ['3+ years experience', 'Network+ certification', 'Firewall management'],
      companyLogo: 'https://example.com/cybersafe-logo.png',
      color: 'purple'
    },
    {
      id: 3,
      title: 'Data Privacy Officer',
      company: 'DataGuard',
      location: 'Remote',
      deadline: '2024-12-01',
      type: 'Remote',
      status: 'Remote',
      salary: '$90,000 - $130,000',
      description: 'Lead our data privacy initiatives and ensure compliance...',
      requirements: ['7+ years experience', 'GDPR expertise', 'Leadership skills'],
      companyLogo: 'https://example.com/dataguard-logo.png',
      color: 'blue'
    },
    {
      id: 4,
      title: 'Penetration Tester',
      company: 'SecureWorks',
      location: 'San Francisco, CA',
      deadline: '2024-11-30',
      type: 'Internship',
      status: 'New',
      salary: '$70,000 - $110,000',
      description: 'Join our red team to identify and exploit security vulnerabilities...',
      requirements: ['CEH certification', 'Python/Ruby skills', 'Security tools expertise'],
      companyLogo: 'https://example.com/secureworks-logo.png',
      color: 'cyan'
    },
  ];

  const [filter, setFilter] = useState('All');
  const bgColor = useColorModeValue('white', 'gray.800');
  const headerGradient = useColorModeValue(
    'linear(to-r, teal.400, blue.500)',
    'linear(to-r, teal.200, blue.300)'
  );

  const filteredJobs = jobs.filter(job =>
    filter === 'All' ? true : job.status === filter
  );

  const handleDetailsClick = (job) => {
    setSelectedJob(job);
    onDetailsOpen();
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    onApplyOpen();
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { 
      y: -12,
      scale: 1.02,
      transition: { type: "spring", stiffness: 300 }
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
          Job Opportunities
        </Text>
        <Text fontSize="lg" color="gray.600" mt={3} maxW="xl">
          Discover your next career move in cybersecurity. We've curated the best opportunities just for you.
        </Text>

        <HStack spacing={4} mt={6} wrap="wrap">
          {['All', 'New', 'Closing Soon', 'Remote'].map(type => (
            <motion.div
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant={filter === type ? "solid" : "outline"}
                colorScheme="teal"
                onClick={() => setFilter(type)}
                borderRadius="full"
                px={6}
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "lg"
                }}
              >
                {type}
              </Button>
            </motion.div>
          ))}
        </HStack>
      </MotionFlex>

      <SimpleGrid columns={{ base: 1, lg: 2, xl: 3 }} spacing={8}>
        <AnimatePresence>
          {filteredJobs.map((job, index) => (
            <MotionBox
              key={job.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover="hover"
              transition={{ duration: 0.3, delay: index * 0.1 }}
              bg={bgColor}
              borderRadius="2xl"
              overflow="hidden"
              position="relative"
              boxShadow="xl"
              height="100%"
              display="flex"
              flexDirection="column"
              _hover={{
                transform: "translateY(-4px)",
                transition: "all 0.3s ease"
              }}
            >
              <Box 
                position="absolute" 
                top={0} 
                left={0} 
                right={0} 
                h="6px" 
                bgGradient={`linear(to-r, ${job.color}.400, ${job.color}.600)`}
              />
              
              <Box p={8} flex="1" display="flex" flexDirection="column">
                <Flex justify="space-between" align="center" mb={5}>
                  <VStack align="start" spacing={2}>
                    <Text 
                      fontSize="2xl" 
                      fontWeight="bold" 
                      color="gray.800"
                      letterSpacing="tight"
                      lineHeight="shorter"
                    >
                      {job.title}
                    </Text>
                    <HStack spacing={2}>
                      <FaBriefcase color="#718096"/>
                      <Text 
                        fontSize="md" 
                        color="gray.600"
                        fontWeight="medium"
                      >
                        {job.company}
                      </Text>
                    </HStack>
                  </VStack>
                  <ChakraBadge
                    colorScheme={
                      job.status === 'New' ? 'green' :
                      job.status === 'Closing Soon' ? 'red' : 'blue'
                    }
                    borderRadius="full"
                    px={4}
                    py={2}
                    textTransform="uppercase"
                    fontSize="xs"
                    fontWeight="bold"
                    letterSpacing="wider"
                    boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
                    _hover={{
                      transform: "translateY(-1px)",
                      boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.12)"
                    }}
                  >
                    {job.status}
                  </ChakraBadge>
                </Flex>

                <VStack align="start" spacing={4} flex="1">
                  <HStack spacing={6}>
                    <HStack spacing={3}>
                      <Box color="gray.500">
                        <FaMapMarkerAlt />
                      </Box>
                      <Text fontSize="md" color="gray.600" fontWeight="medium">{job.location}</Text>
                    </HStack>
                    <HStack spacing={3}>
                      <Box color="gray.500">
                        <FaDollarSign />
                      </Box>
                      <Text fontSize="md" color="gray.600" fontWeight="medium">{job.salary}</Text>
                    </HStack>
                  </HStack>
                  <HStack spacing={3}>
                    <Box color="gray.500">
                      <FaClock />
                    </Box>
                    <Text fontSize="md" color="gray.600" fontWeight="medium">
                      Deadline: {job.deadline}
                    </Text>
                  </HStack>
                </VStack>

                <HStack mt={5} spacing={3} flexWrap="wrap">
                  <Tag 
                    colorScheme={job.color} 
                    borderRadius="full" 
                    px={4}
                    py={2}
                    size="lg"
                    variant="subtle"
                    _hover={{
                      transform: "translateY(-1px)"
                    }}
                  >
                    {job.type}
                  </Tag>
                  {job.recommended && (
                    <Tag 
                      colorScheme="yellow" 
                      borderRadius="full" 
                      px={4}
                      py={2}
                      size="lg"
                      variant="subtle"
                      _hover={{
                        transform: "translateY(-1px)"
                      }}
                    >
                      <FaStar style={{ marginRight: '4px' }}/> Recommended
                    </Tag>
                  )}
                  {job.trending && (
                    <Tag 
                      colorScheme="orange" 
                      borderRadius="full" 
                      px={4}
                      py={2}
                      size="lg"
                      variant="subtle"
                      _hover={{
                        transform: "translateY(-1px)"
                      }}
                    >
                      🔥 Trending
                    </Tag>
                  )}
                </HStack>

                <HStack spacing={4} mt={7}>
                  <Button
                    size="lg"
                    variant="outline"
                    colorScheme={job.color}
                    leftIcon={<FaInfoCircle />}
                    onClick={() => handleDetailsClick(job)}
                    flex={1}
                    fontWeight="semibold"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                      bg: `${job.color}.50`
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    size="lg"
                    colorScheme={job.color}
                    rightIcon={<FaExternalLinkAlt />}
                    onClick={() => handleApplyClick(job)}
                    flex={1}
                    fontWeight="semibold"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg'
                    }}
                  >
                    Apply Now
                  </Button>
                </HStack>
              </Box>
            </MotionBox>
          ))}
        </AnimatePresence>
      </SimpleGrid>

      {/* Details Modal */}
      <Modal isOpen={isDetailsOpen} onClose={onDetailsClose} size="xl">
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent borderRadius="2xl" overflow="hidden">
          <Box bgGradient={`linear(to-r, ${selectedJob?.color || 'teal'}.400, ${selectedJob?.color || 'teal'}.600)`} p={6}>
            <ModalHeader color="white" pb={0} fontSize="2xl">{selectedJob?.title}</ModalHeader>
            <Text color="white" opacity={0.9} fontSize="md">{selectedJob?.company}</Text>
            <ModalCloseButton color="white" />
          </Box>
          <ModalBody pt={6}>
            <VStack align="stretch" spacing={6}>
              <Flex justify="space-between" align="center">
                <HStack spacing={4}>
                  <Avatar src={selectedJob?.companyLogo} name={selectedJob?.company} size="xl" />
                  <Box>
                    <Text fontSize="xl" fontWeight="bold" color="gray.700">{selectedJob?.company}</Text>
                    <Text fontSize="md" color="gray.500">{selectedJob?.location}</Text>
                    <HStack spacing={2} mt={2}>
                      <Tag size="sm" colorScheme={selectedJob?.color || 'teal'}>{selectedJob?.type}</Tag>
                      <Tag size="sm" colorScheme="gray">{selectedJob?.deadline && `Deadline: ${new Date(selectedJob?.deadline).toLocaleDateString()}`}</Tag>
                    </HStack>
                  </Box>
                </HStack>
                <Tag size="lg" colorScheme={selectedJob?.color || 'teal'} p={4} borderRadius="xl">
                  {selectedJob?.salary}
                </Tag>
              </Flex>
              
              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={3}>Job Description</Text>
                <Text color="gray.600" fontSize="md" lineHeight="tall">{selectedJob?.description}</Text>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={3}>Key Requirements</Text>
                <VStack align="start" spacing={3}>
                  {selectedJob?.requirements.map((req, index) => (
                    <HStack key={index} spacing={3}>
                      <FaCheckCircle color={`var(--chakra-colors-${selectedJob?.color || 'teal'}-500)`} />
                      <Text color="gray.600">{req}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              <Box>
                <Text fontSize="lg" fontWeight="bold" mb={3}>Additional Information</Text>
                <SimpleGrid columns={2} spacing={4}>
                  <HStack>
                    <FaBriefcase color={`var(--chakra-colors-${selectedJob?.color || 'teal'}-500)`} />
                    <Text color="gray.600">Employment Type: {selectedJob?.type}</Text>
                  </HStack>
                  <HStack>
                    <FaMapMarkerAlt color={`var(--chakra-colors-${selectedJob?.color || 'teal'}-500)`} />
                    <Text color="gray.600">Location: {selectedJob?.location}</Text>
                  </HStack>
                  <HStack>
                    <FaClock color={`var(--chakra-colors-${selectedJob?.color || 'teal'}-500)`} />
                    <Text color="gray.600">Application Deadline: {selectedJob?.deadline && new Date(selectedJob?.deadline).toLocaleDateString()}</Text>
                  </HStack>
                  <HStack>
                    <FaDollarSign color={`var(--chakra-colors-${selectedJob?.color || 'teal'}-500)`} />
                    <Text color="gray.600">Salary Range: {selectedJob?.salary}</Text>
                  </HStack>
                </SimpleGrid>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter bg="gray.50">
            <Button colorScheme="gray" mr={3} onClick={onDetailsClose} size="lg">
              Close
            </Button>
            <Button 
              colorScheme={selectedJob?.color || 'teal'} 
              onClick={() => handleApplyClick(selectedJob)}
              size="lg"
              leftIcon={<FaExternalLinkAlt />}
            >
              Apply Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Apply Modal */}
      <Modal isOpen={isApplyOpen} onClose={onApplyClose} size="lg">
        <ModalOverlay backdropFilter="blur(8px)" />
        <ModalContent borderRadius="2xl">
          <Box bgGradient={`linear(to-r, ${selectedJob?.color || 'teal'}.400, ${selectedJob?.color || 'teal'}.600)`} p={6}>
            <ModalHeader color="white" pb={0} fontSize="2xl">Apply for {selectedJob?.title}</ModalHeader>
            <Text color="white" opacity={0.9} fontSize="md">{selectedJob?.company}</Text>
            <ModalCloseButton color="white" />
          </Box>
          <ModalBody pt={6}>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text mb={2} fontWeight="medium">Personal Information</Text>
                <SimpleGrid columns={2} spacing={4}>
                  <Box>
                    <Text mb={1} fontSize="sm">First Name</Text>
                    <input type="text" style={{width: '100%', padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px'}} />
                  </Box>
                  <Box>
                    <Text mb={1} fontSize="sm">Last Name</Text>
                    <input type="text" style={{width: '100%', padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px'}} />
                  </Box>
                  <Box>
                    <Text mb={1} fontSize="sm">Email Address</Text>
                    <input type="email" style={{width: '100%', padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px'}} />
                  </Box>
                  <Box>
                    <Text mb={1} fontSize="sm">Phone Number</Text>
                    <input type="tel" style={{width: '100%', padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px'}} />
                  </Box>
                </SimpleGrid>
              </Box>

              <Box>
                <Text mb={2} fontWeight="medium">Resume/CV Details</Text>
                <Button 
                  w="full" 
                  h="120px" 
                  borderRadius="xl" 
                  borderStyle="dashed" 
                  borderWidth={2} 
                  colorScheme={selectedJob?.color || 'teal'} 
                  variant="outline"
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'lg'
                  }}
                >
                  <VStack>
                    <Text>Paste Resume/CV Text</Text>
                    <Text fontSize="xs" color="gray.500">Please paste your resume content here</Text>
                  </VStack>
                </Button>
              </Box>

              <Box>
                <Text mb={2} fontWeight="medium">Cover Letter</Text>
                <Button 
                  w="full" 
                  h="120px" 
                  borderRadius="xl" 
                  borderStyle="dashed" 
                  borderWidth={2} 
                  colorScheme={selectedJob?.color || 'teal'} 
                  variant="outline"
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'lg'
                  }}
                >
                  <VStack>
                    <Text>Paste Cover Letter Text</Text>
                    <Text fontSize="xs" color="gray.500">Please paste your cover letter content here</Text>
                  </VStack>
                </Button>
              </Box>

              <Box>
                <Text mb={2} fontWeight="medium">Additional Questions</Text>
                <VStack spacing={4}>
                  <Box w="full">
                    <Text mb={1} fontSize="sm">Years of Relevant Experience</Text>
                    <input type="number" style={{width: '100%', padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px'}} />
                  </Box>
                  <Box w="full">
                    <Text mb={1} fontSize="sm">Expected Salary Range</Text>
                    <input type="text" style={{width: '100%', padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px'}} placeholder="e.g. $80,000 - $100,000" />
                  </Box>
                  <Box w="full">
                    <Text mb={1} fontSize="sm">Earliest Start Date</Text>
                    <input type="date" style={{width: '100%', padding: '8px', border: '1px solid #E2E8F0', borderRadius: '6px'}} />
                  </Box>
                </VStack>
              </Box>

              <Text fontSize="sm" color="gray.500" textAlign="center">
                All fields are required. Please ensure information accuracy before submission.
              </Text>
            </VStack>
          </ModalBody>
          <ModalFooter bg="gray.50">
            <Button colorScheme="gray" mr={3} onClick={onApplyClose} size="lg">
              Cancel
            </Button>
            <Button 
              colorScheme={selectedJob?.color || 'teal'}
              size="lg"
              onClick={() => {
                alert('Application submitted successfully!');
                onApplyClose();
              }}
            >
              Submit Application
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default JobOpportunities;
