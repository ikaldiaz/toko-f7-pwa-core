import dateFormat from 'dateformat';
import { version as versionApp } from '../../package.json';
const now = new Date();
// console.log('version', versionApp);
// console.log('buildNumber',dateFormat(now, "yymmdd.HHMMss"));
console.log('NameVersion',versionApp+'-'+dateFormat(now, "yymmdd.HHMMss"));

import { supabase } from '../js/supabase.js';
const session = supabase.auth.session();

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
  id: 'com.mbgae.pwa.toko', // App bundle ID
  // activeState:true,
  view: {
    // reloadPages:true,
    browserHistory: true,
    // browserHistorySeparator:'appx',
    // browserHistoryRoot :'/',
    // browserHistoryStoreHistory: true,
    unloadTabContent:true,
    // initRouterOnTabShow:true,
    browserHistoryTabs:'push',
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
    sequential: true
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
    tabShow:function name(params) {
      // console.log(params)
      // let elem = $$(params);
      // console.log(elem[0].id);
      // console.log($$('.toolbar.toolbar-inner#'+elem[0].id).addClass('tab-link-active'))
      // console.log($$('.toolbar.toolbar-inner').index())
      // var x = $$('.toolbar')
      // console.log(x.children('.toolbar-inner').children('a').attr(''));
    },
    tabHide:function name(params) {
      // console.log('tabHide',params)
    },
    pageInit: function (page) {

      console.log(session);
      //Localization on Another Page, we have to initialised again.
      // startI18Next(getLanguageStorage);
      // console.log(page);
      // if(page.name == 'home'){
        onlineIconSet(page.app.online);
      // }

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
  supabase.auth.onAuthStateChange((event, session) => {
    console.log(event, session)
  })
  onlineIconSet(isOnline);
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



