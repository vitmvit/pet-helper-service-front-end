import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'pet-helper-service-front-end',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true
  }
};

export default config;
