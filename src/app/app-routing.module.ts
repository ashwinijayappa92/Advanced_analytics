import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateEmplyoeeComponent } from './employee/create-emplyoee.component';
import { CreateListComponent } from './employee/create-list.component';
import { AnalyticalComponent } from './analytical/analytical.component';
import { MicrobiologyComponent } from './microbiology/microbiology.component';
import { DosageComponent } from './dosage/dosage.component';
import { GraphComponent } from './graph/graph.component';
import { PhysicalComponent } from './physical/physical.component'; 

const appRoutes : Routes = [
  {path:"home", component:HomeComponent},
  {path:"list", component:CreateEmplyoeeComponent},
  {path:"create", component:CreateListComponent},
  {path:"microbiology", component:MicrobiologyComponent},

  //{path: "microbiology", component:CreateListComponent},
  {path: "analytical", component:AnalyticalComponent},
  {path:"", redirectTo:"/home",pathMatch:'full'},
  {path: "dosage", component:DosageComponent},
  {path: "graph", component:GraphComponent},
  {path: "physical", component:PhysicalComponent},
  //{path: "dosage", component:CreateListComponent},
  
  
  ]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
