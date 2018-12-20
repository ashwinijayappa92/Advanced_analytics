import { Component, OnInit } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
  routeLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.routeLinks = [
        {
            label: 'Microbiology Challenge',
            link: '/microbiology',
            index: 0
        }, {
            label: 'Analytical Dosage',
            link: '/dosage',
            index: 1
        }, 
        {
          label: 'Physical Stability',
          link: '/physical',
          index: 1
      }, 
      {
        label: 'Allergy',
        link: '/allergy',
        index: 1
    }, 

    /*{
      label: 'carosel',
      link: '/carosel',
      index: 1
  }, */
    ];
}
ngOnInit(): void {
    this.router.events.subscribe((res) => {
        this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
}
}
  /*chartOptions = {
    responsive: true  ,
    //legend: { radius: '8' },
    
      layout: 
        {
          padding: {
            left: 50,
            right: 0,
            top: 0,
            bottom: 0
        }
        }
    
    // THIS WILL MAKE THE CHART RESPONSIVE (VISIBLE IN ANY DEVICE).
  };
  datasets: [{
    fill: true,
    backgroundColor: [
      'black',
      'white'
    ],
    
  }];

  labels =  ['Ingredient 1 intial:0.2', 'Ingredient 2', 'Ingredient 3', 'Ingredient 4', 'Ingredient 5'];
  
  // STATIC DATA FOR THE CHART IN JSON FORMAT.
  chartData = [
    {
      label: '1st Year',
      data: [21, 56, 4, 31, 45, 15, 57, 61, 9, 17, 24, 59] 
    },
    { 
      label: '2nd Year',
      data: [47, 9, 28, 54, 77, 51, 24]
    },
    { 
      label: '3nd Year',
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

}*/
