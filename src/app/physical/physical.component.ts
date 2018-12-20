import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { GraphServiceService } from '../graph-service.service';

@Component({
  selector: 'app-physical',
  templateUrl: './physical.component.html',
  styleUrls: ['./physical.component.css']
})
export class PhysicalComponent implements OnInit {
constructor(private http: HttpClient, private graphServiceService: GraphServiceService) {

  this.graphServiceService._initializeFormulaTimePoint.subscribe((ele: any) => {
    // alert(ele);
    
    });
}
 percent:number = 20;
  result: any = [];
  projectDetails: any[];
 criteriaResponse: any = null;
 pakageTypearr: any = [];
 checking: boolean = false;
 formdata;
 dropDownvalues: any = [{ "category": "EP-A", "subcategory": [{ "0": "Parenteral, eye, intrauterine and intramammary preparations", "1": "Ear, nasal, cutaneous application and inhalation preparations", "2": "Oral, oromucosal and rectal preparations" }] }, { "category": "ISO-11930-A", "subcategory": [{ "0": "none" }] }, { "category": "ISO-11930-B", "subcategory": [{ "0": "none" }] }, { "category": "USP", "subcategory": [{ "0": "1", "1": "2", "2": "3", "3": "4" }] }];
 category: any = [{ value: '0', name: 'EP-A' }, { value: '1', name: 'ISO-11930-A' }, { value: '2', name: 'ISO-11930-B' }, { value: '3', name: 'USP' }];
 sub_category = [{ value: "0", name: "Parenteral, eye, intrauterine and intramammary preparations" }, { value: "1", name: "Ear, nasal, cutaneous application and inhalation preparations" }, { value: "2", name: "Oral, oromucosal and rectal preparations" }];

 cutomerdata;

 public loader: boolean = false;
 
 ngOnInit() {
 this.http.get('http://54.89.210.31:5000/predict/micro/packagetypes').subscribe(res => this.pakageTypearr = res);
   

   this.formdata = new FormGroup({
     fname: new FormControl("", Validators.compose([
       Validators.required,
       Validators.minLength(5)
     ])),
     lname: new FormControl("1500", Validators.compose([
       Validators.required,
       Validators.minLength(5)
     ])),
     pname: new FormControl(""),
     plname: new FormControl(""),
   });
 this.onChanges();


 }



 onChanges() {
   // this.formdata.get('country').valueChanges
   //   .subscribe(countryvalue => {
   //     if (countryvalue != '0') {
   //       this.formdata.get('state').reset();
   //       this.formdata.get('state').disable();
   //     }
   //     else {
   //       this.formdata.get('state').enable();
   //     }
   //   });
   //this.formdata.get('country').valueChanges
   this.formdata.get('category').valueChanges
     .subscribe(countryvalue => {
       console.log("########", countryvalue)

       if (countryvalue == "0") {
         this.sub_category = [{ value: "0", name: "Parenteral, eye, intrauterine and intramammary preparations" }, { value: "1", name: "Ear, nasal, cutaneous application and inhalation preparations" }, { value: "2", name: "Oral, oromucosal and rectal preparations" }];
       }
       else if (countryvalue == "3") {
         this.sub_category = [{ value: "0", name: "1" }, { value: "1", name: "2" }, { value: "2", name: "3" }, { value: "3", name: "4" }];
       } else {
         this.sub_category = []
       }
     });
}


 clearSearch() {
   this.formdata.reset() 
 }

 
 onFormulaSearch(data) {
  this.loader = true;
  console.log(data);

  let headerPotion = new HttpHeaders({
    'Content-Type': 'application/json'
  })
  let search = new HttpParams();
  search.set('packagetype', data.pname);
  search.set('formula', data.fname);
  this.projectDetails = [];
  let headerOption = {
    headers: headerPotion
  }

  this.http.get("http://54.89.210.31:5000/predict/dosage/formulainfo/" + data.fname, headerOption).subscribe(res => {
    var temp: any = res;
    this.projectDetails = temp.projectDetails;
    this.checking = true;
  
    this.loader = false;
    console.log(res);
    //  this.dosageResponse = res;
    
    this.graphServiceService._initializeFormulaTimePoint$.next(temp.timepoints);
    //alert(temp.timepoints);
  });
}




 onClickSubmit(data) {
   this.loader = true;
   console.log(data);

   let headerPotion = new HttpHeaders({
     'Content-Type': 'application/json'
   })
   let search = new HttpParams();
   search.set('packagetype', data.pname);
   search.set('formula', data.fname);
  

 
   this.criteriaResponse = [];
    
   let headerOption = {
     headers: headerPotion
   }

   this.http.get("http://54.89.210.31:5000/predict/micro/formula=" + data.fname + "&packagetype=" + data.pname + "&c1=" + data.category + "&c2=" + data.subcategory, headerOption).subscribe(res => {
     this.result = res;
     this.checking = true;
     this.loader = false;
     console.log(this.result);
   this.criteriaResponse = this.result.criteria;
   
   });

 }


 isPositive(x: string, y: number) {
   console.log(x, y);
   return (parseInt(x, 10) >= y);
 }

}