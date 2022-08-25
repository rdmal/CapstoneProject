import { Component, OnInit } from '@angular/core';
import { Expenses } from 'src/app/classes/expenses';
import { Goals } from 'src/app/classes/goals';
import { User } from 'src/app/classes/user';
import { ExpenseService } from 'src/app/services/expense.service';
import { GoalsService } from 'src/app/services/goals.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-budget-create',
  templateUrl: './budget-create.component.html',
  styleUrls: ['./budget-create.component.scss']
})
export class BudgetCreateComponent implements OnInit {

  expenseTable!:boolean;
  goalsTable!:boolean;

  users:User[]= []

 //expenses:Expenses= new Expenses();

currentUser:any;


expense:Expenses=new Expenses();
goals:Goals=new Goals();

messageA=''
messageB=''


  constructor( private goalsService:GoalsService,private storageService:StorageService, private userService:UserService, private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.getUser();
    this.currentUser=this.storageService.getUser();
    

   
  }


    showExpenseTable(){
      this.expenseTable=!this.expenseTable;
    }

    showGoalForm(){
      this.goalsTable=!this.goalsTable;
    }

    getUser(){
      this.userService.getUsers().subscribe(data=>{
        this.users=data;
        console.log(data)
      })
    }

 

    refreshPage(){
      window.location.reload();
    }
    

}
