import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Trick, TrickService } from '../services/tricks.service';
import { ParamsService } from '../services/params.service';

@Component({
  selector: 'app-new-session',
  templateUrl: './new-session.page.html',
  styleUrls: ['./new-session.page.scss'],
})
export class NewSessionPage implements OnInit {
  rawtricks:any;
  params: any = {type:'Grinds', stance:'natural', level: 'moderate'};
  constructor(private router: Router, private http:HttpClient, private paramsService: ParamsService, private trickservice:TrickService) {

    this.http.get('../../assets/tricks.json').subscribe(data=>{
        console.log(data);this.rawtricks =data})
      }

  ngOnInit() {
  }

  start(){
    this.paramsService.add(this.params);
    this.router.navigateByUrl('play');
  }


  importTricks(){
    console.log(this.rawtricks);
    this.rawtricks.forEach(trick=> {
        trick.category = trick.A;
        delete trick.A;

        trick.uid = trick.B;
        delete trick.B;

        trick.name = trick.C;
        delete trick.C;

        trick.score = trick.D;
        delete trick.D;

        trick.israre = trick.E;
        delete trick.E;

        trick.type = trick.F;
        delete trick.F;

        this.trickservice.addTrick(trick);
      }
    )
  }

}
