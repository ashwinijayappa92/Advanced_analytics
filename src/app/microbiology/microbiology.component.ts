import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';
import { MatTabsModule } from '@angular/material';


@Component({
  selector: 'app-microbiology',
  templateUrl: './microbiology.component.html',
  styleUrls: ['./microbiology.component.css']
})
export class MicrobiologyComponent implements OnInit {


  /*result = {
   "projectDetails": {
     "projectName": "VDR16-0098_LPM Extra Doux Pomegranate",
     "itemCode": "PR-018025",
     "projectRep": "C Vaillant",
     "productCategory": "Skin Care - Adult",
     "submitter": "David Gauthier",
     "brand": "Le Petit Marseillais"
   },
   "results": [
     { "organism": "Bacteria", "value": "Pass" },
     { "organism": "Yeast", "value": "Pass" }
   ],
   "organisms": [
     {
       "organismName": "Bacteria",
       "data": [
         {
           "organism":"An",
           "hour6": {
             "logReduction":"4.2",
             "confidence": "63",
             "confidenceRange": "2.646 - 5.75",
             "result": "pass"
           },
           "hour24": {
             "logReduction":"4.2",
             "confidence": "63",
             "confidenceRange": "2.646 - 5.75",
             "result": "pass"
           },
           "hour48": {
             "logReduction": "4.2",
             "confidence": "63",
             "confidenceRange": "2.646 - 5.75",
             "result": "pass"
           },
           "days7": {
             "logReduction":"4.8",
             "confidence":"63",
             "confidenceRange": "3.024 - 6.58",
             "result": "fail"
           },
           "days14": {
             "logReduction": "4.6",
             "confidence": "63",
             "confidenceRange": "2.898 - 6.3",
             "result": "fail"
           },
           "days28": {
             "logReduction": "4.6",
             "confidence": "63",
             "confidenceRange": "2.898 - 6.3",
             "result": "fail"
           }
         }
       ]
     },
     {
       "organismName": "Yeast",
       "data": [
         {
           "organism": "An",
           "hour6": {
             "logReduction": "4.2",
             "confidence": "63",
             "confidenceRange": "2.646 - 5.75",
             "result": "pass"
           },
           "hour24": {
             "logReduction": "4.2",
             "confidence": "63",
             "confidenceRange": "2.646 - 5.75",
             "result": "pass"
           },
           "hour48": {
             "logReduction": "4.2",
             "confidence": "63",
             "confidenceRange": "2.646 - 5.75",
             "result": "pass"
           },
           "days7": {
             "logReduction": "4.8",
             "confidence": "63",
             "confidenceRange": "3.024 - 6.58",
             "result": "fail"
           },
           "days14": {
             "logReduction": "4.6",
             "confidence": "63",
             "confidenceRange": "2.898 - 6.3",
             "result": "fail"
           },
           "days28": {
             "logReduction": "4.6",
             "confidence": "63",
             "confidenceRange": "2.898 - 6.3",
             "result": "fail"
           }
         }
       ]
     }
   ],
   "criteria": {
     "name": "Topical, Vaginal, Rectal,Topical-nasal",
     "list": [
       {
         "organism": "Bacteria",
         "H6": { "value": "2", "color": "" },
         "H24": { "value": "3", "color": "" },
         "H48": { "value": "NA", "color": "" },
         "D7": { "value": "NI", "color": "" },
         "D14": { "value": "5", "color": "" },
         "D21": { "value": "5", "color": "" },
         "D28": { "value": "7", "color": "" }
       },
       {
         "organism": "Yeast & Mold",
         "H6": { "value": "2", "color": "" },
         "H24": { "value": "3", "color": "" },
         "H48": { "value": "NA", "color": "" },
         "D7": { "value": "NI", "color": "" },
         "D14": { "value": "5", "color": "" },
         "D21": { "value": "2", "color": "" },
         "D28": { "value": "7", "color": "" }
       }
     ]
   }
 };*/


  constructor(private http: HttpClient) { }

  /*ngOnInit() {
  }

 
  bacteriaTypeResponseArray = this.result.organisms[0].data;
  yeastTypeResponseArray = this.result.organisms[1].data;
  criteriaResponse = this.result.criteria;
  criteriaArray = this.result.criteria.list;
*/


  // microbiologyChallengeTestResult: any = [];
  result: any = [];
  criteriaStatus: any = [];
  bacteriaTypeResponseArray = [];
  yeastTypeResponseArray = [];
  criteriaResponse: any = null;
  criteriaArray: any = null;
  pakageTypearr: any = [];
  checking: boolean = false;
  formdata;
  dropDownvalues: any = [{ "category": "EP-A", "subcategory": [{ "0": "Parenteral, eye, intrauterine and intramammary preparations", "1": "Ear, nasal, cutaneous application and inhalation preparations", "2": "Oral, oromucosal and rectal preparations" }] }, { "category": "ISO-11930-A", "subcategory": [{ "0": "none" }] }, { "category": "ISO-11930-B", "subcategory": [{ "0": "none" }] }, { "category": "USP", "subcategory": [{ "0": "1", "1": "2", "2": "3", "3": "4" }] }];
  category: any = [{ value: '0', name: 'EP-A' }, { value: '1', name: 'ISO-11930-A' }, { value: '2', name: 'ISO-11930-B' }, { value: '3', name: 'USP' }];
  sub_category = [{ value: "0", name: "Parenteral, eye, intrauterine and intramammary preparations" }, { value: "1", name: "Ear, nasal, cutaneous application and inhalation preparations" }, { value: "2", name: "Oral, oromucosal and rectal preparations" }];

