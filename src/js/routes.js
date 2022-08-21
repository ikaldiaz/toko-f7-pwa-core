import ProductPage from '../pages/product.f7';
import ExCardPage from '../pages/card-ex.f7';

import PanelRight from '../pages/panel-right.f7';

import ScreenLogin from '../pages/screen-login.f7';
import ScreenRegister from '../pages/screen-register.f7';

import DynamicRoutePage from '../pages/dynamic-route.f7';
import RequestAndLoad from '../pages/request-and-load.f7';
import NotFoundPage from '../pages/404.f7';


import MainTab from '../pages/tabs/tabs.f7';
import Tab1Page from '../pages/tabs/tab-1.f7';
import Tab2Page from '../pages/tabs/tab-2.f7';
import Tab3Page from '../pages/tabs/tab-3.f7';
import Tab4Page from '../pages/tabs/tab-4.f7';

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
      // Third tab
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
    ],
  },
  // {
  //   path: '/logout/',
  //   beforeEnter: function confirmLogout({ to, from, resolve, reject }) {
  //     app.f7.dialog.confirm(
  //       'Are you sure you want to Logout?',
  //       function () {
  //         // proceed navigation
  //         // Show Preloader
  //         app.f7.progressbar.show('multi');
  //         signOut()
  //         .then((error)=>{
  //           // Hide Preloader
  //           app.f7.progressbar.hide();
  //           // app.f7.progressbar.hide();
  //           // Resolve route to load page
  //           resolve(
  //             {
  //               name: 'home'
  //             },
  //           );
  //         });
  //       },
  //       function () {
  //         // stay on page
  //         reject();
  //       }
  //     )
  //   }
  // }, 
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
    path: '/product/:id/',
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