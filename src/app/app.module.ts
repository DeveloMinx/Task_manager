import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskService } from './services/task.service';


import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat'; // Importa el módulo de AngularFire de 'compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AddTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // Inicializa el módulo de Firebase
    AngularFirestoreModule,
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }