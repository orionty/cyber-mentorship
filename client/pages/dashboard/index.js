import MyTasks from '../../components/dashboard/MyTasks';
import Overview from '../../components/dashboard/Overview ';
import Sidebar from '../../components/dashboard/Sidebar';
import TopNavbar from '../../components/dashboard/TopNavbar';
import { Flex, Box } from '@chakra-ui/react';


const Dashboard = () => {
  return (
    <Flex minH="100vh" direction="row" bg="gray.100">
      {/* Sidebar with fixed width */}
      <Sidebar />

      {/* Main Content Area */}
      <Flex direction="column" flex="1" >
        {/* Top Navbar */}
        <TopNavbar />

        {/* Dashboard Content */}
        <Box p={4} bg="gray.100" minH="calc(100vh - 60px)"> {/* Adjust height based on navbar height */}
          {/* Overview Section */}
          <Overview />  

          {/* Content Sections */}
          <Flex wrap="wrap" mt={8} gap={4}>
            <Box flex="1" minW="300px">
              {/* <MyTasks /> */}
            </Box>
            <Box flex="1" minW="300px">
              {/* <MentorshipSessions /> */}
            </Box>
            <Box flex="1" minW="300px">
              {/* <ProgressTracker /> */}
            </Box>
          </Flex>

          {/* Additional Sections */}
          <Flex wrap="wrap" mt={8} gap={4}>
            <Box flex="1" minW="300px">
              {/* <JobOpportunities /> */}
            </Box>
            <Box flex="1" minW="300px">
              {/* <Notifications /> */}
            </Box>
            <Box flex="1" minW="300px">
              {/* <ActivityFeed /> */}
            </Box>
          </Flex>

          {/* Profile Settings */}
          <Box mt={8}>
            {/* <ProfileSettings /> */}
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
