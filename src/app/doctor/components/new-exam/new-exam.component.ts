import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../../services/doctor.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent implements OnInit {
  form: FormGroup | any;
  qesForm: FormGroup | any;
  subject: string | any;
  isView: boolean = false;
  isCreated: boolean = false;
  radioValue: string | any;
  subjectId: number | any;
  lastTestId: number | any;
  isAdd: boolean = false;
  viewOrder: boolean = false;
  createdTest: any;
  withRadio: boolean = true;
  answer1:string | any;
  answer2:string | any;
  answer3:string | any;
  answer4:string | any;

  constructor(private doctor: DoctorService, private router: Router, private route: ActivatedRoute, private toast: ToastrService) { }

  ngOnInit(): void {
    if (!this.isView) {
      this.form = new FormGroup({
        name: new FormControl('')
      });
    }
      this.qesForm = new FormGroup({
        question: new FormControl('', [Validators.required]),
        answer1: new FormControl('', [Validators.required]),
        answer2: new FormControl('', [Validators.required]),
        answer3: new FormControl('', [Validators.required]),
        answer4: new FormControl('', [Validators.required]),
        correct: new FormControl(''),
        subjectId: new FormControl('',)
      });
  }

  onSubmit() {
    this.subject = this.form.value.name;
    console.log('subject', this.subject);
    this.doctor.addSubject(this.form.value).subscribe(res => {
      this.subjectId = res.id;
      localStorage.setItem('subjectId', this.subjectId);
      console.log('added subject', res);
      this.toast.success("Subject added successfully" , "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      });
      this.isView = true;
    })
  }

  addTest() {
    this.checkRadioValue();
    this.qesForm = new FormGroup({
      question: new FormControl(this.qesForm.value.question, [Validators.required]),
      answer1: new FormControl(this.qesForm.value.answer1, [Validators.required]),
      answer2: new FormControl(this.qesForm.value.answer2, [Validators.required]),
      answer3: new FormControl(this.qesForm.value.answer3, [Validators.required]),
      answer4: new FormControl(this.qesForm.value.answer4, [Validators.required]),
      correct: new FormControl(this.radioValue),
      subjectId: new FormControl(this.subjectId)
    });
    this.doctor.addTest(this.qesForm.value).subscribe(res => {
      this.toast.success("Test added successfully" , "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      });
      this.isCreated = true;
      this.isView = false;
      this.isAdd = true;
      this.lastTestId = res.id;
      this.qesForm.reset();
      localStorage.setItem('lastTestId', this.lastTestId);
      this.viewLastTest();
    })

  }

  checkRadioValue(){
    let x = this.radioValue;
    if(x === 'answer1'){
      this.radioValue = this.qesForm.value.answer1;
    }else if(x === 'answer2'){
      this.radioValue = this.qesForm.value.answer2;
    }
    else if(x === 'answer3'){
      this.radioValue = this.qesForm.value.answer3;
    }else{
      this.radioValue = this.qesForm.value.answer4;
    }
  }

  onClick(event?: any) {
    this.radioValue = event.value;
    this.answer1 = '';
    this.answer2 = '';
    this.answer3 = '';
    this.answer4 = '';
  }

  viewLastTest() {
    let lastTestId = localStorage.getItem('lastTestId');
    this.doctor.getTestById(lastTestId).subscribe(res => {
      this.createdTest = res;
    });
  }

  viewTest() {
    if (this.createdTest) {
      this.viewOrder = true;
    }
  }

  resetForm() {
    this.qesForm.reset();
    this.qesForm.value.correct = ''
  }

  deleteSubject() {
    let subjectId = localStorage.getItem('subjectId');
    this.doctor.deleteSubject(subjectId).subscribe(res => {
      this.toast.success("subject deleted successfully" , "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      });
      this.router.navigate(['/subjects'], { relativeTo: this.route })
    })
  }

  isDone() {
    if (this.isCreated) {
      this.router.navigate(['/subjects'], { relativeTo: this.route });
    }
  }

  moreQuestions() {
    this.router.navigate(['/new-exam'], {relativeTo:this.route}).then(()=>{
      this.ngOnInit();
      this.isView = true;
      this.isAdd = true;
    })
  }

}
