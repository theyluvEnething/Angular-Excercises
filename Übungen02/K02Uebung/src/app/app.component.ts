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
  selectedIndex = 0;
  sortOrder : string = ""

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.breakpointObserver.observe([Breakpoints.XSmall]).subscribe(result => {
      this.isSmallScreen = result.matches;
    });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.updateTabIndex();
    });
  }
  
  private updateTabIndex() {
    const url = this.router.url;
    if (url.includes('/home')) {
      this.selectedIndex = 0;
    } else if (url.includes('/stations/name')) {
      this.selectedIndex = 1;
    } else if (url.includes('/stations/temperature')) {
      this.selectedIndex = 2;
    } else if (url.includes('/stations/precipitation')) {
      this.selectedIndex = 3;
    } else if (url.includes('/stations/airpressure')) {
      this.selectedIndex = 4;
    }
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
    }
  }
}
