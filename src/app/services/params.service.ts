import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsService {

  params: any = {type:'Grinds', stance:'natural', level: 'moderate'};
  constructor() { }

  add(params){
    this.params = params
  }

  get(){
    return this.params;
  }
}
