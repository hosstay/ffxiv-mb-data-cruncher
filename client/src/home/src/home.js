import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Api} from '../../api/api';

@inject(Api, Router)
export class Home {
  constructor(api, router) {
    this.api = api;
    this.router = router;
  }

  async attached() {

  }
}