  cutomerdata;

  public loader: boolean = false;
  
  ngOnInit() {

    //this.http.get('http://54.89.210.31:5000/predict/micro/packagetypes')
    //this.http.get('http://localhost:4200/src/tt.txt').subscribe(res => this.pakageTypearr=res);

    //this.disableSelect = new FormControl(false);
    this.http.get('http://54.89.210.31:5000/predict/micro/packagetypes').subscribe(res => this.pakageTypearr = res);
    // this.dropDownvalues.forEach(function (element, index) {
    //   let test = element["category"];
    //   // this.category.push({ value: index, name: test });
    //   console.log(this.category);
    // });
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

      category: new FormControl("", Validators.compose([
        Validators.required,
      ])),
      subcategory: new FormControl("", Validators.compose([
        Validators.required,
      ])),


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
    //this.searchValue = null;
    this.formdata.reset() 
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
    search.set('c1', data.category);
    search.set('c2', data.subcategory);

    this.bacteriaTypeResponseArray = [];
      this.yeastTypeResponseArray = [];
      this.criteriaResponse = [];
      this.criteriaArray = [];

    let headerOption = {
      headers: headerPotion
    }

    this.http.get("http://54.89.210.31:5000/predict/micro/formula=" + data.fname + "&packagetype=" + data.pname + "&c1=" + data.category + "&c2=" + data.subcategory, headerOption).subscribe(res => {
      this.result = res;
      this.checking = true;
      this.loader = false;
      console.log(this.result);
      this.bacteriaTypeResponseArray = this.result.organisms[0].data;
      this.yeastTypeResponseArray = this.result.organisms[1].data;
      this.criteriaResponse = this.result.criteria;
      this.criteriaArray = this.result.criteria.list;
    });



  }

  isPositive(x: string, y: number) {
    console.log(x, y);
    return (parseInt(x, 10) >= y);
  }




  /*result = {
    "projectDetails": {
      "projectName": "ashu",
      "itemCode": "",
      "projectRep": "",
      "productCategory": "",
      "submitter": "",
      "brand": ""
    },
    "results": [
      { "organism": "a", "value": "1" },
      { "organism": "1a", "value": "2" }
    ],
    "organisms": [
      {
        "organismName": "",
        "data": [
          {
            "organism":"An",
            "hour6": {
              "logReduction":"4.2",
              "confidence": "63",
              "confidenceRange": "2.646 - 5.75",
              "result": "pass"
            },
            "hour24": {
              "logReduction":"4.2",
              "confidence": "63",
              "confidenceRange": "2.646 - 5.75",
              "result": "pass"
            },
            "hour48": {
              "logReduction": "4.2",
              "confidence": "63",
              "confidenceRange": "2.646 - 5.75",
              "result": "pass"
            },
            "days7": {
              "logReduction":"4.8",
              "confidence":"63",
              "confidenceRange": "3.024 - 6.58",
              "result": "fail"
            },
            "days14": {
              "logReduction": "4.6",
              "confidence": "63",
              "confidenceRange": "2.898 - 6.3",
              "result": "fail"
            },
            "days28": {
              "logReduction": "4.6",
              "confidence": "63",
              "confidenceRange": "2.898 - 6.3",
              "result": "fail"
            }
          }
        ]
      },
      {
        "organismName": "",
        "data": [
          {
            "organism": "An",
            "hour6": {
              "logReduction": "4.2",
              "confidence": "63",
              "confidenceRange": "2.646 - 5.75",
              "result": "pass"
            },
            "hour24": {
              "logReduction": "4.2",
              "confidence": "63",
              "confidenceRange": "2.646 - 5.75",
              "result": "pass"
            },
            "hour48": {
              "logReduction": "4.2",
              "confidence": "63",
              "confidenceRange": "2.646 - 5.75",
              "result": "pass"
            },
            "days7": {
              "logReduction": "4.8",
              "confidence": "63",
              "confidenceRange": "3.024 - 6.58",
              "result": "fail"
            },
            "days14": {
              "logReduction": "4.6",
              "confidence": "63",
              "confidenceRange": "2.898 - 6.3",
              "result": "fail"
            },
            "days28": {
              "logReduction": "4.6",
              "confidence": "63",
              "confidenceRange": "2.898 - 6.3",
              "result": "fail"
            }
          }
        ]
      }
    ],
    "criteria": {
      "name": "Topical, Vaginal, Rectal,Topical-nasal",
      "list": [
        {
          "organism": "",
          "6H": { "value": "", "color": "" },
          "24H": { "value": "", "color": "" },
          "48H": { "value": "", "color": "" },
          "7D": { "value": "", "color": "" },
          "14D": { "value": "", "color": "" },
          "21D": { "value": "", "color": "" },
          "28D": { "value": "", "color": "" }
        },
        {
          "organism": "",
          "6H": { "value": "", "color": "" },
          "24H": { "value": "", "color": "" },
          "48H": { "value": "", "color": "" },
          "7D": { "value": "", "color": "" },
          "14D": { "value": "", "color": "" },
          "21D": { "value": "", "color": "" },
          "28D": { "value": "", "color": "" }
        }
      ]
    }
  };*/




}