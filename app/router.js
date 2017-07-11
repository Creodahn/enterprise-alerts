import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

// This route mappings inside of the Ember project. Generally you will not need
// to modify this manually. Ember will add new entries into this function when
// using the `ember generate route <route-name>` command.
// The only time you should need to manually edit the routes is if you want
// to use a path other than the default
Router.map(function() {
  this.route('main', { path: '/' }, function() {
    // the :id or :id_list in these route paths indicate a "dynamic segment"
    // dynamic segments need to be filled with a value when the user is
    // visiting that route, or it will result in an error.
    // The passed values are accessible in the model hook inside of the
    // corresponding `route` file as `params[<segment name>]``
    this.route('history', { path: '/history/:id' });
    this.route('notifications', { path: '/notifications/:id_list' });
  });
  this.route('loading');
});

export default Router;
