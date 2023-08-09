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

  public chart: any;
  chartdata: any;
  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];
  data: any
  chartValues: any[] = [];
  constructor(private _charts: ChartsService) {
    this.getRateChart()
  }
  getRateChart() {
    this._charts.getlatest().subscribe(
      (res) => {
        this.data = res.data
        this.chartdata = Object.keys(res.rates);
        this.chartValues = this.extractValues(res.rates);
        console.log(this.chartValues)
        this.RenderbarChart();
        // if (this.chartdata != null) {
        //   for (let i = 0; i < this.chartdata.length; i++) {
        //     this.labeldata.push(this.chartdata[i].month);
        //     this.realdata.push(this.chartdata[i].amount);
        //     this.colordata.push(this.chartdata[i].colorcode);
        //   }

        // }
      },
      (e) => { },
    );
  }
  extractValues(rates: { [code: string]: number }): number[] {
    return this.chartdata.map((code: string) => rates[code]);
  }




  RenderbarChart() {
    const myChart = new Chart("barchart", {
      type: 'line',
      data: {
        datasets: [{
          label: 'Mounthly currancy',
          data: ['1400.2', '144.68', '103.379112', '424.780436', '92',
          '424.780436', '120.7', '424.780436', '1200.2', '101.48', '424.78', '424.780'],

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
        responsive: true,
        scales: {
          x: {
            type: 'category',
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
              'August', 'September', 'October', 'November', 'December',],
            title: {
              display: true,
              text: 'Month',
            },
          },
          y: {
            labels: this.chartValues,
            title: {
              display: true,
              text: 'Rates',
            },
            ticks: {
              stepSize:10,
              maxTicksLimit: 200,
            },
          }


        }
      }
    }
    );
  }


}
