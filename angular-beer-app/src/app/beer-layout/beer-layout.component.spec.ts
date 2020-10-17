import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeerLayoutComponent } from './beer-layout.component';

describe('BeerLayoutComponent', () => {
  let component: BeerLayoutComponent;
  let fixture: ComponentFixture<BeerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeerLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
