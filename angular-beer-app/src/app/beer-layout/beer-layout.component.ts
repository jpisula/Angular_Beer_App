import { Component, OnInit } from '@angular/core';
import { BeerLayoutService } from '../beer-layout.service';

@Component({
  selector: 'app-beer-layout',
  templateUrl: './beer-layout.component.html',
  styleUrls: ['./beer-layout.component.scss']
})
export class BeerLayoutComponent implements OnInit {
  beerResponse: any;
  brewersList = [];
  areBeersLoaded = false;

  constructor(private beerLayoutService: BeerLayoutService) { 
    this.beerLayoutService.getBeers().subscribe(resp => {
      this.beerResponse = resp;
      //deleting some unnecessary fields
      this.beerResponse = this.beerResponse.map(beerItem => ({
        beer_id: beerItem.beer_id,
        brewer: beerItem.brewer,
        type: beerItem.type,
        name: beerItem.name,
        price: beerItem.price,
        image_url: beerItem.image_url
      }));
      localStorage.setItem('BEER_DATA', JSON.stringify(this.beerResponse));
      this.brewersList = [...new Set(this.beerResponse.map(item => item.brewer))];
      this.brewersList.sort((a, b) => a.localeCompare(b));
      localStorage.setItem('BREWERS_LIST', JSON.stringify(this.brewersList));
      this.areBeersLoaded = true;
    });
  }

  ngOnInit(): void {
  }

}
