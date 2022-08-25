import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Goals } from 'src/app/classes/goals';
import { GoalsService } from 'src/app/services/goals.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-goal-update',
  templateUrl: './goal-update.component.html',
  styleUrls: ['./goal-update.component.scss']
})
export class GoalUpdateComponent implements OnInit {

  currentUser:any;
  goalId!:number;

  goal:Goals=new Goals();

    constructor( private goalService:GoalsService,private route:ActivatedRoute,private router:Router,private storageService:StorageService) { }

  ngOnInit(): void {
    this.goalId=this.route.snapshot.params['id'];
    this.goalService.getSingleGoal(this.goalId).subscribe(data=>{
      this.goal=data;
      console.log(data)
    },
    error=>console.log(error))
    this.currentUser=this.storageService.getUser();

  }

  updateGoal(){
    this.goalService.updateGoals(this.goalId,this.goal).subscribe(data=>{

      this.goalList();
    },
    error=> console.log(error))
  }

  goalList(){
    this.router.navigate(['goals',this.currentUser.id])
  }

}
