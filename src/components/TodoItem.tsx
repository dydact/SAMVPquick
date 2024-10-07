import React from "react";
import type { Schema } from "../../amplify/data/resource";

interface TodoItemProps {
  todo: Schema["Todo"]["type"];
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
      <span>{todo.content}</span>
      <button 
        onClick={() => onDelete(todo.id)}
        style={{ 
          backgroundColor: '#ff4d4d', 
          color: 'white', 
          border: 'none', 
          padding: '5px 10px', 
          cursor: 'pointer',
          borderRadius: '3px'
        }}
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;