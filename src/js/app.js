import dateFormat from 'dateformat';
import {version as versionApp} from '../../package.json';
const now = new Date();
// console.log('version', versionApp);
// console.log('buildNumber',dateFormat(now, "yymmdd.HHMMss"));
console.log('NameVersion',versionApp+'-'+dateFormat(now, "yymmdd.HHMMss"));

    import { supabase, session } from '../js/supabase.js';

import $$ from 'dom7';
import Framework7 from './framework7-custom.js';

// Import F7 Styles
import '../css/framework7-custom.less';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.less';


// Import Routes
import routes from './routes.js';
// Import Store
import store from './store.js';

// Import main app component
import App from '../app.f7';


var app = new Framework7({
  name: 'Mbgae Store', // App name
  theme: 'auto', // Automatic theme detection
  autoDarkMode:false,
  el: '#app', // App root element
  component: App, // App main component
  id: 'com.mbgae.app.math', // App bundle ID
  activeState:true,
  view: {
    // reloadPages:true,
    browserHistory: true,
    // browserHistorySeparator:'appx',
    browserHistoryRoot :'/',
    // browserHistoryStoreHistory: true,
    // browserHistoryTabs:'replace',
  },
  toolbar: {
    // hideOnPageScroll: true,
  },
  navbar: {
    hideOnPageScroll: true,
    snapPageScrollToLargeTitle: false,
    collapseLargeTitleOnScroll: true,
    // iosCenterTitle: false,
  },
  //lazy modules
  lazy: {
    placeholder:'icons/favicon.png',
    threshold: 0,
    sequential: true,
    on: {
      pageInit: function () {
        console.log('page init')
      }
    }
  }, 

  // App store
  store: store,
  // App routes
  routes: routes,
  // Register service worker (only on production build)
  serviceWorker: process.env.NODE_ENV ==='production' ? {
    path: '/service-worker.js',
  } : {},
  on: {
    init: function () {
      // console.log("init");
    },
    pageInit: function (page) {
      //Localization on Another Page, we have to initialised again.
      // startI18Next(getLanguageStorage);
      // console.log(page);
      if(page.name == 'home'){
        onlineIconSet(page.app.online);
      }

    },
    pageMounted:function(page){
      // console.log(app);
      // console.log(this);
      // console.log('app', 'pageMounted '+page.name);
    },
    pageBeforeIn:function(page){
      // console.log('app', 'pageBeforeIn '+page.name);
      $$('.tab-link').removeClass('tab-link-active');
      $$('#toolbar-'+page.name).toggleClass('tab-link-active');
      app.toolbar.setHighlight('#toolbar-'+page.name);
    }
  },
});

app.on('connection', function (isOnline) {
  onlineIconSet(isOnline);
});

app.on('tabInit', function (tabEl) {
    // console.log(tabEl)
});


function onlineIconSet(isOnline) {
  if (isOnline) {
    console.log('online')
    $$('#conn-status').html('wifi')
    $$('#conn-status-md').html('wifi')
    $$('#conn-status').addClass('color-green').removeClass('color-red')
    $$('#conn-status-md').addClass('color-green').removeClass('color-red')
  } else {
    console.log('offline')
    $$('#conn-status').html('wifi_exclamationmark')
    $$('#conn-status-md').html('wifi_off')
    $$('#conn-status').removeClass('color-green').addClass('color-red')
    $$('#conn-status-md').removeClass('color-green').addClass('color-red')
  }
}



