import ax from 'axios';

const axios = ax.create({
  // baseURL: 'http://localhost:4321/v1/',

  // NOTE :baseURL on render
  baseURL: 'https://pro-member-dmyj.onrender.com/v1/',

  // NOTE :baseURL on MY DOMAIN
  // baseURL: 'https://apipro.deramyj.com/v1/',
});

export default axios;
