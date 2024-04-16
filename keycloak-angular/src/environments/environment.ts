export const environment = {
  production: false,
  serverUrl: 'http://localhost:4200/api',
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:7080/',
    // Realm
    realm: 'demo',
    clientId: 'demo-app',
  },
};