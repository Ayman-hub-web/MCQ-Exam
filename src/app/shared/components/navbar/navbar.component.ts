import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
logged:boolean = false;
name:string | any;
role:string | any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
    this.role = localStorage.getItem('role');
    console.log('role', this.role);
    this.logged = localStorage.getItem('logged') === 'logged'? true : false;
    console.log('logged', this.logged);
  }
  logout(){
    this.logged= false;
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.setItem('logged', 'notLogged');
    this.ngOnInit();
    this.router.navigate(['/login'], {relativeTo: this.route})
  }

}
