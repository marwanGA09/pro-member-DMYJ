import ax from 'axios';

const axios = ax.create({
  baseURL: 'http://localhost:4321/v1/',
});

export default axios;
