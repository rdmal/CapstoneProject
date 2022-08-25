import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenses } from '../classes/expenses';

const API_URL = 'http://localhost:4200/api/expenses';

@Injectable({
  providedIn: 'root'
})

export class ExpenseService {

  constructor(private httpClient: HttpClient) { }

  getExpenseList(): Observable<Expenses[]> {
return this.httpClient.get<Expenses[]>(`${API_URL}/`);
  }

  getExpenseUserId(userId:number):Observable<any>{

    return this.httpClient.get<any>(`${API_URL}/${userId}/expensesByUser`)
  }


createExpense(userId:any, expense:Expenses){

  return this.httpClient.post(`${API_URL}/${userId}/create`,expense)
}


  updateExpense(id: number, expenses: Expenses): Observable<Object> {
    return this.httpClient.put(`${API_URL}/${id}/update`, expenses);
  }

  deleteExpense(id: number): Observable<Object> {
    return this.httpClient.delete(`${API_URL}/${id}/delete`);
  }

  getSingleExpense(id:number):Observable<any>{

    return this.httpClient.get(`${API_URL}/${id}`)

  }

}
