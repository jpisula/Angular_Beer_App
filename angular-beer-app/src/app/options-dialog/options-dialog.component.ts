import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalStorageService } from '../local-storage.service';
import { OptionsDialogData } from '../navbar/navbar.component';


@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.scss']
})
export class OptionsDialogComponent {
  form: FormGroup;
  beers_amount: number;
  layout_theme: string;
  sorted_by: string;
  beer_options = [ 15, 30];
  layout_types = ['light', 'dark'];
  sorted_by_options = ['name', 'price', 'type'];
  applicationSettings = JSON.parse(localStorage.getItem('APPLICATION_SETTINGS'));
  localStorageService = new LocalStorageService();
  
  
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OptionsDialogData) {

      this.form = this.formBuilder.group({
        beers_amount: this.applicationSettings.beers_amount,
        layout_theme: this.applicationSettings.layout_theme,
        sorted_by: this.applicationSettings.sorted_by
      });
    }

  onCancelClick(): void {
    this.beers_amount = undefined;
    this.layout_theme = undefined;
    this.sorted_by = undefined;
    this.dialogRef.close();
  }

  onSaveClick(): void {
    let newAppSettings = {
      beers_amount: null,
      layout_theme: null,
      sorted_by: null
    };
    if(this.beers_amount || this.layout_theme || this.sorted_by) {
      if(this.beers_amount && this.beers_amount != this.applicationSettings.beers_amount) {
        newAppSettings.beers_amount = this.beers_amount;
      } else {
        newAppSettings.beers_amount = this.applicationSettings.beers_amount;
      }

      if(this.layout_theme && this.layout_theme != this.applicationSettings.layout_theme) {
        newAppSettings.layout_theme = this.layout_theme;
      } else {
        newAppSettings.layout_theme = this.applicationSettings.layout_theme;
      }

      if(this.sorted_by && this.sorted_by != this.applicationSettings.sorted_by) {
        newAppSettings.sorted_by = this.sorted_by;
      } else {
        newAppSettings.sorted_by = this.applicationSettings.sorted_by;
      }
      localStorage.setItem('APPLICATION_SETTINGS', JSON.stringify(newAppSettings));    
    }
    this.dialogRef.close();
  }

  onBeerAmountChange(amount) {
    this.beers_amount = amount;
  }

  onLayoutThemeChange(type) {
    this.layout_theme = type;
  }

  onSortedByChange(type) {
    this.sorted_by = type;
  }
}
