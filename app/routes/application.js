import Ember from 'ember';

export default Ember.Route.extend({
  loaded: false,
  actions: {
    // the loading action is a built-in hook that fires when a new route is
    // loaded. It can be overridden for custom behavior
    loading() {
      // loaded will only be false on the initial app load; set it to true and show
      // the loading route while the load is completing, then skip that for all
      // subsequent loads
      if(!this.get('loaded')) {
        this.set('loaded', true);
        this.intermediateTransitionTo('loading');
      }
    }
  }
});
