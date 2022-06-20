import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute){}

canActivate(route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | Promise<boolean> {
  if(!this.auth.isDoctor()){
    this.router.navigate(['/subjects'], {relativeTo: this.route});
  }
  return this.auth.isDoctor();
}
  
}
