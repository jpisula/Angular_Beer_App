import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.scss']
})
export class BeerListComponent implements OnInit { 
  form: FormGroup;
  @Input() brewers = [];
  beersFromBrewer = [];
  beersToShow = [];
  isLoadMoreBtnVisible = false;
  applicationSettings = JSON.parse(localStorage.getItem('APPLICATION_SETTINGS'));
  brewerValue;

  constructor(private formBuilder: FormBuilder, private localStorageService: LocalStorageService, private elRef: ElementRef) { }

  ngOnInit(): void {
    this.localStorageService.getChangedObject().subscribe(AppSett => {
      if(AppSett && this.beersFromBrewer && this.beersToShow) {
        if(AppSett.sorted_by && AppSett.sorted_by != this.applicationSettings.sorted_by) {
          this.applicationSettings.sorted_by = AppSett.sorted_by;
          if(AppSett.sorted_by != 'price') {
            this.beersFromBrewer.sort((a, b) => a[AppSett.sorted_by].localeCompare(b[AppSett.sorted_by]));
            this.beersToShow.sort((a, b) => a[AppSett.sorted_by].localeCompare(b[AppSett.sorted_by]));
          } else {
            this.beersFromBrewer.sort((a, b) => a[AppSett.sorted_by] - b[AppSett.sorted_by]);
            this.beersToShow.sort((a, b) => a[AppSett.sorted_by] - b[AppSett.sorted_by]);
          }
        }
        if(AppSett.beers_amount && AppSett.beers_amount != this.applicationSettings.beers_amount) {
          this.applicationSettings.beers_amount = AppSett.beers_amount;
        }
      }
    });

    if(localStorage.getItem('SELECTED_BREWERS')) {
      const listId = this.elRef.nativeElement.parentElement.id;
      const listPosition = listId.slice(0,listId.indexOf('-'));
      let selectedBrewers = JSON.parse(localStorage.getItem('SELECTED_BREWERS'));
      this.brewerValue = selectedBrewers[listPosition] ? selectedBrewers[listPosition] : null;
    } else {
      this.brewerValue = null;
    }

    this.form = this.formBuilder.group({
      brewerValue: this.brewerValue,
      brewers: ['']
    });
    if(this.brewerValue) {
      this.onOptionSelected(this.brewerValue);
    }
  }

  onOptionSelected(value:string){    
    this.beersFromBrewer = JSON.parse(localStorage.getItem('BEER_DATA')).filter(item => item.brewer === value);
    if(this.applicationSettings.sorted_by != 'price') {
      this.beersFromBrewer.sort((a, b) => a[this.applicationSettings.sorted_by].localeCompare(b[this.applicationSettings.sorted_by]));
    } else {
      this.beersFromBrewer.sort((a, b) => a[this.applicationSettings.sorted_by] - b[this.applicationSettings.sorted_by]);
    }
    
    if(this.beersFromBrewer.length > this.applicationSettings.beers_amount) {
      this.isLoadMoreBtnVisible = true;
      this.beersToShow = this.beersFromBrewer.slice(0,this.applicationSettings.beers_amount);
    } else {
      this.isLoadMoreBtnVisible = false;
      this.beersToShow = this.beersFromBrewer;
    }

    const listId = this.elRef.nativeElement.parentElement.id;
    const listPosition = listId.slice(0,listId.indexOf('-'));
    let selectedBrewers = {};
    if(localStorage.getItem('SELECTED_BREWERS')) {
      let selectedBrewers = JSON.parse(localStorage.getItem('SELECTED_BREWERS'));
      selectedBrewers[listPosition] = value;
      localStorage.setItem('SELECTED_BREWERS', JSON.stringify(selectedBrewers));
    } else {
      selectedBrewers[listPosition] = value;
      localStorage.setItem('SELECTED_BREWERS', JSON.stringify(selectedBrewers));
    }
  }

  loadMoreItems() {
    let iteration = this.beersToShow.length / this.applicationSettings.beers_amount;
    if(this.beersFromBrewer.length > this.applicationSettings.beers_amount * iteration) {
      this.beersToShow = this.beersFromBrewer.slice(0,this.applicationSettings.beers_amount * (iteration + 1));
      this.beersToShow.concat(this.beersFromBrewer.slice(this.applicationSettings.beers_amount * iteration,this.applicationSettings.beers_amount * (iteration + 1)))
      if(this.beersToShow.length == this.beersFromBrewer.length) {
        this.isLoadMoreBtnVisible = false;
      }
    } else {
      this.isLoadMoreBtnVisible = false;
      this.beersToShow = this.beersFromBrewer;
    }
  }

}
