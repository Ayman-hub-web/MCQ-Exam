import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
data:any[] = [];
  constructor(private doctor: DoctorService) { }

  ngOnInit(): void {
    this.doctor.getAllStudentsResults().subscribe(res =>{
      this.data = res;
    });
  }

}
