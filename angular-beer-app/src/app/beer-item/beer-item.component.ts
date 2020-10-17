import { Component, Input, OnInit } from '@angular/core';
import { BeerItem } from './beerItem';

@Component({
  selector: 'app-beer-item',
  templateUrl: './beer-item.component.html',
  styleUrls: ['./beer-item.component.scss']
})
export class BeerItemComponent implements OnInit {
  @Input() beerItem: BeerItem;

  constructor() { }

  ngOnInit(): void {
  }
}
