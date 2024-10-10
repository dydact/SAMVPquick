export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
}

export interface User {
  id: string;
  name: string;
  email: string;
}