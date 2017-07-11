/*
 * This file sets up the initial tray icon when the app starts, and defines the
 * behavior when the user interacts with the tray icon.
 */
const { BrowserWindow, Menu, Tray } = require('electron'),
      { join } = require('path');

function setupTray(iconsDir, app, mainWindow) {
  const tray = new Tray(join(iconsDir, 'Icon.ico')),
        trayContextMenu = Menu.buildFromTemplate([
          {
            label: 'Force Update',
            type: 'normal',
            click() {
              mainWindow.webContents.send('refresh', '');
            }
          },
          {
            label: 'Exit',
            type: 'normal',
            click() {
              app.isQuitting = true;
              BrowserWindow.getAllWindows().map(function(window) {
                window.close();
              });
            }
          }
        ]);
  tray.setToolTip('Enterprise Notifications for UCHealth');
  tray.setContextMenu(trayContextMenu);

  tray.on('click', function() {
    mainWindow.show();
    mainWindow.focus();
  });

  return tray;
}

module.exports = setupTray;
