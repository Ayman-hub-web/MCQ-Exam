import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { StudentService } from '../../services/student.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {
testId:number | any;
questions: any[] = [];
examName: string | any;
event:any = [];
correctAnswers:number = 0;
testQuestions:number | any;
isResult:boolean = false;

  constructor(private student: StudentService, private route:ActivatedRoute, private toast: ToastrService) { }

  ngOnInit(): void {
    this.testId = this.route.snapshot.paramMap.get('id');
    console.log('testId', this.testId);
      this.student.getQuestions().pipe(
        map((items:any) => items.filter((i:any) => i.subjectId == this.testId)
        ))
    .subscribe(res =>{
        console.log('Questions', res);
        this.questions = res;
      });
      this.getExamName();

  }

  getExamName(){
    this.student.getSubjectById(this.testId).subscribe(res =>{
      this.examName = res.name;
    })
  }

  getValue(event:any){
    console.log('event:',event.value);
    this.event.push(event.value);

  }

  getResult(){
    this.isResult = true;
    this.testQuestions = this.questions.length;
    if(this.event.length > this.questions.length){
      this.toast.error("You did the Test" , "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      });
      return;
    }
    for(let i=0; i<this.event.length; i++){
      if(this.event[i] == this.questions[i].correct){
        this.correctAnswers++;
      }
    }
    let result = Math.round((this.correctAnswers / this.questions.length)*100);
    let studentResult= {
      user: localStorage.getItem('user'),
      subject: localStorage.getItem('subjectId'),
      result: result
    }
    this.student.addStudentResult(studentResult).subscribe(res =>{

    });
  }
}
