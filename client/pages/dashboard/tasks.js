import { Box, Flex } from '@chakra-ui/react';
import Sidebar from '../../components/dashboard/Sidebar';
import TopNavbar from '../../components/dashboard/TopNavbar';
import MyTasks from '../../components/dashboard/MyTasks';

const TasksPage = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1">
        <TopNavbar />
        <MyTasks />
      </Box>
    </Flex>
  );
};

export default TasksPage;
