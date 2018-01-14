/* eslint-env node */
const { app, BrowserWindow, protocol } = require('electron');
const { dirname, join, resolve } = require('path');
const protocolServe = require('electron-protocol-serve');

let mainWindow = null;

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

function createWindow() {

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600
  });

  // If you want to open up dev tools programmatically, call
  // mainWindow.openDevTools();

  const emberAppLocation = 'serve://dist';

  // Load the ember application using our custom protocol/scheme
  mainWindow.loadURL(emberAppLocation);

  // If a loading operation goes wrong, we'll send Electron back to
  // Ember App entry point
  mainWindow.webContents.on('did-fail-load', () => {
    mainWindow.loadURL(emberAppLocation);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  if (process.platform === 'win32') {
    app.on('window-all-closed', function () {
      app.quit();
    });
  } else {
    mainWindow.on('close', function (e) {
      e.preventDefault();

      if (mainWindow.isFullScreen()) {
        mainWindow.once('leave-full-screen', function () {
          mainWindow.hide();
        });
        mainWindow.setFullScreen(false);
      } else {
        mainWindow.hide();
      }

    });

    app.on('before-quit', function () {
      mainWindow.removeAllListeners();
    });
  }

  mainWindow.webContents.on('crashed', () => {
    console.log('Your Ember app (or other code) in the main window has crashed.');
    console.log('This is a serious issue that needs to be handled and/or debugged.');
  });

  mainWindow.on('unresponsive', () => {
    console.log('Your Ember app (or other code) has made the window unresponsive.');
  });

  mainWindow.on('responsive', () => {
    console.log('The main window has become responsive again.');
  });

  process.on('uncaughtException', (err) => {
    console.log('An exception in the main thread was not handled.');
    console.log('This is a serious issue that needs to be handled and/or debugged.');
    console.log(`Exception: ${err}`);
  });
}

app.on('ready', () => {
  createWindow();
  // updater.initialize(mainWindow);

  if (mainWindow) {
    // mainWindow.setTouchBar(touchBar.initialize());
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    return null;
  } else {
    mainWindow.show();
  }
});
