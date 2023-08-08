import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
import { ChartsService } from '../../service/charts.service';
Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  constructor(private _charts: ChartsService) { }
  chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];
  ngOnInit(): void {
    this._charts.Getchartinfo().subscribe(result => {
      this.chartdata = result;
      if (this.chartdata != null) {
        for (let i = 0; i < this.chartdata.length; i++) {
          //console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].year);
          this.realdata.push(this.chartdata[i].amount);
          this.colordata.push(this.chartdata[i].colorcode);
        }
        this.RenderChart(this.labeldata, this.realdata, this.colordata, 'bar', 'barchart');
      }
    });

    this.RenderbarChart();

  }
  RenderChart(labeldata: any, maindata: any, colordata: any, type: any, id: any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: '# of Votes',
          data: maindata,
          backgroundColor: colordata,
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 22, 132, 2)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  RenderbarChart() {
    const myChart = new Chart("barchart", {
      type: 'bar',
      data: {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [{
          label: 'Mounthly currancy',
          data: [65, 59, 80, 81, 56, 55, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      },
      options: {

        scales: {
          x: {
            type: 'category',
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August','September','October', 'November', 'December',]
          }
        }
      }
    }
    );
  }
}
