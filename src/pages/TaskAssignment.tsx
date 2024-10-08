import React from 'react';
import styled from 'styled-components';

const TaskAssignmentContainer = styled.div`
  padding: 2rem;
`;

const TaskAssignment: React.FC = () => {
  return (
    <TaskAssignmentContainer>
      <h1>Task Assignment</h1>
      <p>Assign and manage tasks for your team members.</p>
      {/* Add more placeholder content as needed */}
    </TaskAssignmentContainer>
  );
};

export default TaskAssignment;