export const APP_ROUTES = {
  AUTH: {
    REGISTER: 'auth/register',
    LOGIN: 'auth/login',
  },
  HOME: '',
  PROFILE: 'profile',
  CHANNEL: {
    ID: 'channel/:id',
    CREATE: 'channel/create',
    JOIN: 'channel/join',
    SETTING: 'channel/:id/setting',
  },
  NOT_FOUND: '**',
};
