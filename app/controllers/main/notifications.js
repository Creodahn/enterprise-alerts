import Ember from 'ember';

export default Ember.Controller.extend({
  // attributes
  sortProperties: ['name:desc'],
  // computed properties
  sortedNotifications: Ember.computed.sort('model', 'sortProperties'),
  // actions
  actions: {
    modalClosed() {
      $('#notifications-modal').remove();

      this.transitionToRoute('main');
    }
  }
});
