import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { element } from '@angular/core/src/render3';
import { GraphServiceService } from '../graph-service.service'


@Component({
  selector: 'app-dosage',
  templateUrl: './dosage.component.html',
  styleUrls: ['./dosage.component.css']
})
export class DosageComponent implements OnInit {
  
  public index;
  values = [0, 1, 2, 3];

  dosageResponse: any = [];
  result: any = [];
  projectDetails: any[];
  varArr: any = [];
  criteriaResponse: any = null;
  criteriaArray: any = null;
  pakageTypearr: any = [];
  checking: boolean = false;
  ratiovalues: boolean = false;
  getIngredients: boolean = true;
  ingredientArr: any = [];
  formdata;
  searchValue: string = '';
  cutomerdata;
  searchDataSet: any;

  public loader: boolean = false;
  constructor(private http: HttpClient, private graphServiceService: GraphServiceService) {
    this.graphServiceService._initializeFormulaData.subscribe((ele: any) => {
      console.log(this.searchDataSet);
      console.log(ele);
      if (this.searchDataSet) {
        let headerPotion = new HttpHeaders({
          'Content-Type': 'application/json'
        })

        let sendObjData = {
          "formula": this.searchDataSet.fname,
          "packageType": this.searchDataSet.pname,
          "packageVolume": this.searchDataSet.plname,
          "ingredients": this.checkIngridentList,
          "timepoint": ele
        };
        let headerOption = {
          headers: headerPotion
        }

        this.http.post("http://54.89.210.31:5000/predict/dosage/", sendObjData, headerOption).subscribe(res => {
          this.result = res;
          this.checking = true;
          this.loader = false;
          console.log(this.result);
          this.graphServiceService._initializeProjectView$.next(this.result);
        });
      }

    })
  }

  ngOnInit() {
   this.http.get('http://54.89.210.31:5000/predict/micro/packagetypes').subscribe(res => { this.pakageTypearr = res; /*console.log("Testing testing", this.pakageTypearr);*/ });
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

  }

  clearSearch() {
    this.formdata.reset();
    this.ratiovalues = false;
    this.getIngredients = true;
    this.dosageResponse = [];
    this.projectDetails = [];

  }

  addRemove(ingredient, initialConcentration, status) {
    if (status) {
      this.varArr.push({ "ingredient": ingredient, "initialConcentration": initialConcentration });
    }
    else {
      let i = 0;
      this.varArr.forEach(ele => {
        if (ele.ingredient == ingredient) {
          this.varArr.splice(i, 1);

        }
        i++;
      });
    }
    console.log(this.varArr);
  }



  checkIngridentList: any = [];
  update(ingredient) {
    if (ingredient.checked) {
      this.checkIngridentList.push(ingredient);
    }
    else {
      for (let i = 0; i < this.checkIngridentList.length; i++) {
        if (this.checkIngridentList[i].ingredient == ingredient.ingredient) {
          this.checkIngridentList.splice(i, 1);
          break;
        }
      }
    }
    console.log(this.checkIngridentList);
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
      this.ratiovalues = true;
      this.getIngredients = false;
      this.loader = false;
      console.log(res);
      //  this.dosageResponse = res;
      temp.ingredients.forEach((ele) => {
        if (ele.model_available == "True") {
          ele.checked = false;
          this.dosageResponse.push(ele)
        }
      });
      this.graphServiceService._initializeFormulaTimePoint$.next(temp.timepoints);
      //alert(temp.timepoints);
    });
  }



  onSubmitIngrediant(data) {
    this.loader = true;
    this.searchDataSet = data;
    console.log(data);
    let headerPotion = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    let sendObjData = {
      "formula": data.fname,
      "packageType": data.pname,
      "packageVolume": data.plname,
      "ingredients": this.checkIngridentList,
      "timepoint": ""

    };
    let headerOption = {
      headers: headerPotion
    }

    this.http.post("http://54.89.210.31:5000/predict/dosage/", sendObjData, headerOption).subscribe(res => {
      this.result = res;
      this.checking = true;
      this.loader = false;
      console.log(this.result);
      this.graphServiceService._initializeProjectView$.next(this.result);

    });
  }


  isPositive(x: string, y: number) {
    console.log(x, y);
    return (parseInt(x, 10) >= y);
  }



}

