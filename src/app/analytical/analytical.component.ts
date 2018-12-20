import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpParams, HttpHeaders } from '@angular/common/http';
import {ReactiveFormsModule , FormGroup, FormControl, Validators} from '@angular/forms';
import { formControlBinding } from '@angular/forms/src/directives/ng_model';


@Component({
  selector: 'app-analytical',
  templateUrl: './analytical.component.html',
  styleUrls: ['./analytical.component.css']
})
export class AnalyticalComponent implements OnInit {

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
   public options: any;
  
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
  search.set('samplesize', data.lname);
  search.set('formula',data.fname);

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
  
    this.http.get("http://54.89.210.31:5000/predict/micro/formula="+data.fname+"&packagetype="+data.pname+"&samplesize="+data.lname,headerOption).subscribe(res => {

    this.microbiologyChallengeTestResult = res;
this.loader = false;
  });

}


chartOptions = {
  responsive: true  ,
  //legend: { radius: '8' },
  "hover": {
    "animationDuration": 0
  },
  "animation": {
    "duration": 1,
    "onComplete": function () {
        var chartInstance = this.chart,
        ctx = chartInstance.ctx;

        //ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        this.data.datasets.forEach(function (dataset, i) {
            var meta = chartInstance.controller.getDatasetMeta(i);
            meta.data.forEach(function (bar, index) {
                var data = dataset.data[index];                            
                ctx.fillText(data+ '%', bar._model.x, bar._model.y - 5);
            });
        });
    }
},


  legend:{
    display: true,
    labels: {
      usePointStyle: true,
       fontColor: '#333',
    }
  },


  scales: {
    yAxes: [{
        display: true,
        padding:1,
        gridLines: {
            display : false,
            
        },
        ticks: {
            display: false,
            beginAtZero:true,
           /* min: 0,
        max: 100,// Your absolute max value
        callback: function (value) {
          return (value / this.max * 100).toFixed(0) + '%'; // convert it to percentage
        },*/
        }
    }],
    xAxes: [{
      display: true,
     padding:1,
     barPercentage: 1.0,
      categoryPercentage: 0.75,
        gridLines: {
            display : false
        },
        ticks: {
            beginAtZero:true
        }
    }]
},

layout: {
  padding: {
      left: 0,
      right: 50,
      top: 20,
      bottom: 20
  }
}
    
  
  // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
};   







datasets: [{
  fill: false,
  backgroundColor: [
    'black',
    'white'
  ],
  borderColor:'red'
  
}];

labels =  ['Ingredient 1 intial:0.2', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4', 'Ingredient 5'];
 
// STATIC DATA FOR THE CHART IN JSON FORMAT.
chartData = [
  {
    label: 'Degradation',
    data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
  },
  { 
    label: 'Concentration',
    data: [47, 9, 28, 54, 77, 51, 24]
  },
  { 
    label: 'Confidence',
    data: [27, 9, 28, 54, 47, 81, 24]
  }
];



// CHART COLOR.
colors = [
  { // 1st Year.
    backgroundColor: '#4d7cfc'
  },
  { // 2nd Year.
    backgroundColor: '#353e54'
  },

  { // 3nd Year.
    backgroundColor: '#f25f5c'
  }
];

onChartClick(event) {
  console.log(event);
} 


}