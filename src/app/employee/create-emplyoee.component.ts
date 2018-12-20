import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpParams, HttpHeaders } from '@angular/common/http';
import {ReactiveFormsModule , FormGroup, FormControl, Validators} from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';

@Component({
  selector: 'app-create-emplyoee',
  templateUrl: './create-emplyoee.component.html',
  styleUrls: ['./create-emplyoee.component.css']
})
export class CreateEmplyoeeComponent implements OnInit {
  //category:any[];
  //sub_category:any[];
  constructor(private http:HttpClient) { }
  microbiologyChallengeTestResult:any=[];
  pakageTypearr:any = [];
   formdata;
   category = [{value: 'EP - A', name: 'EP - A'}, {value: 'ISO 11930 A', name: 'ISO 11930 A'}, {value: 'ISO 11930 B', name: 'ISO 11930 B'}];
   sub_category = [{ value: " EP - A1", name: " EP - A1" }, { value: " 2 - Ear,", name: " 2 - Ear," }, { value: "3 - Oral", name: "3 - Oral" }];
   //addressForm;
   //disableSelect;
  /*formdatad={
    "pname":"",
    "fname":null,
    "lname":null
  };*/
   cutomerdata;
  
   public loader: boolean = false; 
  
  
  ngOnInit() {

    //this.http.get('http://54.89.210.31:5000/predict/micro/packagetypes')
    //this.http.get('http://localhost:4200/src/tt.txt').subscribe(res => this.pakageTypearr=res);
    
    //this.disableSelect = new FormControl(false);
    this.http.get('http://54.89.210.31:5000/predict/micro/packagetypes').subscribe(res => this.pakageTypearr=res);
      this.formdata = new FormGroup({
        fname: new FormControl("", Validators.compose([
           Validators.required,
           Validators.minLength(5)
        ])),
        lname: new FormControl("1500", Validators.compose([
           Validators.required,
           Validators.minLength(5)
        ])),
        pname:new FormControl(""),

        country:new FormControl("", Validators.compose([
          Validators.required,
        ])),
        state:new FormControl("", Validators.compose([
          Validators.required,
        ])),
        
         
     });


     
this.onChanges();
    
    
  }



  onChanges() {
    this.formdata.get('country').valueChanges
    .subscribe(countryvalue => {
        if (countryvalue != 'EP - A') {
            this.formdata.get('state').reset();
            this.formdata.get('state').disable();
        }
        else {
            this.formdata.get('state').enable();
        }
    });
}
 

  /*dis_able()
{
if(document.myform.D1.value != ‘Others’)
document.myform.otherz.disabled=1;
else
document.myform.otherz.disabled=0;
}*/
 /* show(){
    if(this.formdatad.fname != " "){
    document.getElementById("demo").innerHTML="<i class='fa fa-refresh fa-spin fa-3x fa-fw'></i>"+
    "<span class='sr-only' style='color:#000'>No data to be displayed</span>"
  }
}
*/



  
 onClickSubmit(data) {
   this.loader = true;
 
   let headerPotion = new HttpHeaders({
    'Content-Type': 'application/json'
   })
  let search = new HttpParams();
  search.set('packagetype', data.pname);
  //search.set('samplesize', data.lname);
  search.set('formula',data.fname);
  search.set('c1',data.country);
  search.set('c2',data.state);

  let headerOption ={
    headers: headerPotion
  }
  //let url = "http://54.89.210.31:5000/predict/micro/formula="+data.fname+"&packagetype="+data.pname+"&samplesize="+data.lname;
  
  //this.http.get(url,headerOption).subscribe(( response : any )=> {
   // const params = new HttpParams().set('formula',data.fname).set('packagetype', data.pname).set('samplesize', data.lname);  
 // this.http.get(url,{responseType:"json",params}).subscribe(( response : any )=> {
  //  this.apiresponse = response;
   // console.log("Res:",response);
  //  //alert('"Res:",response')
  //});


 //this.http.get('http://localhost:4200/src/apidta.txt').subscribe(res => {
  
    this.http.get("http://54.89.210.31:5000/predict/micro/formula="+data.fname+"&packagetype="+data.pname+"&c1="+data.state+"&c2="+data.country,headerOption).subscribe(res => {

    this.microbiologyChallengeTestResult = res;
this.loader = false;
  });

}


}