/*
 * This file defines the behavior of the main window for the
 */
const { join } = require('path'),
      { log } = require('console'),
      { BrowserWindow, nativeImage } = require('electron');

function setupWindow(iconsDir, url, app, opts) {
  const icon = nativeImage.createFromPath(join(iconsDir, 'Icon.png')),
        options = {
          height: 595,
          icon,
          maximizable: false,
          maxWidth: 800,
          minHeight: 595,
          minWidth: 400,
          show: false,
          textAreasAreResizable: false,
          title: 'Enterprise Notifications',
          webPreferences: {
            webSecurity: false
          },
          width: 800,
        };
  let window = null;

  if(opts) {
    for(const key in opts) {
      options[key] = opts[key];
    }
  }

  window = new BrowserWindow(options);

  window.on('close', (e) => {
    switch(true) {
      case app.isQuitting:
        // clean up refresh
        clearInterval(app.refreshInterval);
        break;
      default:
        e.preventDefault();
        window.hide();
    }

    return false;
  });

  window.webContents.on('crashed', () => {
    log('Your Ember app (or other code) in the main window has crashed.');
    log('This is a serious issue that needs to be handled and/or debugged.');
  });

  window.on('minimize', (e) => {
    e.preventDefault();
    window.hide();
  });

  window.on('unresponsive', () => {
    log('Your Ember app (or other code) has made the window unresponsive.');
  });

  window.on('responsive', () => {
    log('The main window has become responsive again.');
  });

  window.loadURL(url);

  // If a loading operation goes wrong, we'll send Electron back to
  // Ember App entry point
  window.webContents.on('did-fail-load', () => {
    window.loadURL(url);
  });

  return window;
}

module.exports = setupWindow;
