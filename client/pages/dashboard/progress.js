import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopNavbar from '../../components/dashboard/TopNavbar';
import ProgressTracker from '../../components/dashboard/ProgressTracker';


const ProgressPage = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1">
        <TopNavbar />
        <ProgressTracker />
      </Box>
    </Flex>
  );
};

export default ProgressPage;
