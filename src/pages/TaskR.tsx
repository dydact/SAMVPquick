import React from 'react';
import styled from 'styled-components';
import TaskAssignment from '../components/TaskAssignment';

const TaskRContainer = styled.div`
  padding: 2rem;
`;

const TaskRTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const TaskR: React.FC = () => {
  return (
    <TaskRContainer>
      <TaskRTitle>
        task<span style={{ color: 'red', fontWeight: 'bold', fontStyle: 'italic' }}>R!</span>
      </TaskRTitle>
      <TaskAssignment />
    </TaskRContainer>
  );
};

export default TaskR;