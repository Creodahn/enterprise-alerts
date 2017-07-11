/*
 * This file configures the interprocess communication for Electron.
 * IPC allows the contents of the application to communicate with the
 * Electron app and vice versa.
 *
 * For Enterprise Notifications, this generally means refreshing the data and
 * keeping track of which icon animation should be used in the system tray.
 */
const { join } = require('path'),
      trayRefresh = 1500;

let trayColorManagement = null;

// prepare ipcMain to receive messages from the Ember application
function ipcSetup(iconsDir, mainWindow, tray) {
  const icon = join(iconsDir, 'Icon.ico'),
        trayAlert = function(baseIcon, replacementIcon) {
          let icon = baseIcon;

          if(trayColorManagement) {
            clearInterval(trayColorManagement);
          }

          trayColorManagement = setInterval(function() {
            icon = icon === baseIcon ? replacementIcon : baseIcon;

            tray.setImage(icon);
          }, trayRefresh);
        };

  this.on('getLocation', (event /* , arg */) => {
    const friendlyLocation = {
            EMP: 'South',
            PVHS: 'North',
            UCH: 'Central',
          },
          location = process.env.USERDOMAIN;

    event.returnValue = friendlyLocation[location] || 'All';
  });

  this.on('criticalAlert', (/* event, arg */) => {
    trayAlert(icon, join(iconsDir, 'IconRed.ico'));
  });

  this.on('informationalAlert', (/* event, arg */) => {
    trayAlert(icon, join(iconsDir, 'IconYellow.ico'));
  });

  this.on('noConnectionAlert', (/* event, arg */) => {
    trayAlert(icon, join(iconsDir, 'IconGray.ico'));
  });

  this.on('nominalAlert', (/* event, arg */) => {
    if(trayColorManagement) {
      clearInterval(trayColorManagement);
    }

    tray.setImage(icon);
  });

  this.on('showMainWindow', (/* event, arg */) => {
    if(!mainWindow.isVisible()) {
      mainWindow.show();
    }
  });
}

module.exports = ipcSetup;
