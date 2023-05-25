import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


import { Router } from '@angular/router';

// Import the sweetalert2 library
import Swal from 'sweetalert2'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  isEmailVerified: boolean = false;


  constructor(
    private taskService: TaskService,
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.tasks$ = this.taskService.getTasks();
  }

  /**
   * Delete a task
   * @param task The task to be deleted
   */
  deleteTask(task: Task): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(task);
        Swal.fire(
          'Deleted!',
          'The task has been deleted.',
          'success'
        )
      }
    })
  }

  ngOnInit() {
    // Get tasks on component initialization
    this.getTasks();

    // Subscribe to the authentication state changes
    this.afAuth.authState.subscribe(authState => {
      this.isEmailVerified = authState?.emailVerified ?? false;
    });
  
  }

  /**
   * Fetch the tasks from the service and assign them to tasks$
   */
  private getTasks(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  /**
   * Mark a task as completed
   * @param task The task to be marked as completed
   */
  markTaskAsCompleted(task: Task): void {
    task.completed = true;
    this.taskService.updateTask(task);
    Swal.fire('Task done')
  }

  /**
   * Log out the user
   */
  logOut(): void {
    this.afAuth.signOut().then(() => this.router.navigate(['/']));
  }
}