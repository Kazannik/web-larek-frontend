import { AppData } from './components/AppData';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';

const events = new EventEmitter();
const appData = new AppData(events);