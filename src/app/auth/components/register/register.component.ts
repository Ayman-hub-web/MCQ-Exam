import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup | any;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private toast:ToastrService) { }

  ngOnInit(): void {
    let logged = localStorage.getItem('logged');
    if (logged != 'logged') {
      this.form = new FormGroup({
        name: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl(''),
        confirmpassword: new FormControl(''),
        role: new FormControl('student')
      });
    } else {
      this.router.navigate(['/subjects'], { relativeTo: this.route })
    }
  }

  submit() {
    if (this.form.value.password === this.form.value.confirmpassword) {
      this.auth.addStudent(this.form.value).subscribe(res => {
        localStorage.setItem('name', this.form.value.name);
        localStorage.setItem('role', this.form.value.role);
        localStorage.setItem('logged', 'logged');
        this.router.navigate(['/subjects'], { relativeTo: this.route })
      })
    } else {
      this.toast.error("Please check your password and confirmpassword" , "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:5000,
        closeButton: true,
      })
    }
  }

}
