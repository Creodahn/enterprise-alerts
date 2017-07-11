import Ember from 'ember';
// const { log } = window.requireNode('console');

export default Ember.Route.extend({
  model(params) {
    // determine which system to get data for
    const selected = this.modelFor('main').findBy('id', params.id);

    // get all of the archived statuses for the selected system
    return this.store.query('historic-clinical-system', {
      reportType: 'Archive',
      location: selected.get('location'),
      systemId: selected.get('systemId')
    }).then(function(history) {
      return Ember.RSVP.hash({
        history,
        location: selected.get('location')
      });
    });
  },
  setupController(controller, model) {
    this._super(controller, model.history);

    controller.set('location', model.location);
  },
  actions: {
    // willTranstion is a hook that fires every time a user navigates away from
    // a route; here we use it to remove the loading class from the history button
    // for the system summary
    willTransition() {
      $('#history-button').removeClass('loading');
    },
  }
});
