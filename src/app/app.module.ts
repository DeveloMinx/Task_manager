import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { TaskService } from './services/task.service';


import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat'; // Importa el módulo de AngularFire de 'compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    AddTaskComponent,
    VerifyUserComponent,
    RecoverPasswordComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase), // Inicializa el módulo de Firebase
    AngularFirestoreModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }