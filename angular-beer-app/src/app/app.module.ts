import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { AppBootstrapModule } from './app-bootstrap.module';
import { AppComponent } from './app.component';
import { BeerItemComponent } from './beer-item/beer-item.component';
import { BeerListComponent } from './beer-list/beer-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BeerLayoutComponent } from './beer-layout/beer-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OptionsDialogComponent } from './options-dialog/options-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    BeerItemComponent,
    BeerListComponent,
    BeerLayoutComponent,
    NavbarComponent,
    OptionsDialogComponent
  ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppBootstrapModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatRadioModule,
    OverlayModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
