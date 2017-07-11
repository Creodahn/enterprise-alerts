/* jshint node:true */
const { app, BrowserWindow, protocol } = require('electron'),
      { dirname, resolve } = require('path'),
      url = require('url'),
      protocolServe = require('electron-protocol-serve'),
      // The testUrl is a file: url pointing to our index.html, with some query
      // params we need to preserve for testem. So we need to register our ember
      // protocol accordingly.
      [, , indexUrl] = process.argv,
      { pathname: indexPath, search: indexQuery, } = url.parse(indexUrl),
      emberAppLocation = `serve://dist${indexQuery}`;

let mainWindow = null;


protocol.registerStandardSchemes(['serve'], { secure: true });
// The index.html is in the tests/ directory, so we want all other assets to
// load from its parent directory
protocolServe({
  cwd: resolve(dirname(indexPath), '..'),
  app,
  protocol,
  indexPath,
});

app.on('window-all-closed', function onWindowAllClosed() {
  if(process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', function onReady() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundThrottling: false,
  });

  delete mainWindow.module;

  mainWindow.loadURL(emberAppLocation);

  mainWindow.on('closed', function onClosed() {
    mainWindow = null;
  });
});
