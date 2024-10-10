import React, { useState } from 'react';
import TaskAssignment from './TaskAssignment';

interface ChatBubbleProps {
  message: string;
  isTaskAssignment?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isTaskAssignment = false }) => {
  const [showTaskAssignment, setShowTaskAssignment] = useState(isTaskAssignment);

  const handleAssignmentComplete = () => {
    setShowTaskAssignment(false);
    // Additional logic after task assignment (e.g., send a confirmation message)
  };

  return (
    <div className="chat-bubble">
      <p>{message}</p>
      {showTaskAssignment && (
        <TaskAssignment onAssignmentComplete={handleAssignmentComplete} inChatBubble={true} />
      )}
    </div>
  );
};

export default ChatBubble;