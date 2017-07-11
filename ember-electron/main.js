/*
 * This is the main file to initialize the Electron application.
 * Configuration for various parts of the application can be found in the lib
 * directory.
 */
const electron = require('electron'),
      { app, ipcMain, protocol } = electron,
      { dirname, join, resolve } = require('path'),
      emberAppLocation = 'serve://dist',
      protocolServe = require('electron-protocol-serve'),
      log = require('console').log,
      iconsDir = join(__dirname, 'resources', 'assets', 'icons'),
      ipcSetup = require('./lib/ipcSetup.js'),
      powerSetup = require('./lib/powerSetup.js'),
      setupTray = require('./lib/traySetup.js'),
      setupWindow = require('./lib/windowSetup.js');

let mainWindow = null,
    tray = null;

// Registering a protocol & schema to serve our Ember application
protocol.registerStandardSchemes(['serve'], { secure: true });
protocolServe({
  cwd: join(__dirname || resolve(dirname('')), '..', 'ember'),
  app,
  protocol,
});

// Uncomment the lines below to enable Electron's crash reporter
// For more information, see http://electron.atom.io/docs/api/crash-reporter/
// electron.crashReporter.start({
//     productName: 'YourName',
//     companyName: 'YourCompany',
//     submitURL: 'https://your-domain.com/url-to-submit',
//     autoSubmit: true
// });

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  app.setAppUserModelId('UCHealth Enterprise Alert System');
  app.setName('UCHealth Enterprise Alert System');

  mainWindow = setupWindow(iconsDir, emberAppLocation, app);

  tray = setupTray(iconsDir, app, mainWindow);

  // If you want to open up dev tools programmatically, call
  // mainWindow.openDevTools();

  ipcSetup.call(ipcMain, iconsDir, mainWindow, tray);

  powerSetup.call(app, mainWindow);
});

// Handle an unhandled error in the main thread
//
// Note that 'uncaughtException' is a crude mechanism for exception handling intended to
// be used only as a last resort. The event should not be used as an equivalent to
// "On Error Resume Next". Unhandled exceptions inherently mean that an application is in
// an undefined state. Attempting to resume application code without properly recovering
// from the exception can cause additional unforeseen and unpredictable issues.
//
// Attempting to resume normally after an uncaught exception can be similar to pulling out
// of the power cord when upgrading a computer -- nine out of ten times nothing happens -
// but the 10th time, the system becomes corrupted.
//
// The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated
// resources (e.g. file descriptors, handles, etc) before shutting down the process. It is
// not safe to resume normal operation after 'uncaughtException'.
process.on('uncaughtException', (err) => {
  log('An exception in the main thread was not handled.');
  log('This is a serious issue that needs to be handled and/or debugged.');
  log(`Exception: ${err}`);
});
