# enterprise-notifications App architecture

This file is a brief outline of the architecture of this application.

## Assets

Assets for Ember.js are stored in the `public` directory. The `crossdomain.xml` and `robots.txt` files are auto-generated when the Ember project is created, and do not need to be touched.

Any new icons should be added under the `assets/icons` subdirectory.

```
public
|--assets
|  |--icons
|  |  |--Critical.png
|  |  |--GreenCheck.png
|  |  `--Informational.png
|  `--svg
|     `--hourglass.svg
|--crossdomain.xml
`--robots.txt
```

## Configuration

The configuration files for the app are in a few different places, depending on what is being configured.

* Ember configuration is in `config/environment.js`. Visit [Configuring Ember.js](https://guides.emberjs.com/v2.13.0/configuring-ember/configuring-your-app/) for more information on this file's structure
* Project dependencies are listed in `bower.json` and `package.json`
* Electron build configuration is included in `package.json`
* `electron-forge-config.js` can be ignored; `package.json` is used instead

## Cordova

For the most part, the Cordova code is all boilerplate that is needed for properly building the application as a mobile app. You should not need to alter much here, with the possible exception of the `ember-cordova/cordova/config.xml` file.

Any new Cordova plugins that need to be added will be added into the `package.json` file. You can do this automatically by running `npm install --save <package-name>` from inside of the `ember-cordova/cordova` directory.

The mobile app can be given a new icon by replacing the `ember-cordova/icon.svg` file with a new SVG file and then running the command `ember cdv:make-icons --platform <android or ios>`. Note that `ember-cordova` *requires* using a SVG file to generate icons.

## Electron.js

The Electron code creates the desktop application portion of `enterprise-notifications`. It does so by creating a custom browser base on the Chromium engine and Node.js. All custom Electron code is stored in the `ember-electron` directory.

The only custom Electron code is `main.js` and the code inside of the `lib` directory.

```
ember-electron
|--lib
|  |--ipcSetup.js
|  |--powerSetup.js
|  |--traySetup.js
|  `--windowSetup.js
|--resources
|  `--assets
|     `--icons
|        |--Icon.ico
|        |--Icon.png
|        |--IconGray.ico
|        |--IconGreen.ico
|        |--IconRed.ico
|        `--IconYellow.ico
|--resources-darwin
|--resources-linux
|--resources-win32
|--.compilerc
|--electron-forge-config.js
`--main.js
```

## Ember.js

All Ember.js custom code is stored under the `app` directory. There you will find any code that applies to the web page portion of the `enterprise-notifications` project.
```
app
|--adapters
|  |--clinical-system.js
|  `--historic-clinical-system.js
|--components
|  |--branded-text-canvas
|  |  |--component.js
|  |  `--template.hbs
|  |--branding-container
|  |  |--component.js
|  |  `--template.hbs
|  |--color-swatch
|  |  |--component.js
|  |  `--template.hbs
|  |--connection-alert
|  |  |--component.js
|  |  `--template.hbs
|  |--detailed-system-view
|  |  |--component.js
|  |  `--template.hbs
|  |--history-item
|  |  |--component.js
|  |  `--template.hbs
|  |--list-by-name
|  |  |--component.js
|  |  `--template.hbs
|  |--list-by-status
|  |  |--component.js
|  |  `--template.hbs
|  |--list-controls
|  |  |--component.js
|  |  `--template.hbs
|  |--list-selector
|  |  |--component.js
|  |  `--template.hbs
|  |--loading-mask
|  |  |--component.js
|  |  `--template.hbs
|  |--modal-window
|  |  |--component.js
|  |  `--template.hbs
|  |--overall-summary
|  |  |--component.js
|  |  `--template.hbs
|  |--system-list
|  |  |--component.js
|  |  `--template.hbs
|  |--text-box
|  |  |--component.js
|  |  `--template.hbs
|  `--text-field
|     |--component.js
|     `--template.hbs
|--controllers
|  |--main
|  |  |--history.js
|  |  `--notifications.js
|  `--main.js
|--helpers
|  `--pluralize-text.js
|--models
|  |--clinical-system.js
|  `--historic-clinical-system.js
|--routes
|  |--main
|  |  |--history.js
|  |  `--notifications.js
|  |--application.js
|  |--loading.js
|  `--main.js
|--serializers
|  |--clinical-system.js
|  `--historic-clinical-system.js
|--styles
|  |--_element-defaults.scss
|  |--_flex-classes.scss
|  |--_functions.scss
|  |--_layout.scss
|  |--_lists.scss
|  |--_mixins.scss
|  |--_semantic-ui-modifier.scss
|  |--_swatch.scss
|  |--_text.scss
|  |--_utility.scss
|  `--app.scss
|--templates
|  |--main
|  |  |--history.hbs
|  |  `--notifications.hbs
|  |--application.hbs
|  |--loading.hbs
|  `--main.js
|--app.js
|--index.html
|--resolver.js
`--router.js
```

## Styling

The styling in `enterprise-notifications` is done using SCSS and the Semantic UI CSS framework.

SCSS supports use of stylesheets called "partials." Partials are indicated by a leading underscore (`_example.scss`, for example). Partials are not directly compiled to SCSS, but instead have to be imported into another stylesheet using the `@import` command. In `enterprise-notifications`, all partials are imported into `app.scss` which is then compiled into a complete stylesheet at build time.

Semantic UI is a flexbox-based CSS framework. Because it heavily uses flexbox, the components it implements are incredibly easy to use in a responsive page, generally without much modification. Flexbox is well supported in all modern browsers, as well as IE11.

All modifications to the base Semantic UI classes are stored in the `app/styles/_semantic-ui-modifier.scss` partial.
