import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expenses } from 'src/app/classes/expenses';
import { ExpenseService } from 'src/app/services/expense.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-expense-update',
  templateUrl: './expense-update.component.html',
  styleUrls: ['./expense-update.component.scss']
})
export class ExpenseUpdateComponent implements OnInit {

  expenseId!:number;
  userId!:number;
  currentUser:any;

  expense:Expenses=new Expenses();

  constructor(private storageService:StorageService,private expenseService: ExpenseService, private userService:UserService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {

    this.expenseId=this.route.snapshot.params['id'];
    this.expenseService.getSingleExpense(this.expenseId).subscribe(data=>{
      this.expense=data;
      console.log(data);
    },
    error=>console.log(error))

    this.currentUser=this.storageService.getUser();
    this.userId=this.currentUser.id
  }

updateExpense(){

    this.expenseService.updateExpense(this.expenseId,this.expense).subscribe(data=>{
      this.expenseList();
      

    },
    error=> console.log(error))
    
}

expenseList(){
  this.router.navigate(['budget/',this.userId])
}

}

