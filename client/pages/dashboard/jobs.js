import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopNavbar from '../../components/dashboard/TopNavbar';
import JobOpportunities from '../../components/dashboard/JobOpportunities';




const JobsPage = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1">
        <TopNavbar />
        <JobOpportunities />
      </Box>
    </Flex>
  );
};

export default JobsPage;