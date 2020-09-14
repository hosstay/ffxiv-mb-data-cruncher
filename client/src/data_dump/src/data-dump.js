import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../api/api';
// import {sanitize} from '../../utility/security';

@inject(Api, Router)
export class DataDump {
  constructor(api, router) {
    this.api = api;
    this.router = router;
    this.dataDump;
    this.date;
  }

  async attached() {

  }

  async submit() {
    try {
      const dumpLines = this.dataDump.split('\n');

      const dataObjs = [];

      dumpLines.forEach((line) => {
        const data = line.split('\t');
        data.splice(1, 2);
        data.splice(2, 1);

        const obj = {
          itemName: data[0],
          type: data[1],
          initialCost: data[2],
          gross: data[3]
        };

        dataObjs.push(obj);
      });

      console.log(dataObjs);
      await this.api.addData({dataObjs: dataObjs, date: this.date});
    } catch (err) {
      console.log(err);
      document.getElementById('output').innerHTML = err.message;
    }
  }
}