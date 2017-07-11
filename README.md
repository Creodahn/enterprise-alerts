# enterprise-notifications

This README outlines the details of collaborating on this Ember application.
This application replaces the older UCH Enterprise Alerts application. Given the new Ember.js and Electron.js architecture, it offers us much more flexibility to deploy the application to any major desktop OS (Windows 7+, macOS, or Linux). The inclusion of `ember-cordova` also allows us to package the application for deployment to Android and iOS devices.

Development of the application requires solid knowledge of Javascript and some familiarity with the features introduced in ES2015. See the Tutorial section of this README if you need to familiarize yourself with the Ember.js and Electron.js toolsets.

The Further Reading/Useful Links section of this README provides resources for more in-depth information about all of the tools used in this project.

For an overview of the architecture of this application, see [App Architecture](https://github.com/Creodahn/enterprise-alerts/wiki/apparchitecture) in the wiki.

## Prerequisites

If using Windows, you will need to update a value in your registry. Note that this will only work on Windows 10 with the Anniversary update.

Find the registry key `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem\LongPathsEnabled` and set it from 0 to 1. If you do not see this key in your registry, you will need to create it by right clicking on `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem`, choosing New > DWORD (32-bit value) and naming it LongPathsEnabled with a value of 1. This change requires a computer restart to take effect.

You will need the following things properly installed on your computer.

*   [Git](https://git-scm.com/)
*   [Node.js](https://nodejs.org/) - Select the latest release from the downloads section
*   [Bower](https://bower.io/) - run `npm install -g bower`
*   [Ember CLI](https://ember-cli.com/) - run `npm install -g ember-cli` to install Ember CLI globally
*   [PhantomJS](http://phantomjs.org/) - PhantomJS is used as Ember's headless testing environment
*   [NodeJS Tools for Visual Studio by Microsoft](https://github.com/Microsoft/nodejstools)
*   [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi) - Ember Inspector is a Chrome addon that lets you view and manipulate many aspects of the Ember framework while your application is running. Ember Inspector is automatically available inside of Electron when using the `ember-electron` NPM package.

## Tutorial

Ember has a quick start guide for getting Ember CLI installed available at [Ember Quick Start](https://guides.emberjs.com/v2.13.0/getting-started/quick-start/).

Ember has instructions for a tutorial application available at [Creating Your App](https://guides.emberjs.com/v2.13.0/tutorial/ember-cli/). This tutorial will introduce you to all of the parts of an Ember application, as well as providing information about what each part does and how they work together to create a complex application.

Electron has a tutorial available at [Electron Tutorial Quick Start](https://electron.atom.io/docs/tutorial/quick-start/)

It would also be useful to familiarize yourself with SCSS, one of the syntaxes of the SASS CSS preprocessor. You can do so [here](http://sass-lang.com/documentation/file.SCSS_FOR_SASS_USERS.html). If you are completely new to SASS, you may want to start [here](http://sass-lang.com/documentation/).

## Installation

*   clone the repository locally
*   `cd enterprise-notifications`
*   `npm install` - install NPM dependencies
*   `bower install` - install Bower dependencies

## Running / Development

*   `ember electron`
*   Once the above command is run, an instance of the application will open with access to Chrome dev tools

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

Most commonly used examples:

*   `ember generate component <component-name> --pod` Components are encapsulated views with backing code that can be easily reused. For more information, visit [Ember Components](https://guides.emberjs.com/v2.13.0/components/defining-a-component/). Note that the `--pod` flag changes how components are added to the project. It groups both the Handlebars template and Javascript file into a fold with the component's name under the `components` directory. `enterprise-notifications` uses pods only for components.
*   `ember generate route <route-name>` Routes manage the URL and which view a user sees. Generating a route also creates a matching template for a view. For more information, visit [Ember Routing](https://guides.emberjs.com/v2.13.0/routing/)
*   `ember generate controller <route-name>` Controllers manage a view and handle changes or updates. The controller's name should match the name of an existing route. For more information, visit [Ember Controlllers](https://guides.emberjs.com/v2.13.0/controllers/)
*   `ember generate helper <helper-name>` Helpers are self-contained pieces of code that take input(s) and transform it based on the helper's internal function. They are generally used to reformat data to make it more user friendly. For more information, visit [Creating a Handlebars Helper](https://guides.emberjs.com/v2.13.0/tutorial/hbs-helper/)
*   `ember generate service <service-name>` Services are used to inject common code into controllers, routes, or components. For more information, visit [Utilities and Services](https://guides.emberjs.com/v2.13.0/tutorial/hbs-helper/)
*   `ember generate model <model-name>` Models describe what a data record should look like. For more information, visit [Ember Models](https://guides.emberjs.com/v2.13.0/models/)
*   `ember generate adapter <model-name>` Adapters tell Ember how to retrieve data for a specific model. The name must match the model's name. Note that if the data source's API follows JSONAPI standards, no custom adapter is needed. For more information, visit [Customizing Adapters](https://guides.emberjs.com/v2.13.0/models/customizing-adapters/)
*   `ember generate serializer <model-name>` Serializers tell Ember how to translate data from its source structure to the structure defined by the model. Note that if the datasource returns data in a JSONAPI format, no custom serializer is required. The name must match the model's name. For more information, visit [Customizing Serializers](https://guides.emberjs.com/v2.13.0/models/customizing-serializers/)

### Building

`enterprise-notifications` can be built into an Electron desktop app, an Android or iOS mobile app, or a web app with the following commands. Note that it may be desirable to create a Gulp.js build task that automates running all of these commands when performing a build for a new version of the app.

*   `ember electron:make`
*   This command will build an executable containing all of the app's dependencies.
  It will be created in the `enterprise-notifications\electron-out` directory
*   `ember cdv:build --platform=<android or ios>`
*   This command will build an executable for either Android or iOS. It puts the builds into `C:\builds\enterprise-notifications`
*   `ember build production` builds a website only version of `enterprise-notifications` and puts it into the `dist` directory inside the project

## Further Reading / Useful Links

*   [Babel.js](http://babeljs.io/) - note that Babel is part of the Ember.js build process and requires no hands-on configuration. This link is included merely for informational purposes.
*   [ember.js](http://emberjs.com/)
*   [ember-cli](https://ember-cli.com/)
*   [ember-cordova](http://embercordova.com/)
*   [ember-electron](https://ember-electron.js.org/)
*   [Electron](https://electron.atom.io)
*   [Javascript ES6 Features Overview](https://github.com/lukehoban/es6features)
*   [NPM](https://www.npmjs.com/)
*   Development Browser Extensions
    *   [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
    *   [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
