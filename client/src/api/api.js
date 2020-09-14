import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient} from 'aurelia-fetch-client';
import {DataLoader} from '../utility/data-loader';
// import {timeoutPromise} from '../utility/utility';

@inject(Router, HttpClient, DataLoader)
export class Api {
  constructor(router, httpClient, dataLoader) {
    this.router = router;
    this.httpClient = httpClient;
    this.dataLoader = dataLoader;

    const baseUrl = location.protocol + '//' + window.location.hostname + ':3000/';
    this.httpClient.configure((config) => {
      config
          .useStandardConfiguration()
          .withBaseUrl(baseUrl)
          .withDefaults({
            credentials: 'include',
            mode: 'cors'
          });
    });
  }

  async addData(payload) {
    const response = await this.dataLoader.httpFetch({
      httpClient: this.httpClient,
      prefix: 'api/data/',
      endpoint: 'addData',
      payload: payload
    });

    if (response.success) {
      console.log('You have successfully added data.');
    } else {
      console.log(response.msg);
    }
  }

  async getAllData() {
    const response = await this.dataLoader.httpFetch({
      httpClient: this.httpClient,
      prefix: 'api/data/',
      endpoint: 'getAllData',
      payload: {}
    });

    if (response.success) {
      return response.data;
    } else {
      console.log(response.msg);
    }
  }
}