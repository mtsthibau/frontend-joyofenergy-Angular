import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/shared/models/dataModel';
import { groupByDay, sortByTime } from "../../shared/utils/utils";
import { ApiService } from '../../shared/services/api.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit {

  chartData: Data[] = []
  
  constructor(private apiService: ApiService) {
    this.prepateEnergyConsumptionChartData();
  }

  ngOnInit(): void {

  }

  async prepateEnergyConsumptionChartData() {
    this.chartData = await this.apiService.getReadings();
    this.chartData = groupByDay(this.chartData)
    this.chartData = sortByTime(this.chartData).slice(-30)
  }
}
