let Host = 'http://127.0.0.1';
let Port = '3333';
let VapidPublicKey = 'BLSc8h04RqXb20KhjXaWMTFTL3hD0NXZ8r19TUWvt_NIkGo4zrEdhw4vUw2ZxraXOxNfJmoi8rrU4bHfFJD3H_s'

export const environment = {
  production: false,
  apiHost: Host,
  apiPort: Port,
  apiUrl: `${Host}:${Port}`,
  VapidPublicKey: VapidPublicKey,
};
