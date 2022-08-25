import { HtmlParser } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetTableComponent } from './component/budget-table/budget-table.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { BudgetCreateComponent } from './component/budget-create/budget-create.component';
import { ExpenseUpdateComponent } from './component/expense-update/expense-update.component';
import { GoalsListComponent } from './component/goals-list/goals-list.component';
import { GoalUpdateComponent } from './component/goal-update/goal-update.component';


const routes: Routes = [

  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home',component: HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'budget/:id',component:BudgetTableComponent},
  {path:'create/:id', component:BudgetCreateComponent},
  {path:'expenseUpdate/:id', component:ExpenseUpdateComponent},
  {path:'goals/:id', component:GoalsListComponent},
  {path:'goalsUpdate/:id', component:GoalUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
