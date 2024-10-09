import React from 'react';
import { Button } from "./elements/button"
import { Card, CardContent } from "./elements/card"
import { Input } from "./elements/input"
import { X } from 'lucide-react'

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chat: React.FC<ChatProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Card className="chat-card">
      <CardContent className="chat-content">
        <div className="chat-header">
          <h3 className="chat-title">Worker Chat</h3>
          <Button variant="ghost" size="icon" onClick={onClose} className="chat-close">
            <X className="icon" />
          </Button>
        </div>
        <div className="chat-messages">
          {/* Chat messages would go here */}
        </div>
        <Input
          type="text"
          placeholder="Type a message..."
          className="chat-input"
        />
      </CardContent>
    </Card>
  );
};

export default Chat;