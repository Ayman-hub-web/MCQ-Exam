import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup | any;
  change: any = 'doctor';
  logged:boolean = false;
  
  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
    let logged = localStorage.getItem('logged');
    if(logged != 'logged'){
      this.form = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
      });
    }else{
      this.router.navigate(['/subjects'], {relativeTo: this.route})
    }
    
  }

  submit() {
    if (this.change == 'doctor') {
      this.auth.getDoctor().subscribe(res => {
        const user = res.find((a:any)=>{
          return a.username === this.form.value.username && a.password === this.form.value.password
        });
        if(user){
          localStorage.setItem('name', user.name);
          localStorage.setItem('role', user.role);
          localStorage.setItem('logged', 'logged');
          this.ngOnInit();
          this.router.navigate(['/subjects'], {relativeTo: this.route}). then(() => {
            window. location. reload();
            });
        }else{
          this.toast.error("invalid username or password" , "" , {
            disableTimeOut: false,
            titleClass: "toastr_title",
            messageClass: "toastr_message",
            timeOut:5000,
            closeButton: true,
          })
        }
      })
    }else{
      this.auth.getStudents().subscribe(res => {
        const user = res.find((a:any)=>{
          return a.username === this.form.value.username && a.password === this.form.value.password
        });
        if(user){
          localStorage.setItem('name', user.name);
          localStorage.setItem('role', user.role);
          this.ngOnInit();
          this.logged = true;
          localStorage.setItem('logged', 'logged');
          this.router.navigate(['/subjects'], {relativeTo: this.route}). then(() => {
            window. location. reload();
            });
        }else{
          this.toast.error("invalid username or password" , "" , {
            disableTimeOut: false,
            titleClass: "toastr_title",
            messageClass: "toastr_message",
            timeOut:5000,
            closeButton: true,
          })
        }
      })
    }
  }
  onChecked(event: any) {
    this.change = event.value;
    console.log('change', this.change);

  }
  
}
