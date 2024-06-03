import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: {
    baseUrl,
    name: 'CarLocation',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44342/',
    redirectUri: baseUrl,
    clientId: 'CarLocation_App',
    responseType: 'code',
    scope: 'offline_access CarLocation',
    requireHttps: true,
  },
  apis: {
    default: {
      url: 'https://localhost:44342',
      rootNamespace: 'Fz.CarLocation',
    },
  },
} as Environment;
