import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopNavbar from '../../components/dashboard/TopNavbar';
import MentorshipSessions from '../../components/dashboard/MentorshipSessions ';


const MentorshipPage = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1">
        <TopNavbar />
        <MentorshipSessions />
      </Box>
    </Flex>
  );
};

export default MentorshipPage;
