import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopNavbar from '../../components/dashboard/TopNavbar';
import Announcements from '../../components/dashboard/Announcements';




const AnnouncementsPage = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1">
        <TopNavbar />
        <Announcements />
      </Box>
    </Flex>
  );
};

export default AnnouncementsPage;