import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmplyoeeComponent } from './employee/create-emplyoee.component';
import { CreateListComponent } from './employee/create-list.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { SelectModule } from 'ng2-select';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {ChartModule} from 'primeng/primeng';
import {Http} from '@angular/http';
import { AnalyticalComponent } from './analytical/analytical.component';
import { ChartsModule } from 'ng2-charts';
import { MicrobiologyComponent } from './microbiology/microbiology.component';
import 'hammerjs';
import { DosageComponent } from './dosage/dosage.component';
import { GraphComponent } from './graph/graph.component';
import {AccordionModule} from 'primeng/accordion';   
import { DropdownModule } from 'primeng/dropdown';  
import {MenuItem} from 'primeng/api';
import { PhysicalComponent } from './physical/physical.component'; 
import { NgCircleProgressModule } from 'ng-circle-progress';
import {MatDividerModule} from '@angular/material';
import { HomePageComponent } from './home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmplyoeeComponent,
    CreateListComponent,
    HeaderComponent,
    HomeComponent,
    AnalyticalComponent,
    MicrobiologyComponent,
    DosageComponent,
    GraphComponent,
    PhysicalComponent,
    HomePageComponent,
   
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
   BrowserAnimationsModule,
    SelectModule,
    ChartsModule,
    DropdownModule,
    AccordionModule,
    ChartModule,
    DropdownModule,
    MatDividerModule,
    NgCircleProgressModule,
   
    NgCircleProgressModule.forRoot({
     radius: 100,
      "showInnerStroke": false,
      outerStrokeWidth: 16,
     outerStrokeColor: "#78C000",
    animationDuration: 300}),
   HttpClientModule ,
    MatAutocompleteModule,
    
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
    
  ],
  providers: [Http],
  bootstrap: [AppComponent]
})
export class AppModule { }
