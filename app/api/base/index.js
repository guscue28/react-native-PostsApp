import axios from 'axios';
import { Service } from 'axios-middleware';

const base = 'http://10.0.2.2:5001/app-test-fede9/us-central1';

class Register {
  constructor() {
    if (typeof Register.instance === 'object') return Register.instance;
    Register.instance = this;
  }
  onResponse(response) {
    const res = JSON.parse(response.data);
    return res;
  }
}

Register.instance = undefined;



class Request {
  constructor(url, baseURL) {
    this.url = url;
    this.baseURL = baseURL || base;
    this.request = axios.create({ baseURL: this.baseURL });
    const service = new Service(this.request);
    service.register(new Register());
    console.log('url: ', this.url);
    console.log('baseURL: ', this.baseURL);
    console.log('request: ', this.request);
    console.log('service: ', service);
  }

  get() {
    return this.request({ url: this.url });
  }
  
  getOne(id) {
    return this.request({ url: `${this.url}/${id}` });
   }
  
  post(value) {
    return this.request({ url: this.url, data: value, method: 'post' });
  }
  
  put(value) {
    return this.request({ url: this.url, data: value, method: 'put' });
   }
  
  delete(value) {
    //api/posts/
    return this.request({ url: this.url, method: 'delete', data: value });
  }

}

export default Request;