# Mbgae Store
Online Store with Framework7 and Supabase as the Database

## Framework7 CLI Options

Framework7 app created with following options:

```
{
  "cwd": "C:\\Users\\ALISHA\\Music\\NodeProjects\\f7-pwa-toko",
  "type": [
    "pwa"
  ],
  "name": "Mbgae Store",
  "framework": "core",
  "template": "tabs",
  "bundler": "vite",
  "cssPreProcessor": "less",
  "theming": {
    "customColor": true,
    "color": "#00136f",
    "darkTheme": true,
    "iconFonts": true,
    "fillBars": true
  },
  "customBuild": true,
  "customBuildConfig": {
    "rtl": false,
    "darkTheme": true,
    "lightTheme": true,
    "themes": [
      "ios",
      "md",
      "aurora"
    ],
    "components": [
      "appbar",
      "dialog",
      "popup",
      "login-screen",
      "popover",
      "actions",
      "sheet",
      "toast",
      "preloader",
      "progressbar",
      "sortable",
      "swipeout",
      "accordion",
      "contacts-list",
      "virtual-list",
      "list-index",
      "timeline",
      "tabs",
      "panel",
      "card",
      "chip",
      "form",
      "input",
      "checkbox",
      "radio",
      "toggle",
      "range",
      "stepper",
      "smart-select",
      "grid",
      "calendar",
      "picker",
      "infinite-scroll",
      "pull-to-refresh",
      "lazy",
      "data-table",
      "fab",
      "searchbar",
      "messages",
      "messagebar",
      "swiper",
      "photo-browser",
      "notification",
      "autocomplete",
      "tooltip",
      "gauge",
      "skeleton",
      "menu",
      "color-picker",
      "treeview",
      "text-editor",
      "area-chart",
      "pie-chart",
      "breadcrumbs",
      "elevation",
      "typography"
    ]
  }
}
```

## Install Dependencies

First of all we need to install dependencies, run in terminal
```
npm install
```

## NPM Scripts

* 🔥 `start` - run development server
* 🔧 `dev` - run development server
* 🔧 `build` - build web app for production

## Vite

There is a [Vite](https://vitejs.dev) bundler setup. It compiles and bundles all "front-end" resources. You should work only with files located in `/src` folder. Vite config located in `vite.config.js`.

## PWA

This is a PWA. Don't forget to check what is inside of your `service-worker.js`. It is also recommended that you disable service worker (or enable "Update on reload") in browser dev tools during development.
## Assets

Assets (icons, splash screens) source images located in `assets-src` folder. To generate your own icons and splash screen images, you will need to replace all assets in this directory with your own images (pay attention to image size and format), and run the following command in the project directory:

```
framework7 assets
```

Or launch UI where you will be able to change icons and splash screens:

```
framework7 assets --ui
```



## Documentation & Resources

* [Framework7 Core Documentation](https://framework7.io/docs/)



* [Framework7 Icons Reference](https://framework7.io/icons/)
* [Community Forum](https://forum.framework7.io)

## Support Framework7

Love Framework7? Support project by donating or pledging on:
- Patreon: https://patreon.com/framework7
- OpenCollective: https://opencollective.com/framework7