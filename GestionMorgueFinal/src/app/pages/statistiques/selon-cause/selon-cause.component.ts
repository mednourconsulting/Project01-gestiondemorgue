import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {CauseService} from '../../../@core/backend/common/services/Cause.service';
import {Cause} from '../../../@core/backend/common/model/Cause';


@Component({
  selector: 'ngx-selon-cause',
  templateUrl: './selon-cause.component.html',
  styleUrls: ['./selon-cause.component.scss'],
  providers: [DecedesService , CauseService ],
})
export class SelonCauseComponent implements OnInit {
  public causes: Array<Cause>;
  public decedesList = [];
  public chartLabels = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  annee: string;
  List = [];
  public currentDate = (new Date).getFullYear().toString();

  A: number = 0;
  public chartType: string = 'bar';


  private descriptionList = [];

  constructor(private theme: NbThemeService, private serviceD: DecedesService, private causeService: CauseService) {
  }
  ngOnInit() {
    this.causeService.getAll().subscribe(data => {
      this.causes = data.map(e => e);
     // this.chartLabels = this.causes.map(e => e.description);
    });
    this.serviceD.getAll().subscribe(data => {
      data.forEach(e => {
        this.decedesList.push([e.dateDeces , e.causeMort]);
      });
      this.get(this.currentDate);
      console.log('list decedes from on init', this.decedesList);
    });
  }
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(173, 79, 9, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(223, 109, 20, 0.6)',
        'rgba(16, 52, 166, 0.6)',
        'rgba(193, 191, 177, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(173, 79, 9, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(223, 109, 20, 0.2)',
        'rgba(16, 52, 166, 0.2)',
        'rgba(193, 191, 177, 0.2)',
      ],
      borderWidth: 2,
    },
  ];

  public chartOptions: any = {
    responsive: true,
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  get(annee: string) {
    this.decedesList.forEach(obj => {
     console.log(obj);
     if (obj[0].includes(annee)) {
       this.descriptionList.push(obj[1]);
     }
  });
  /*  const counts = {};
    this.descriptionList.forEach(function(x) { counts[x] = (counts[x] || 0) + 1;  console.log('count', x); });*/
    console.log(this.descriptionList);
    console.log(this.descriptionList.length);
   // console.log('the count' + counts);
    /*this.descriptionList.forEach(e => {
      console.log(e);
    });*/
 /* let s = 0;
    for (let i = 0; i < this.descriptionList.length; i++) {
      for (let j = 1; j < this.descriptionList.length; j++) {
        if (this.descriptionList[i] === this.descriptionList[j] ) {
          s++;
          console.log('yes' + i + j);
        }
      }

    }*/
    const uniqueCount = ['a', 'b', 'c', 'd', 'd', 'e', 'a', 'b', 'c', 'f', 'g', 'h', 'h', 'h', 'e', 'a'];
    const count = [];
    uniqueCount.forEach(function(i) { count[i] = (count[i] || 0) + 1; });
    this.chartDatasets[0]  = count;
    console.log('dataSets', this.chartDatasets[0] );
    console.log('count', count);
  }
  public chartDatasets: Array<any> = [
    { data: [], label: 'Nombre de cas par cause'},
  ];
}
