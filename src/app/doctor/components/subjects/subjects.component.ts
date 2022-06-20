import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { DoctorService } from '../../services/doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
subjects:any[] = [];
role:string | any;
questions:any[] = [];
subDelete: boolean = false;
destroySub: boolean = false;
deletedSubId:number | any;

  constructor(private doctor:DoctorService, private router:Router, private route: ActivatedRoute, private toast: ToastrService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.getAllSubjects();
    if(this.subDelete){
      this.questions.forEach(element => {
        this.doctor.deleteQuestionById(element.id).subscribe(res=>{
        })
      })
    }
    

  }

  getAllSubjects(){
    this.doctor.getSubjects().subscribe(res =>{
      this.subjects = res;
    })
  }

  deleteSub(id:any){
    this.deletedSubId= id;
    this.deleteSubFinaly(id);
    localStorage.setItem('deleteSubId', id);
    this.destroySub = true;
    this.doctor.getAllQuestions().pipe(
      map((items:any) => items.filter((i:any) => i.subjectId === id)
      ))
  .subscribe(res =>{
      this.questions = res;
      this.subDelete = true;
      this.ngOnInit();
    })
  }

  deleteSubFinaly(id:any){
    if(this.destroySub){
      this.doctor.deleteSubject(id).subscribe(res =>{
        this.toast.success("Subject deleted successfully" , "" , {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut:5000,
          closeButton: true,
        });
      })
    }
  }
}
