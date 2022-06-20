import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  getDoctor():Observable<any>{
    return this.http.get<any>('http://localhost:3000/doctor');
  }

  getStudents():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/students');
  }

  addStudent(data:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/students', data);
  }

  isLogged(){
    let logged =  localStorage.getItem('logged');
    if(logged === 'logged'){
      return true;
    }
    return false;
  }

  isDoctor(){
    let admin =  localStorage.getItem('role');
    if(admin == 'doctor'){
      return true;
    }
    return false;
  }
}
