export interface Task {
  id: string;
  title: string;
  priority: string;
  dueDate: Date | null;
  reminder: boolean;
  completed: boolean; 
}