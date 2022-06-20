import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamComponent } from './components/exam/exam.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './services/student.service';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ExamComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedModule
  ],
  providers:[StudentService]
})
export class StudentModule { }
