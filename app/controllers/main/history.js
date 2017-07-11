import Ember from 'ember';
// const { log } = Ember.Logger;

export default Ember.Controller.extend({
  // attributes
  sortProperties: ['date:desc'],
  // computed properties
  sortedHistory: Ember.computed.sort('model', 'sortProperties'),
  systemName: Ember.computed('model.firstObject.name', function() {
    return this.get('model.firstObject.name');
  }),
  actions: {
    modalClosed() {
      $('#history-modal').remove();

      this.transitionToRoute('main');
    }
  }
});
