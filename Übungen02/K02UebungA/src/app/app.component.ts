import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'ua-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'K02Uebung';

  isSmallScreen = false;
  sortOrder : string = ""

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
  }

  onTabChange(index: number) {
    switch (index) {
      case 0:
        this.router.navigate(['/home']);
        break;
      case 1:
        this.router.navigate(['/stations/name']);
        break;
      case 2:
        this.router.navigate(['/stations/temperature']);
        break;
      case 3:
        this.router.navigate(['/stations/precipitation']);
        break;
      case 4:
        this.router.navigate(['/stations/airpressure']);
        break;
      default:
        break;
    }
        
  }
}
