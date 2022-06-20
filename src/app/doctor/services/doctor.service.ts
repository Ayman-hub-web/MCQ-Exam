import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getSubjects():Observable<any>{
    return this.http.get<any>('http://localhost:3000/subjects');
  }

  addSubject(sub:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/subjects', sub);
  }

  deleteSubject(id:any):Observable<any>{
    return this.http.delete<any>('http://localhost:3000/subjects/'+id);
  }

  addTest(test:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/questions', test);
  }

  getTestById(id:any):Observable<any>{
    return this.http.get<any>('http://localhost:3000/questions/'+id);
  }

  getAllQuestions():Observable<any>{
    return this.http.get<any>('http://localhost:3000/questions');
  }

  deleteQuestionById(id:any):Observable<any>{
    return this.http.delete<any>('http://localhost:3000/questions/'+id);
  }

  getAllStudentsResults():Observable<any>{
    return this.http.get<any>('http://localhost:3000/Students-Results/');
  }
}
