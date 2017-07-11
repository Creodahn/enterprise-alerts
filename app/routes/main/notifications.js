import Ember from 'ember';
// const { log } = Ember.Logger;

export default Ember.Route.extend({
  model(params) {
    // the id_list is a comma separated list of system ids; split it into an array
    const ids = params.id_list.split(',');

    // compose an array of systems by searching the currently loaded system list
    // for matching ids
    return ids.map((id) => {
      return this.modelFor('main').findBy('id', id);
    });
  },
});
