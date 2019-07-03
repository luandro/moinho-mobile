/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

const wd = require('wd');
const path = require('path');
const test = require('tape');

const localServerConfig = {host: 'localhost', port: 4995};

const str = '../android/app/build/outputs/apk/release/app-release.apk';
const localCapabilities = {
  browserName: 'Android - local server',
  platformName: 'Android',
  deviceName: 'Android device',
  autoGrantPermissions: true,
  app: path.resolve(__dirname, str),
};

let driver;

test('Setup and open Android app', function(t) {
  var serverConfig = localServerConfig;
  var capabilities = localCapabilities;

  driver = wd.promiseChainRemote(serverConfig);
  driver
    .init(capabilities)
    .setImplicitWaitTimeout(1000)
    .then(() => {
      t.end();
    });
});

test('...', function(t) {
  require('./central.js')(driver, t);
  require('./connections.js')(driver, t);
  require('./compose.js')(driver, t);
  require('./drawer.js')(driver, t);
  require('./feed.js')(driver, t);
  require('./thread.js')(driver, t);
  require('./profile.js')(driver, t);
  t.end();
});

test('Teardown', function(t) {
  driver.quit().then(() => {
    t.end();
  });
});
