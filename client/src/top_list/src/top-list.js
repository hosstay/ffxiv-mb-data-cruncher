import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../api/api';
import moment from 'moment';

@inject(Api, Router)
export class TopList {
  constructor(api, router) {
    this.api = api;
    this.router = router;
  }

  async attached() {
    const data = await this.api.getAllData();

    const today = moment().format('MM/DD/YYYY');
    const yesterday = moment().subtract(1, 'days').format('MM/DD/YYYY');

    const todaysData = data.filter((datum) => moment(datum.date).format('MM/DD/YYYY') === today);
    const yesterdaysData = data.filter((datum) => moment(datum.date).format('MM/DD/YYYY') === yesterday);

    const matDeclines = [];
    const matIncreases = [];
    const finalItemDeclines = [];
    const finalItemIncreases = [];

    todaysData.forEach((todaysDatum) => {
      yesterdaysData.forEach((yesterdaysDatum) => {
        if (todaysDatum.item_name === yesterdaysDatum.item_name) {
          if (todaysDatum.type === 'Raw') {
            if (todaysDatum.initial_cost < yesterdaysDatum.initial_cost) {
              matDeclines.push({
                item_name: todaysDatum.item_name,
                todaysCost: todaysDatum.initial_cost,
                change: yesterdaysDatum.initial_cost - todaysDatum.initial_cost,
                changePercent: (yesterdaysDatum.initial_cost - todaysDatum.initial_cost) / yesterdaysDatum.initial_cost
              });
            } else if (todaysDatum.initial_cost > yesterdaysDatum.initial_cost) {
              matIncreases.push({
                item_name: todaysDatum.item_name,
                todaysCost: todaysDatum.initial_cost,
                change: todaysDatum.initial_cost - yesterdaysDatum.initial_cost,
                changePercent: (todaysDatum.initial_cost - yesterdaysDatum.initial_cost) / yesterdaysDatum.initial_cost
              });
            }
          } else if (todaysDatum.type === 'Complete') {
            if (todaysDatum.initial_cost < yesterdaysDatum.initial_cost) {
              finalItemDeclines.push({
                item_name: todaysDatum.item_name,
                todaysCost: todaysDatum.initial_cost,
                change: yesterdaysDatum.initial_cost - todaysDatum.initial_cost,
                changePercent: (yesterdaysDatum.initial_cost - todaysDatum.initial_cost) / yesterdaysDatum.initial_cost
              });
            } else if (todaysDatum.initial_cost > yesterdaysDatum.initial_cost) {
              finalItemIncreases.push({
                item_name: todaysDatum.item_name,
                todaysCost: todaysDatum.initial_cost,
                change: todaysDatum.initial_cost - yesterdaysDatum.initial_cost,
                changePercent: (todaysDatum.initial_cost - yesterdaysDatum.initial_cost) / yesterdaysDatum.initial_cost
              });
            }
          }
        }
      });
    });

    const topMatDeclines = matDeclines.sort((a, b) => b.changePercent - a.changePercent);
    const topMatIncreases = matIncreases.sort((a, b) => b.changePercent - a.changePercent);
    const topFinalItemDeclines = finalItemDeclines.sort((a, b) => b.changePercent - a.changePercent);
    const topFinalItemIncreases = finalItemIncreases.sort((a, b) => b.changePercent - a.changePercent);

    topMatDeclines.splice(10);
    topMatIncreases.splice(10);
    topFinalItemDeclines.splice(10);
    topFinalItemIncreases.splice(10);

    let topMatDeclinesText = '';
    let topMatIncreasesText = '';
    let topFinalItemDeclinesText = '';
    let topFinalItemIncreasesText = '';

    topMatDeclines.forEach((decline) => {
      topMatDeclinesText += `Item Name: ${decline.item_name}\nToday's Cost: ${decline.todaysCost}\nChange: -${decline.change} Gil\nChange Percent: -${(decline.changePercent * 100).toFixed(2)}%\n\n`;
    });
    topMatIncreases.forEach((increase) => {
      topMatIncreasesText += `Item Name: ${increase.item_name}\nToday's Cost: ${increase.todaysCost}\nChange: ${increase.change} Gil\nChange Percent: ${(increase.changePercent * 100).toFixed(2)}%\n\n`;
    });
    topFinalItemDeclines.forEach((decline) => {
      topFinalItemDeclinesText += `Item Name: ${decline.item_name}\nToday's Cost: ${decline.todaysCost}\nChange: -${decline.change} Gil\nChange Percent: -${(decline.changePercent * 100).toFixed(2)}%\n\n`;
    });
    topFinalItemIncreases.forEach((increase) => {
      topFinalItemIncreasesText += `Item Name: ${increase.item_name}\nToday's Cost: ${increase.todaysCost}\nChange: ${increase.change} Gil\nChange Percent: ${(increase.changePercent * 100).toFixed(2)}%\n\n`;
    });

    document.getElementById('mat-declines').innerHTML = topMatDeclinesText;
    document.getElementById('mat-increases').innerHTML = topMatIncreasesText;
    document.getElementById('final-declines').innerHTML = topFinalItemDeclinesText;
    document.getElementById('final-increases').innerHTML = topFinalItemIncreasesText;
  }
}