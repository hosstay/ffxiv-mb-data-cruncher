import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class WebAPI {
  constructor(router) {
    this.router = router;
  }

  logIn(user, pass) {
    const xhttp = new XMLHttpRequest();
    const myRouter = this.router;
    //setup listener to wait for server response
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.response);
        document.getElementById('error-text').innerHTML = 'You have successfully logged in.';
        //sleep for 2 seconds then redirect
        setTimeout(() => {
          document.getElementsByTagName('BODY')[0].style.backgroundImage = 'none';
          myRouter.navigateToRoute('home');
        }, 2000);
      } else if (this.readyState === 4 && this.status !== 200) {
        console.log(this.response);
        document.getElementById('error-text').innerHTML = this.responseText;
      }
    };
    //Send POST to server
    xhttp.open('POST', 'http://localhost:3000/api/user/login', true);
    xhttp.withCredentials = true;
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('username=' + user + '&user_password=' + pass);
  }

  addUser(user, pass) {
    const xhttp = new XMLHttpRequest();
    const myRouter = this.router;
    //setup listener to wait for server response
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log(this.response);
        document.getElementById('error-text').innerHTML = 'You have successfully registered. ' +
          'This page will navigate back to the login screen in 3 seconds.';
        //sleep for 5 seconds then redirect
        setTimeout(() => {
          myRouter.navigateToRoute('login');
        }, 2000);
      } else if (this.readyState === 4) {
        console.log(this.response);
        document.getElementById('error-text').innerHTML = this.responseText;
      }
    };
    //Send POST to server
    xhttp.open('POST', 'http://localhost:3000/api/user/create', true);
    xhttp.withCredentials = true;
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send('username=' + user + '&user_password=' + pass);
  }

  verifyToken() {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          console.log(this.response);
          resolve(true);
        } else if (this.readyState === 4 && this.status === 403) {
          console.log(this.response);
          resolve(false);
        }
      };
      xhttp.open('GET', 'http://localhost:3000/api/secure/verify', true);
      xhttp.withCredentials = true;
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send();
    });
  }

  logOut() {
    return new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          console.log(this.response);
          resolve(true);
        } else if (this.readyState === 4) {
          console.log(this.response);
          resolve(false);
        }
      };
      xhttp.open('GET', 'http://localhost:3000/api/user/logout', true);
      xhttp.withCredentials = true;
      xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhttp.send();
    });
  }
}
