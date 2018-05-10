import { AppRegistry } from 'react-native';
import App from './App';

require('dotenv').config()

AppRegistry.registerComponent('FacebookAuth', () => App);
