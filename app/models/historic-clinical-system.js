/*
 * This model simply extends the clinical-system model. The separation is due to
 * some issues that occurred with extraneous data appearing in the system lists
 * when the historic system statuses were loaded into the model.
 */
import ClinicalSystemModel from 'enterprise-notifications/models/clinical-system';

export default ClinicalSystemModel.extend({

});
