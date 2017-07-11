import DS from 'ember-data';
import ENV from 'enterprise-notifications/config/environment';

const p = ENV.APP.enPassword,
      uName = ENV.APP.enUser,
      url = ENV.APP.webServiceUrl;

export default DS.RESTAdapter.extend({
  findAll(/* store, type, sinceToken */) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.get({
        headers: {
          Authorization: `Basic ${btoa(`${uName}:${p}`)}`,
        },
        url: `${url}Report?location=all`
      }).then(function(data) {
        resolve(data);
      }, function(jqXHR) {
        reject(jqXHR);
      });
    });
  },
  query(store, type, query) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.get({
        headers: {
          Authorization: `Basic ${btoa(`${uName}:${p}`)}`,
        },
        url: `${url}${query.reportType}?location=${query.location}${query.systemId ? `&SystemId=${query.systemId}` : ''}`
      }).then(function(data) {
        resolve(data);
      }, function(jqXHR) {
        reject(jqXHR);
      });
    });
  }
});
