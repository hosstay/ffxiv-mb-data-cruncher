import {PLATFORM} from 'aurelia-framework';

export class App {
  constructor() {
  }

  configureRouter(config, router) {
    config.title = '';
    config.map([
      {route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('./home/src/home'), title: 'Home'},
      {route: 'data-dump', name: 'data-dump', moduleId: PLATFORM.moduleName('./data_dump/src/data-dump'), title: 'Data Dump'},
      {route: 'big-data', name: 'big-data', moduleId: PLATFORM.moduleName('./big_data/src/big-data'), title: 'Big Data'}
    ]);

    this.router = router;
  }
}