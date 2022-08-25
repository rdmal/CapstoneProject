import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BudgetTableComponent } from './component/budget-table/budget-table.component';
import { BudgetCreateComponent } from './component/budget-create/budget-create.component';
import { ExpenseUpdateComponent } from './component/expense-update/expense-update.component';
import { GoalsListComponent } from './component/goals-list/goals-list.component';
import { GoalUpdateComponent } from './component/goal-update/goal-update.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    BudgetTableComponent,
    BudgetCreateComponent,
    ExpenseUpdateComponent,
    GoalsListComponent,
    GoalUpdateComponent,



 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
