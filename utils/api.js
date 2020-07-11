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
      return {
        error: {
          status: 401,
          message: error.message
        }
      };
    }
  };

  async createTransaction(formValues) {
    try {
      const { data } = await this.client.post('/api/transaction', formValues);
      return data;
    } catch(error) {
      return {
        error: {
          status: error.status || 500,
          message: error.message,
        }
      }
    }
  }
}

const api = new APIClient();

export default api
