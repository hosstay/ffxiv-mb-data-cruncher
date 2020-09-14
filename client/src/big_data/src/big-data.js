import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../api/api';
import highcharts from 'highcharts';
import moment from 'moment';

@inject(Api, Router)
export class BigData {
  constructor(api, router) {
    this.api = api;
    this.router = router;

    this.selectorEvent;

    this.data = [];
    this.item = '';

    this.topLeftSeries = [{
      name: 'Time',
      data: []
    }];

    this.topRightSeries = [{
      name: 'Time',
      data: []
    }];

    this.bottomSeries = [{
      name: 'Time',
      data: []
    }];
  }

  async attached() {
    const setupSelector = () => {
      const distinctItems = new Set();

      this.data.forEach((datum) => {
        distinctItems.add(datum.item_name);
      });

      const selector = document.getElementById('item-selector');

      distinctItems.forEach((item) => {
        const option = document.createElement('option');
        option.value = item;
        option.innerHTML = item;
        selector.appendChild(option);
      });

      this.selectorEvent = (event) => {
        this.item = event.target[document.getElementById('item-selector').selectedIndex].value;
        this.generateChartData();
      };

      selector.addEventListener('change', this.selectorEvent);
    };

    this.data = await this.api.getAllData();

    setupSelector();

    this.item = this.data[0].item_name;

    this.topLeftOptions = this.generateOptions('top-left', 'Cost Over Time', 'time', 'Gil', this.topLeftSeries);
    this.topRightOptions = this.generateOptions('top-right', 'Gross Over Time', 'time', 'Gil', this.topRightSeries);
    this.bottomOptions = this.generateOptions('bottom', 'Cost To Net Ratio Over Time', 'time', '%', this.bottomSeries);

    this.generateChartData();
  }

  generateOptions(container, chartTitle, xAxisTitle, yAxisTitle, series) {
    return {
      chart: {
        type: 'line',
        renderTo: container
      },
      title: {
        text: chartTitle
      },
      xAxis: {
        title: {
          text: xAxisTitle
        },
        labels: {
          formatter: function() {
            return highcharts.dateFormat('%b/%e/%Y', this.value);
          }
        }
      },
      yAxis: {
        title: {
          text: yAxisTitle
        }
      },
      series: series,
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          }
        }]
      }
    };
  }

  generateChartData() {
    this.topLeftSeries[0].data = [];
    this.topRightSeries[0].data = [];
    this.bottomSeries[0].data = [];

    this.data.forEach((datum) => {
      if (datum.item_name === this.item) {
        const date = moment(datum.date).format('MM/DD/YYYY').replace(/\/g/, '');
        this.topLeftSeries[0].data.push([date, datum.initial_cost]);
        this.topRightSeries[0].data.push([date, datum.gross]);
        this.bottomSeries[0].data.push([date, (datum.gross - datum.initial_cost) / datum.initial_cost]);
      }
    });

    highcharts.chart(this.topLeftOptions);
    highcharts.chart(this.topRightOptions);
    highcharts.chart(this.bottomOptions);
  }
}