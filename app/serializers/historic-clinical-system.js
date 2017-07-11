import ClinicalSystemSerializer from 'enterprise-notifications/serializers/clinical-system';

// extend the serializer for `clinical-system` model so that the `formatData`
// function can be reused
export default ClinicalSystemSerializer.extend({
  normalizeResponse(store, primaryModelClass, payload /* , id, requestType */) {
    // pass the correct model type
    return this.formatData(payload, 'historic-clinical-system');
  }
});
