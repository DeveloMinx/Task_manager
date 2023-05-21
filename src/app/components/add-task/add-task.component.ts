import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  newTask: Task = {
    id: '',
    title: '',
    priority: 'Baja',
    dueDate: null,
    reminder: false,
    completed: false
  };

  constructor(private taskService: TaskService) {}

  addTask() {
    this.taskService.addTask(this.newTask);
    this.resetForm();
  }

  resetForm() {
    this.newTask = {
      id: '',
      title: '',
      priority: 'Baja',
      dueDate: null,
      reminder: false,
      completed: false
    };
  }
}