import { Component, Input, OnInit, Inject, OnChanges } from '@angular/core';
import { Data } from 'src/app/shared/models/dataModel';
import { Chart, registerables} from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges {

  chart: any;

  @Input() chartData: Data[];
  @Input() chartId: string;

  constructor() {
    this.chartData = []
    this.chartId = ''

    //tree-shakeable if needed
    Chart.register(...registerables);
  }

  ngOnChanges(change) {
    if (change && change.chartData && change.chartData.currentValue != change.chartData.previousValue) {
      this.chartData = change.chartData.currentValue
      this.renderChart(this.chartId, this.chartData)
    }
  }

  ngOnInit(): void {
  }

  formatDateLabel = (timestamp) => {
    const date = new Date(timestamp);
    const month = date.getMonth();
    const day = date.getDate();

    const formatPart = (value) => {
      return value < 10 ? `0${value}` : `${value}`;
    };

    return `${formatPart(day)}/${formatPart(month + 1)}`;
  };

  renderChart = (containerId, readings) => {

    if(readings.length == 0) 
      return

    Chart.defaults.font.size = 10;

    Chart.register.apply(
      null,
      Object.values(Chart).filter((chartClass) => chartClass.id)
    );

    const labels = readings.map(({ time }) => this.formatDateLabel(time));
    const values = readings.map(({ value }) => value);

    const data = {
      labels: labels,
      datasets: [
        {
          label: "kWh usage",
          data: values,
          fill: true,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          borderWidth: 0.2,
          backgroundColor: "#5A8EDA",
          borderRadius: 10,
        },
      ],
    };

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(containerId, {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            grid: {
              display: false,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
      },
    });
  };
}
