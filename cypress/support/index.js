// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import addContext from 'mochawesome/addContext';

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    // debugger;
    const parentName = getParentName(runnable);
    const screenshot = `${Cypress.config('screenshotsFolder')}/${Cypress.spec.name}/${parentName} -- ${
      test.title
    } (failed).png`;
    addContext({ test }, screenshot);
    addContext({ test }, `${Cypress.config('videosFolder')}/${Cypress.spec.name}.mp4`);
  }
});

function getParentName(runnable, titles = []) {
  if (runnable.parent.title) {
    titles.push(runnable.parent.title);
    return getParentName(runnable.parent, titles);
  } else {
    return titles.reverse().join(' -- ');
  }
}
