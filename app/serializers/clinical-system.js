import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  // turn payload received from data source into JSONAPI formatted object
  formatData(payload, type) {
    // if the payload has a property called Notifications, use that as the
    // data source instead of the payload itself
    const data = payload.Notifications ? payload.Notifications : payload,
          results = {
            data: []
          };

    results.data = data.map(function(item, index) {
      return {
        // make up a unique id, since systemId is the same for each location
        id: index + 1,
        type,
        attributes: {
          date: item.StatusDate,
          dateSpecified: item.StatusDateSpecified,
          detail: item.StatusDetail,
          lastUpdated: payload.LastUpdated,
          location: item.SystemLocation,
          name: item.SystemName,
          status: item.SystemStatus,
          systemId: item.SystemId,
          title: item.StatusTitle,
        }
      };
    });

    return results;
  },
  normalizeResponse(store, primaryModelClass, payload /* , id, requestType */) {
    return this.formatData(payload, 'clinical-system');
  }
});
