import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {LoginApi} from '../../api/login';

@inject(LoginApi, Router)
export class Home {
  constructor(api, router) {
    this.api = api;
    this.router = router;
  }

  async attached() {

  }
}