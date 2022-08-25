import MainTab from '../pages/tabs/tabs.f7';
import TabError from '../pages/tabs/tab-error.f7';
import Tab1Page from '../pages/tabs/tab-1.f7';
import Tab2Page from '../pages/tabs/tab-2.f7';
import Tab3Page from '../pages/tabs/tab-3.f7';
import Tab4Page from '../pages/tabs/tab-4.f7';
import TabProducts from '../pages/tabs/tab-5.f7';

import ProductPage from '../pages/product.f7';
import ExCardPage from '../pages/card-ex.f7';

import PanelRight from '../pages/panel-right.f7';

import DynamicRoutePage from '../pages/dynamic-route.f7';
import RequestAndLoad from '../pages/request-and-load.f7';
import NotFoundPage from '../pages/404.f7';

import { getTableAsync, getProfile } from '../js/supabase';

var routes = [
  // {
  //   path: '/',
  //   // id: 'tab1',
  //   component: HomePage,
  // },
  {
    name: 'home',
    path: '/',
    component: MainTab,
    // Pass "tabs" property to route, must be array with tab routes:
    tabs: [
      // First (default) tab has the same url as the page itself
      {
        // Tab path
        path: '/',
        // Tab id
        id: 'tab-1',
        // Component
        component: Tab1Page
      },
      // Second tab
      {
        path: '/catalog/',
        id: 'tab-2',
        // Component
        component: Tab2Page
      },
      // Third tab
      {
        path: '/settings/',
        id: 'tab-3',
        // Component
        component: Tab3Page
      },
      // Fourth tab
      {
        path: '/cart/',
        // Load this tab content as a component with Ajax request:
        id: 'tab-4',
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
                component: Tab4Page
              },
            );
          }, 1000);
        },
      },
      // Test Async Tab
      {
        path: '/products-async/',
        //browser url will look like "http://my-webapp.com/#!/products-async.html"
        //https://www.domain.comk/#!/products-async/
        id: 'tab-5',
        // Load this tab content as a component with Ajax request:
        async: function ({ router, to, resolve }) {
          // App instance
          var app = router.app;
          // var app = router.app;
          // Show Preloader
          app.progressbar.show('multi');
          // Simulate Ajax Request
          getTableAsync('products', 'title')
          .then((data) => {
            app.progressbar.hide();
            if (data==false) {
              resolve(
                {
                  name: 'error',
                  component: TabError
                },
              );
            } else {
              resolve(
                {
                  component: TabProducts
                },
                {
                  props: {
                    products: data,
                  }
                }
              );
            }
          })
          
        },
      },
    ],
  },
  {
    path: '/panel-right/',
    name:'panel-right',
    //browser url will look like "http://my-webapp.com/#!/panel-right.html"
    //https://www.domain.comk/#!/panel-right/
    panel: {
    async: function ({ router, to, resolve, reject }) {
      // App instance
      var app = router.app;
      // var app = router.app;
      // Show Preloader
      app.progressbar.show('multi');
      // Simulate Ajax Request
      getProfile()
      .then((data) => {
        app.progressbar.hide();
        if (data==false) {
          reject();
        } else {
          // console.log(data);
          resolve(
            {
              component: PanelRight,
            },
            {
              props: {
                user: data,
              }
            }
          );
        }
      })
      
    },
    }
  },
  {
    path: '/product/:id/',
    //browser url will look like"
    //https://www.domain.comk/#!/product/1/
    component: ProductPage,
  },
  {
    path: '/ex-card/:id/',
    component: ExCardPage,
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