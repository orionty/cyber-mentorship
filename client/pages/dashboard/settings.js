import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopNavbar from '../../components/dashboard/TopNavbar';
import ProfileSettings from '../../components/dashboard/ProfileSettings';




const SettingsPage = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1">
        <TopNavbar />
        <ProfileSettings />
      </Box>
    </Flex>
  );
};

export default SettingsPage;