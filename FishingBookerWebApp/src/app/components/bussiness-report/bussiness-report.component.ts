import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-bussiness-report',
  templateUrl: './bussiness-report.component.html',
  styleUrls: ['./bussiness-report.component.css']
})
export class BussinessReportComponent implements OnInit {

  barChartData!: ChartDataSets[]
  chosen!: string
  values = [] as any
  today = new Date()
  chartdata = [] as any
  labels = [] as Label[]

  constructor(public service: ProfileService) { }

  ngOnInit(): void {
    this.setupData();
  }

  change(value: any) {
    this.chosen = value;
    if (this.chosen === "monthly") {
      this.service.getMonthlyReport().subscribe((data) => {
        this.values = data;
        this.setupData();
        this.setUpLabels();
        console.log(this.values)
      });
    }
    else if (this.chosen === "yearly") {
      this.service.getYearlyReport().subscribe((data) => {
        this.values = data;
        this.setupData();
        this.setUpLabels();
        console.log(this.values)
      });
    }
    else {
      this.service.getWeeklyReport().subscribe((data) => {
        this.values = data;
        this.setupData();
        this.setUpLabels();
        console.log(this.values)
      });
    }
  }

  setUpLabels() {
    var today = new Date();
    this.labels = []
    if (this.chosen === "yearly") {
      for (let i = 1; i <= 5; i++) {
        this.labels.push((today.getUTCFullYear() - i).toString())
      }
    } else if (this.chosen === "weekly") {
      this.labels.push("Week 1", "Week 2", "Week 3", "Week 4", "Week 5");
    } else {
      for (let i = 1; i <= 5; i++) {
        today = new Date();
        today.setMonth(today.getMonth() - i);
        var label = today.toLocaleString('en-us', { month: 'long' });
        this.labels.push(label);
      }
    }

    return this.labels;
  }

  setupData() {
    this.barChartData = [
      {
        data: this.values,
        label: 'BussinessReport',
        borderColor: "#8e5ea2",
        fill: false
      },
    ];
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  barChartLabels: Label[] = this.labels
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

}
