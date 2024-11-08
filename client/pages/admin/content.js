// AdminDashboardLayout.js
import { Box, Flex, Text } from '@chakra-ui/react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';
import Footer from '../../components/admin/Footer';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ContentManagement from '@/components/admin/ContentManagement';


const MotionBox = motion(Box);

const Content = () => {
  const [activeSection, setActiveSection] = useState("Overview");

  return (
    <Flex height="100vh" direction="column">
    <Flex flex="1" bg="gray.100">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <Flex flex="1" direction="column" p={5}>
        <Header />
        <ContentManagement />  {/* Inserted the new component here */}
        <Footer />
      </Flex>
    </Flex>
  </Flex>
  );
};

export default Content;
