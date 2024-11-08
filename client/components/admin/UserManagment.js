// UserManagement.js
import { Box, Text, Input, IconButton, Table, Thead, Tbody, Tr, Th, Td, VStack, HStack, Badge, useDisclosure, Button, useBreakpointValue, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { FaSearch, FaEye, FaEdit, FaTrash, FaBan, FaUserPlus } from 'react-icons/fa';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);
const MotionButton = motion(Button);

const UserManagement = () => {
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Sample user data

  const fetchUsers= async()=>{
    try{
      const response = await axios.get("http://localhost:9000/api/v1/all-user")
      const users = response.data.allUsers
      return users



    }catch(error){
      console.log(error)
    }
  }
  // const users = [
  //   { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'User', status: 'Active' },
  //   { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', role: 'Moderator', status: 'Suspended' },
  //   { id: 3, name: 'Sam Wilson', email: 'samwilson@example.com', role: 'Admin', status: 'Active' },
  // ];
  const filteredUsers = fetchUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (user) => {
    setSelectedUser(user);
    onEditOpen();
  };

  return (
    <MotionVStack 
      align="stretch" 
      spacing={6} 
      w="full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <MotionBox
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Text 
          fontSize={{ base: "xl", md: "2xl", lg: "3xl" }} 
          fontWeight="bold" 
          bgGradient="linear(to-r, teal.500, blue.500)"
          bgClip="text"
          letterSpacing="tight"
        >
          User Management
        </Text>
      </MotionBox>

      {/* Search and Add User Section */}
      <HStack 
        spacing={3} 
        mb={4}
        flexDir={{ base: "column", md: "row" }}
        align={{ base: "stretch", md: "center" }}
      >
        <HStack flex="1">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            bg="white"
            borderRadius="lg"
            _focus={{ borderColor: "teal.400", boxShadow: "0 0 0 1px teal.400" }}
          />
          <IconButton 
            icon={<FaSearch />} 
            colorScheme="teal" 
            aria-label="Search Users"
            borderRadius="lg"
          />
        </HStack>
        <MotionButton
          leftIcon={<FaUserPlus />}
          colorScheme="teal"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          borderRadius="lg"
          onClick={onAddOpen}
        >
          Add New User
        </MotionButton>
      </HStack>

      {/* User Table */}
      <MotionBox
        bg="white"
        borderRadius="xl"
        boxShadow="xl"
        p={5}
        w="full"
        overflowX="auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th display={{ base: "none", md: "table-cell" }}>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Td fontWeight="medium">{user.name}</Td>
                  <Td display={{ base: "none", md: "table-cell" }}>{user.email}</Td>
                  <Td>
                    <Badge
                      colorScheme={user.role === 'Admin' ? 'purple' : user.role === 'Moderator' ? 'blue' : 'gray'}
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      {user.role}
                    </Badge>
                  </Td>
                  <Td>
                    <Badge
                      colorScheme={user.status === 'Active' ? 'green' : 'red'}
                      borderRadius="full"
                      px={3}
                      py={1}
                    >
                      {user.status}
                    </Badge>
                  </Td>
                  <Td>
                    <HStack spacing={2}>
                      <IconButton
                        icon={<FaEye />}
                        colorScheme="blue"
                        variant="ghost"
                        aria-label="View User"
                        onClick={onViewOpen}
                        size="sm"
                      />
                      <IconButton
                        icon={<FaEdit />}
                        colorScheme="teal"
                        variant="ghost"
                        aria-label="Edit User"
                        size="sm"
                        onClick={() => handleEditClick(user)}
                      />
                      <IconButton
                        icon={<FaBan />}
                        colorScheme="orange"
                        variant="ghost"
                        aria-label="Suspend User"
                        size="sm"
                        display={{ base: "none", md: "flex" }}
                      />
                      <IconButton
                        icon={<FaTrash />}
                        colorScheme="red"
                        variant="ghost"
                        aria-label="Delete User"
                        size="sm"
                      />
                    </HStack>
                  </Td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </Tbody>
        </Table>
      </MotionBox>

      {/* View User Details Modal */}
      <Modal isOpen={isViewOpen} onClose={onViewClose} size="xl">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader
            bgGradient="linear(to-r, teal.500, blue.500)"
            color="white"
            borderTopRadius="md"
          >
            User Details
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={6}>
            <VStack align="stretch" spacing={4}>
              <Box p={4} bg="gray.50" borderRadius="md">
                <Text fontWeight="bold" mb={2}>Personal Information</Text>
                <Text>Detailed view of the selected user information will go here.</Text>
              </Box>
              <Button colorScheme="teal" onClick={onViewClose}>Close</Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose} size="xl">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader
            bgGradient="linear(to-r, teal.500, blue.500)"
            color="white"
            borderTopRadius="md"
          >
            Edit User
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={6}>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input defaultValue={selectedUser?.name} />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input defaultValue={selectedUser?.email} />
              </FormControl>
              <FormControl>
                <FormLabel>Role</FormLabel>
                <Select defaultValue={selectedUser?.role}>
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <Select defaultValue={selectedUser?.status}>
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </Select>
              </FormControl>
              <HStack spacing={4} width="100%" justify="flex-end">
                <Button onClick={onEditClose}>Cancel</Button>
                <Button colorScheme="teal">Save Changes</Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Add New User Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose} size="xl">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader
            bgGradient="linear(to-r, teal.500, blue.500)"
            color="white"
            borderTopRadius="md"
          >
            Add New User
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody p={6}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder="Enter user name" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Enter email address" type="email" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select placeholder="Select role">
                  <option value="User">User</option>
                  <option value="Moderator">Moderator</option>
                  <option value="Admin">Admin</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Initial Password</FormLabel>
                <Input type="password" placeholder="Enter initial password" />
              </FormControl>
              <HStack spacing={4} width="100%" justify="flex-end">
                <Button onClick={onAddClose}>Cancel</Button>
                <Button colorScheme="teal">Create User</Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </MotionVStack>
  );
};

export default UserManagement;
