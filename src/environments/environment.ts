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
    mapbox: {
      token: 'pk.eyJ1IjoiZmVybmFuZG8xOTkxIiwiYSI6ImNseDljdmp5aDFpNWcybHBtcXdkNXV4MTEifQ.fvEaEqq9URbd69y6QHOpyg'
      // token: 'sk.eyJ1IjoiZmVybmFuZG8xOTkxIiwiYSI6ImNseDljdXo0NjJraWMybnBvbGFnMjBmazMifQ._C0P5GXzzjy1AzGbbfg04A'
      // token: 'pk.eyJ1IjoiZmVybmFuZG8xOTkxIiwiYSI6ImNseDk5bWNlajFnOGkyam4yMjE5Z2p6cjMifQ.DHdhktF2PN1AJnLs18bSxw'
    }
  },
} as Environment;
