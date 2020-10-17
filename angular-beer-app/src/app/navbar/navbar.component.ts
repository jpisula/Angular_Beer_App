import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BeerLayoutService } from '../beer-layout.service';
import { LocalStorageService } from '../local-storage.service';
import { OptionsDialogComponent } from '../options-dialog/options-dialog.component';

export interface OptionsDialogData {
  beers_amount: number,
  layout_theme: string,
  sorted_by: string
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() appTitle;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog, 
    private localStorageService: LocalStorageService,
    private beerLayoutService: BeerLayoutService) { }

  ngOnInit(): void {
  }

  openOptionsDialog(): void {
    const dialogRef = this.dialog.open(OptionsDialogComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(() => {
      const localStorageItem = JSON.parse(localStorage.getItem('APPLICATION_SETTINGS'));
      this.localStorageService.changeLocalStorageObject(localStorageItem);
      this.beerLayoutService.toggleTheme(localStorageItem.layout_theme);
    });
  }

}
