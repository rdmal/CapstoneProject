import { AnimateTimings } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenses } from '../classes/expenses';
import { Goals } from '../classes/goals';


const API_URL = 'http://localhost:4200/api/goals';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

 

  constructor(private httpClient: HttpClient) { }

getAllGoals():Observable<Expenses[]>{

    return this.httpClient.get<Expenses[]>(`${API_URL}/`)

}

getGoalsUserId(userId:number):Observable<any>{

    return this.httpClient.get<any>(`${API_URL}/${userId}/goalsByUser`)
}

createGoals(userId:any,goals:Goals){

  return this.httpClient.post(`${API_URL}/${userId}/create`,goals)
}

updateGoals(id:number, goals:Goals):Observable<Object>{

  return this.httpClient.put(`${API_URL}/${id}/update`,goals)
}

getSingleGoal(id:number):Observable<any>{

  return this.httpClient.get(`${API_URL}/${id}`)
}


deleteGoal(id:number):Observable<Object>{
  return this.httpClient.delete(`${API_URL}/${id}/delete`)
}
}


