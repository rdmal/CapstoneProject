import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Goals } from 'src/app/classes/goals';
import { GoalsService } from 'src/app/services/goals.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-goals-list',
  templateUrl: './goals-list.component.html',
  styleUrls: ['./goals-list.component.scss']
})
export class GoalsListComponent implements OnInit {

  goals: Goals[]=[];
  currentUser:any;
  newGoal:Goals=new Goals();
  goalForm!:boolean


  constructor(private goalService:GoalsService, private storageService:StorageService, private router:Router) { }

  ngOnInit(): void {

    this.currentUser=this.storageService.getUser();
    this.getGoals();

  }

  genForm(){
    this.goalForm=!this.goalForm;
  }

  getGoals(){

    this.goalService.getGoalsUserId(this.currentUser.id).subscribe(data=>{

      this.goals=data;
      console.log(data)
    },
    error=> console.log(error))
  }

deleteGoal(id:number){

this.goalService.deleteGoal(id).subscribe(data=>{
  console.log(data)
  this.refresh();
},
error=> console.log(error))
}

refresh(){
  window.location.reload();
}

updateGoal(id:number){
  this.router.navigate(['goalsUpdate',id]);
  
}


createGoal(){
  this.goalService.createGoals(this.currentUser.id,this.newGoal).subscribe(data=>{
    console.log(data)
    this.refresh();
  },
  error=>console.log(error))
}

}
