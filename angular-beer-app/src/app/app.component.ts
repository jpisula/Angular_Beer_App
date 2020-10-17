import { OverlayContainer } from '@angular/cdk/overlay';
import { OnInit } from '@angular/core';
import { HostBinding } from '@angular/core';
import { Component } from '@angular/core';
import { BeerLayoutService } from './beer-layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'STS - Beer App By Jakub Pisula';
  settings = {
    beers_amount: 15,
    layout_theme: 'light',
    sorted_by: 'name'
  }
  isDarkTheme = false;

  constructor(private beerLayoutService: BeerLayoutService) {
    if(!localStorage.getItem('APPLICATION_SETTINGS')) {
      localStorage.setItem('APPLICATION_SETTINGS', JSON.stringify(this.settings));
    }
  }
  ngOnInit(): void {
    if(localStorage.getItem('APPLICATION_SETTINGS')) {
      this.beerLayoutService.toggleTheme(JSON.parse(localStorage.getItem('APPLICATION_SETTINGS')).layout_theme);
    }

    this.beerLayoutService.getTheme().subscribe(AppSett => {
      if(AppSett) {
        if(AppSett == "dark") {
          this.isDarkTheme = true;
        } else {
          this.isDarkTheme = false;
        }
      }
    });
  }
}
