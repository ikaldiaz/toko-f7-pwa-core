
import HomePage from '../pages/home.f7';
import AboutPage from '../pages/about.f7';
import FormPage from '../pages/form.f7';
import CatalogPage from '../pages/catalog.f7';
import ProductPage from '../pages/product.f7';
import SettingsPage from '../pages/settings.f7';
import CartPage from '../pages/cart.f7';

import PanelRight from '../pages/panel-right.f7';

import ScreenLogin from '../pages/screen-login.f7';
import ScreenRegister from '../pages/screen-register.f7';

import DynamicRoutePage from '../pages/dynamic-route.f7';
import RequestAndLoad from '../pages/request-and-load.f7';
import NotFoundPage from '../pages/404.f7';

import { supabase, session } from '../js/supabase';


function checkAuth({ to, from, resolve, reject }) {
  console.log(session);
  // onAuthStateChanged(auth, user => {
    console.log('Check Auth');
    if (session) {reject()} else {resolve()}
  // });
}

var routes = [
  {
    path: '/',
    // id: 'tab1',
    component: HomePage,
  },
  {
    path: '/login/',
    // check if the user is logged in
    beforeEnter: checkAuth,
    component: ScreenLogin,
    options:{
      clearPreviousHistory :true
    }
  },
  {
    path: '/register/',
    // check if the user is logged in
    beforeEnter: checkAuth,
    component: ScreenRegister,
    options:{
      clearPreviousHistory :true
    }
  }, 
  {
    path: '/panel-right/',
    name:'panel-right',
    //browser url will look like "http://my-webapp.com/#!/quad-eq.html"
    //https://www.domain.comk/#!/quad-eq/
    panel: {
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;
      // Show ProgresBar
      app.progressbar.show('multi');
      // Simulate Ajax Request
      setTimeout(function () {
        // Hide ProgressBar
        app.progressbar.hide(); //hide
        // Resolve route to load page
        resolve(
          {
            component: PanelRight,
          }
        );
      }, 1800);
    },
    }
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },
  {
    path: '/catalog/',
    // id: 'tab2',
    component: CatalogPage,
  },
  {
    path: '/product/:id/',
    component: ProductPage,
  },
  {
    path: '/settings/',
    component: SettingsPage
  },
  {
    path: '/cart/',
    // id: 'tab3',,
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;
      // Show Preloader
      app.progressbar.show('multi');
      // Simulate Ajax Request
      setTimeout(function () {
        // Hide Preloader
        app.progressbar.hide();
        // Resolve route to load page
        resolve(
          {
            component: CartPage,
          }
        );
      }, 1000);
    },
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.progressbar.show('multi');

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.progressbar.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;