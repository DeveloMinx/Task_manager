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
    this.tasksCollection = this.firestore.collection<Task>('tasks');
    this.tasks = this.tasksCollection.valueChanges({ idField: 'id' });
  }

  getTasks() {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasksCollection.add(task);
  }

  updateTask(task: Task) {
    const taskDoc = this.tasksCollection.doc(task.id);
    taskDoc.update(task);
  }

  deleteTask(task: Task) {
    const taskDoc = this.tasksCollection.doc(task.id);
    taskDoc.delete();
  }
}