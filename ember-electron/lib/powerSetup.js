/*
 * This file sets up app behavior for OS suspension and resume, i.e. when a user
 * puts their computer to sleep or wakes it back up. The app suspends checking
 * for data when the machine goes to sleep, and restarts the retrieval loop on
 * wake up.
 */
const electron = require('electron');

function setupPowerOptions(mainWindow) {
  const setupRefreshInterval = () => {
    // refresh every five minutes
    this.refreshInterval = setInterval(() => {
      mainWindow.webContents.send('refresh', '');
    }, 300000);
  };

  setupRefreshInterval();

  // handle OS power events -- should prevent loading issues on resume
  electron.powerMonitor.on('suspend', () => {
    if(this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  });

  electron.powerMonitor.on('resume', () => {
    setupRefreshInterval();
  });
}

module.exports = setupPowerOptions;
