import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/shared/models/dataModel';
import { groupByDay, sortByTime } from "../../shared/utils/utils";
import { ApiService } from '../../shared/services/api.service';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit {

  chartData: Data[] = []
  chartRealTimeData: Data[] = []
  pool: Subscription

  constructor(private apiService: ApiService) {
    this.prepateEnergyConsumptionChartData();
    this.prepateRealTimeEnergyConsumptionChartData();
  }

  ngOnInit(): void {

  }

  async prepateEnergyConsumptionChartData() {
    this.chartData = await this.apiService.getReadings();
    this.chartData = groupByDay(this.chartData)
    this.chartData = sortByTime(this.chartData).slice(-30)
  }

  async prepateRealTimeEnergyConsumptionChartData() {
    //Start with the first reading
    this.chartRealTimeData = await this.apiService.getRealTimeReadings();
   
     //Pool to add new readings every 1 seconds
     this.pool = interval(1000).subscribe((val) => {
      this.apiService.addReading(this.chartRealTimeData).then((reading) => {
        this.chartRealTimeData = [...this.chartRealTimeData, reading].slice(-30)
      });
    });

  }
}
