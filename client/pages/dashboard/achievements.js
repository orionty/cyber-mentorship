import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopNavbar from '../../components/dashboard/TopNavbar';
import AchievementsAndBadges from '../../components/dashboard/AchievementsAndBadges';



const AchievementsPage = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1">
        <TopNavbar />
        <AchievementsAndBadges />
      </Box>
    </Flex>
  );
};

export default AchievementsPage;