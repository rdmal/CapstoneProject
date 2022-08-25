import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expenses } from 'src/app/classes/expenses';
import { User } from 'src/app/classes/user';
import { ExpenseService } from 'src/app/services/expense.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrls: ['./budget-table.component.scss'],
})
export class BudgetTableComponent implements OnInit {
  monthlyincome!: number;
  genTable!: boolean;
  finaltotal: number = 0;
  showTotal!: boolean;
  currentUser: any;
  user: User[] = [];
  currentid: any;
  expense: Expenses[] = [];
  newExpense: Expenses = new Expenses();
  createForm!: boolean;

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private userService: UserService,
    private storageService: StorageService
    ) {}

  ngOnInit(): void {
    this.getUser();
    this.currentUser = this.storageService.getUser();
    this.currentid = this.currentUser.id;
    this.getExpenses(this.currentid);
  }

  genExpense() {
    this.genTable = !this.genTable;
  }
  genCreate() {
    this.createForm = !this.createForm;
  }

  getTotal() {
    this.showTotal = !this.showTotal;

    for (let i of this.expense) {
      this.finaltotal += i.expensePrice;
    }
    return this.finaltotal;
  }

  getUser() {
    this.userService.getUsers().subscribe((data) => {
      this.user = data;
      console.log(data);
    });
  }

  getExpenses(id: number) {
    this.expenseService.getExpenseUserId(this.currentid).subscribe((data) => {
      this.expense = data;
      console.log(data);
    });
  }

  refresh() {
    window.location.reload();
  }

  deleteExpense(id: number) {
    this.expenseService.deleteExpense(id).subscribe((data) => {
      console.log(data);
      this.refresh();
    });
  }

  updateExpense(id: number) {
    this.router.navigate(['expenseUpdate', id]);
  }

  createExpense() {
    this.expenseService
      .createExpense(this.currentUser.id, this.newExpense)
      .subscribe(
        (data) => {
          console.log(data);
          this.refresh();
        },
        (error) => console.log(error)
      );
  }
}
