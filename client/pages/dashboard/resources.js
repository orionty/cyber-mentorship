import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopNavbar from '../../components/dashboard/TopNavbar';
import LearningResources from '../../components/dashboard/LearningResources';




const ResourcesPage = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1">
        <TopNavbar />
        <LearningResources />
      </Box>
    </Flex>
  );
};

export default ResourcesPage;