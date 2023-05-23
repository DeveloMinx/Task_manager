import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksCollection: AngularFirestoreCollection<Task>;
  tasks: Observable<Task[]>;

  constructor(private firestore: AngularFirestore) {
    // Initialize the tasks collection with Firestore
    this.tasksCollection = this.firestore.collection<Task>('tasks');

    // Retrieve the tasks as an observable
    this.tasks = this.tasksCollection.valueChanges({ idField: 'id' });
  }

  /**
   * Get all tasks
   * @returns Observable<Task[]>
   */
  getTasks(): Observable<Task[]> {
    return this.tasks;
  }

  /**
   * Add a new task
   * @param task The task to be added
   */
  addTask(task: Task): void {
    this.tasksCollection.add(task);
  }

  /**
   * Update an existing task
   * @param task The task to be updated
   */
  updateTask(task: Task): void {
    const taskDoc = this.tasksCollection.doc(task.id);
    taskDoc.update(task);
  }

  /**
   * Delete a task
   * @param task The task to be deleted
   */
  deleteTask(task: Task): void {
    const taskDoc = this.tasksCollection.doc(task.id);
    taskDoc.delete();
  }
}