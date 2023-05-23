import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  userLoggedIn: boolean = false;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
  ) {
    // Initialize the tasks observable
    this.tasks$ = this.taskService.getTasks();
  }

  /**
   * Delete a task
   * @param task The task to be deleted
   */
  deleteTask(task: Task): void {
    this.taskService.deleteTask(task);
  }

  ngOnInit() {
    // Get tasks on component initialization
    this.getTasks();

    // Subscribe to the authentication state changes
    this.afAuth.authState.subscribe(user => {
      this.userLoggedIn = !!user;
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
  }

  /**
   * Log out the user
   */
  logOut(): void {
    this.afAuth.signOut().then(() => this.router.navigate(['/']));
  }
}