import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/shared/models/dataModel';
import { groupByDay, sortByTime, getReadings } from "../../shared/utils/reading";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit {

  chartData: Data[] = []

  constructor() {
    this.prepateEnergyConsumptionChartData();
  }

  ngOnInit(): void {
    
  }

  async prepateEnergyConsumptionChartData() {
    this.chartData = await getReadings();
    this.chartData = groupByDay(this.chartData)
    this.chartData = sortByTime(this.chartData).slice(-30)
  }
}
