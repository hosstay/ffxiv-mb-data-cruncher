import {PLATFORM} from 'aurelia-framework';

export class App {
  constructor() {
  }

  configureRouter(config, router) {
    config.title = '';
    config.map([
      {route: ['', 'home'], name: 'home', moduleId: PLATFORM.moduleName('./home/src/home'), title: 'Home'},
      {route: 'name', name: 'name', moduleId: PLATFORM.moduleName('./name/src/name'), title: 'Name'},
      {route: 'medova', name: 'medova', moduleId: PLATFORM.moduleName('./medova/src/medova'), title: 'Medova'}
    ]);

    this.router = router;
  }
}