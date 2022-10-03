import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EcomDataService {

  object:any;
  user:any;
  constructor() { }

  getObject()
  {
    return this.object;
  }

  setObject(o:any)
  {
    this.object=o;
  }

  getUser()
  {
    return this.user;
  }

  setUser(u:any)
  {
    this.user=u;
  }

}
