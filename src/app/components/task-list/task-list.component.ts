import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }


  ngOnInit() {
    this.getTasks();
  }

  private getTasks() {
    this.tasks$ = this.taskService.getTasks();
  }

  markTaskAsCompleted(task: Task) {
    task.completed = true;
    this.taskService.updateTask(task); // Guardar el cambio en Firebase
  }
}