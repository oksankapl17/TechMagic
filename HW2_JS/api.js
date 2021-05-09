import {API_KEY, BASE_URL} from "./constants.js";
import ErrorHandler from "./utils.js";

export default class CatsApi extends ErrorHandler {
  constructor() {
    super()
    this.baseURL = BASE_URL;
    this.headers = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
    }
  }

  async get(url) {
    try {
      const response = await fetch(`${this.baseURL}${url}`, {...this.headers, method: 'GET'});
      return await response.json();
    } catch (e) {
      this.handleError(e);
    }
  }
}
