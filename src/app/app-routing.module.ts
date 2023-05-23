import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify', component: VerifyUserComponent },
  { path: 'recover', component: RecoverPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }