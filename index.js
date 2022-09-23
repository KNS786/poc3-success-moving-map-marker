/**
 * @format
 */

 import ReactNativeForegroundService from '@supersami/rn-foreground-service';
 import {AppRegistry} from 'react-native';
 import App from './App';
 import {name as appName} from './app.json';

import ForgroundService from './background-geoLocations/forgroundService';

// ForgroundService.start();
// ForgroundService.startTask();

 ReactNativeForegroundService.register();
 ReactNativeForegroundService.start({
    id: 999,
    title: 'totalQSR',
    message: 'you are online!',
  });
 AppRegistry.registerComponent(appName, () => App);
 
