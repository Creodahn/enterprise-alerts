import Ember from 'ember';
const { error } = Ember.Logger;
let ipcRenderer = null;

if(window.ELECTRON) {
  ipcRenderer = window.require('electron').ipcRenderer;
}

export default Ember.Route.extend({
  // attributes
  isRead: true,
  noConnection: false,
  // lifecycle
  model() {
    // use the user's location to determine which systems to retrieve
    let location = localStorage.getItem('location');

    if(ipcRenderer) {
      // if the ipcRenderer is available, use it to get the user's location
      // if the location is not already set in localStorage
      location = location ? location : ipcRenderer.sendSync('getLocation', '');
    } else if(!location) {
      // default to `all` if there's not other way to get a location
      location = 'All';
    }

    // make sure to set the determined location back to localStorage
    // so we won't have to check again
    localStorage.setItem('location', location);

    // load clinical systems for the user's location
    return this.store.query('clinical-system', {
      reportType: 'Report',
      location
    }).then((systems) => {
      this.set('noConnection', false);

      return systems;
    }).catch((reason) => {
      // if there is an error when loading data, show the "no connection"
      // message to the user
      error(reason);
      this.set('isRead', false);
      this.set('noConnection', true);
    });
  },
  setupController(controller, model) {
    // set the model to the retrieved data
    this._super(controller, model);

    // setup some attributes on the controller, based on the values in the route
    controller.set('lastCheckDate', new Date());
    controller.set('isRead', this.get('isRead'));
    controller.set('noConnection', this.get('noConnection'));
  },
  actions: {
    refreshModel(doComparison) {
      // refresh the model
      this.refresh().then(() => {
        const ctrl = this.controller;

        // if we have a connection and should do a comparison, call the
        // controller action to do the compare; otherwise hide the loading mask
        if(doComparison && !this.get('noConnection')) {
          ctrl.actions.compareStatuses.call(ctrl);
        } else {
          $('#loading-mask').modal('hide');
        }
      });

      return true;
    }
  }
});
