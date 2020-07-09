import axios from 'axios';

class APIClient {
  constructor() {
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };

    this.client = axios.create({
      headers: this.defaultHeaders,
      // baseURL: ``,
    });
  }

  async fetchUser() {
    try {
      const { data } = await this.client.get('/api/me');
      return data;
    } catch(error) {
      return null;
    }
  };
}

const api = new APIClient();

export default api
