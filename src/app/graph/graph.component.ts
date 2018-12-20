import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { GraphServiceService } from '../graph-service.service';
import { UIChart } from 'primeng/primeng';

interface Month {
  name: string;
  code: string;
}

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})


export class GraphComponent implements OnInit {
  @ViewChild("baseChart")
  chart: UIChart;

  ngOnInit() {
    
  }
  selectedCity:string = "checked boxes";

  

  months: SelectItem[];
  selectedMonth: Month;
  isCollapsed = false;
  public data: any = null;
  public changedData: any = { labels: [], datasets: [] };
  public options: any;
  public lastAction: any;
  public ingredient_list = [{ ingredient_name: "Ingredient 1", is_checked: false }, { ingredient_name: "Ingredient 2", is_checked: false }, { ingredient_name: "Ingredient 3", is_checked: false }, { ingredient_name: "Ingredient 4", is_checked: false }, { ingredient_name: "Ingredient 5", is_checked: false }, { ingredient_name: "Ingredient 6", is_checked: false }, { ingredient_name: "Ingredient 7", is_checked: false }]
  public index;
  values = [0, 1, 2, 3];
  label = [];
  dataset = [];
  concentration = [];
  confidence = [];
  degradation = [];
  timepoints = [];


  constructor(private graphServiceService: GraphServiceService) {
    this.graphServiceService._initializeFormulaTimePoint.subscribe((ele: any) => {
     
    let tmpvar = [];
      for(let i=0; i<ele.length; i++){
        let j = i + 1;
        let tmp = {label : ele[i], value: ele[i]};
        tmpvar.push(tmp);
      }
    /*  this.months = [

         { label: '1 Month', value: { id: 1, name: '1 Month' } },
          { label: '3 Months', value: { id: 2, name: '3 Months' } },
       ];*/
       //alert(ele.length);
     this.months = tmpvar;
      console.log(this.months); 
    });

    this.graphServiceService._initializeProjectView.subscribe((ele: any) => {
      this.label = [];
      this.dataset = [];
      this.concentration = [];
      this.confidence = [];
      this.degradation = [];
      this.timepoints = [];

      console.log("Testing: ", ele);
      

      for (var i = 0; i < ele.length; i++) {
        this.label.push([ele[i].ingredient, ["Initial: " + ele[i].initialConcentration]]);
        this.concentration.push(isNaN(parseInt(ele[i].Concentration)) ? 0 : parseInt(ele[i].Concentration));
        this.confidence.push(isNaN(parseInt(ele[i].Confidence)) ? 0 : parseInt(ele[i].Confidence));
        this.degradation.push(isNaN(parseInt(ele[i].degradation)) ? 0 : parseInt(ele[i].degradation));
        //console.log(isNaN(parseInt(ele[i].degradation)));
      }
      this.dataset.push({ label: "Degradation", showLegend: "1", backgroundColor: "#4d7cfc", data: this.degradation })
      this.dataset.push({ label: "Concentration", backgroundColor: "#353e54", data: this.concentration })
      this.dataset.push({ label: "Confidence", backgroundColor: "#f25f5c", data: this.confidence })
      this.changedData.labels = this.label;
      this.changedData.datasets = this.dataset;


      this.data = Object.assign({}, this.changedData);

      this.options = {
        scales: {
          yAxes: [{
            gridLines: {
              display: true,
              lineWidth: 1,
              gridDashType: "dot",

            },
            display: true,
            ticks: {
              display: false,
              beginAtZero: true,

            },
          }],
          xAxes: [{
            gridLines: {
              display: false,
            },
            barPercentage: 1.0,
            categoryPercentage: 0.65,
            display: true,

          }]
        },

        legend: {
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 30

          },

          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 60,
              bottom: 90
            }
          }

        },

        tooltips: {
          backgroundColor: "#000",
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
                var iterator = 0;
                var setlabel = dataset.label;
                if ((setlabel == 'Degradation') && (iterator == 0)) {
                  iterator = iterator + 1;
                  ctx.fillText(data + '%', bar._model.x, bar._model.y);
                  return;
                }
              });
            });
          }
        },

      }
    });

  }

  getmonths(){
    this.graphServiceService._initializeFormulaData$.next(this.selectedCity);
  }
}
