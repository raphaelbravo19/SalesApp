/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { firebaseInit } from './src/services/firebase';

firebaseInit();
AppRegistry.registerComponent(appName, () => App);
