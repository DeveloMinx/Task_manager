import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  newTask: Task = {
    id: '',
    title: '',
    priority: 'Low',
    dueDate: null,
    reminder: false,
    completed: false
  };

  userLoggedIn: boolean = false;

  constructor(
    private taskService: TaskService,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    // Check if the user is logged in
    this.afAuth.authState.subscribe(user => {
      this.userLoggedIn = !!user; 
    });
  }

  /**
   * Add a new task
   */
  addTask(): void {
    this.taskService.addTask(this.newTask);
    this.resetForm();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Saved task',
      showConfirmButton: false,
      timer: 1500
    });
  }

  /**
   * Reset the task form
   */
  resetForm(): void {
    this.newTask = {
      id: '',
      title: '',
      priority: 'Low',
      dueDate: null,
      reminder: false,
      completed: false
    };
  }
}