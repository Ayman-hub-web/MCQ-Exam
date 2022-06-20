import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getQuestions():Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/questions');
  }

  getSubjectById(id:any):Observable<any>{
    return this.http.get<any>('http://localhost:3000/subjects/'+id);
  }

  addStudentResult(result:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/Students-Results', result);
  }
}
