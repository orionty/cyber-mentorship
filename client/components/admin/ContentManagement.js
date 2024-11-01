// ContentManagement.js
import { Box, Text, Input, IconButton, Table, Thead, Tbody, Tr, Th, Td, VStack, HStack, Badge, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, useBreakpointValue } from '@chakra-ui/react';
import { FaSearch, FaEye, FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useState } from 'react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ContentManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Sample course data
  const [courses, setCourses] = useState([
    { id: 1, title: 'Introduction to Cybersecurity', instructor: 'Alice Johnson', status: 'Pending', date: '2024-11-01' },
    { id: 2, title: 'Advanced Machine Learning', instructor: 'Bob Smith', status: 'Approved', date: '2024-10-29' },
    { id: 3, title: 'Data Privacy Essentials', instructor: 'Charlie Brown', status: 'Rejected', date: '2024-10-25' },
  ]);

  // Open add/edit modal
  const openAddEditModal = (course = null) => {
    setEditingCourse(course);
    setAddEditModalOpen(true);
  };

  // Handle course submission (create or edit)
  const handleCourseSubmit = () => {
    if (editingCourse) {
      setCourses(courses.map(course => (course.id === editingCourse.id ? editingCourse : course)));
    } else {
      const newCourse = {
        id: Date.now(),
        ...editingCourse,
        status: 'Pending',
        date: new Date().toISOString().split('T')[0],
      };
      setCourses([...courses, newCourse]);
    }
    setAddEditModalOpen(false);
    setEditingCourse(null);
  };

  // Delete a course
  const handleDeleteCourse = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  // Filtering courses
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <VStack align="stretch" spacing={5} w="full">
      {/* Header */}
      <Text fontSize="2xl" fontWeight="bold" color="teal.600" textAlign={isMobile ? 'center' : 'left'}>
        Course Management
      </Text>

      {/* Search and Add New Course */}
      <HStack spacing={3} mb={4} w="full" justify={isMobile ? 'center' : 'flex-start'}>
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          width={isMobile ? '80%' : '300px'}
          bg="white"
          borderRadius="md"
          boxShadow="md"
        />
        <IconButton icon={<FaSearch />} colorScheme="teal" aria-label="Search Content" />
        {!isMobile && (
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={() => openAddEditModal()} ml="auto">
            Add New Course
          </Button>
        )}
      </HStack>
      {isMobile && (
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={() => openAddEditModal()} w="80%" mx="auto">
          Add New Course
        </Button>
      )}

      {/* Course Table */}
      <Box bg="white" borderRadius="md" boxShadow="lg" p={5} w="full">
        <Table variant="striped" colorScheme="gray">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Instructor</Th>
              <Th>Status</Th>
              <Th>Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCourses.map((course) => (
              <MotionBox as={Tr} key={course.id} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                <Td>{course.title}</Td>
                <Td>{course.instructor}</Td>
                <Td>
                  <Badge colorScheme={
                    course.status === 'Approved' ? 'green' :
                    course.status === 'Pending' ? 'orange' :
                    'red'
                  }>
                    {course.status}
                  </Badge>
                </Td>
                <Td>{course.date}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      icon={<FaEye />}
                      colorScheme="blue"
                      aria-label="View Course"
                      onClick={onOpen}
                    />
                    <IconButton
                      icon={<FaEdit />}
                      colorScheme="teal"
                      aria-label="Edit Course"
                      onClick={() => openAddEditModal(course)}
                    />
                    <IconButton
                      icon={<FaTrash />}
                      colorScheme="red"
                      aria-label="Delete Course"
                      onClick={() => handleDeleteCourse(course.id)}
                    />
                  </HStack>
                </Td>
              </MotionBox>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Add/Edit Course Modal */}
      <Modal isOpen={isAddEditModalOpen} onClose={() => setAddEditModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingCourse ? 'Edit Course' : 'Add New Course'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title</FormLabel>
              <Input
                value={editingCourse?.title || ''}
                onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                placeholder="Course title"
                bg="gray.50"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Instructor</FormLabel>
              <Input
                value={editingCourse?.instructor || ''}
                onChange={(e) => setEditingCourse({ ...editingCourse, instructor: e.target.value })}
                placeholder="Instructor name"
                bg="gray.50"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleCourseSubmit}>
              {editingCourse ? 'Update Course' : 'Add Course'}
            </Button>
            <Button variant="ghost" onClick={() => setAddEditModalOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Placeholder Modal for Viewing Course Details */}
      {isOpen && (
        <Box p={6} bg="white" borderRadius="md" boxShadow="lg">
          <Text fontSize="lg" fontWeight="bold">Course Details</Text>
          <Text fontSize="sm" color="gray.500">Detailed view of the selected course will go here.</Text>
          <Button mt={4} colorScheme="teal" onClick={onClose}>Close</Button>
        </Box>
      )}
    </VStack>
  );
};

export default ContentManagement;
