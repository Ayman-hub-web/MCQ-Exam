import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewExamComponent } from './components/new-exam/new-exam.component';
import { StudentsComponent } from './components/students/students.component';
import { SubjectsComponent } from './components/subjects/subjects.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultPipe } from './pipes/result.pipe';



@NgModule({
  declarations: [
    NewExamComponent,
    StudentsComponent,
    SubjectsComponent,
    ResultPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class DoctorModule { }
