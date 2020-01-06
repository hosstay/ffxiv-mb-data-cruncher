import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {LoginApi} from '../../api/login';
import {errorHandler} from '../../utility/utility';

@inject(LoginApi, Router)
export class Home {
  constructor(api, router) {
    this.api = api;
    this.router = router;
  }

  async attached() {
    try {
      const result = await this.api.verifyToken();
      console.log(result);

      if (!result) {
        this.router.navigateToRoute('login');
      }
    } catch (err) {
      return errorHandler({err: err, context: 'attached', isLast: true});
    }
  }
}