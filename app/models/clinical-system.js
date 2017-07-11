/*
 * This model describes the shape of the data object for the displayed system
 * statuses. It includes some computed properties based on the values retrieved
 * from the data source.
 */
import DS from 'ember-data';

export default DS.Model.extend({
  // attributes
  date: DS.attr('date'),
  dateSpecified: DS.attr('boolean'),
  // set a default value if there is no value
  detail: DS.attr('string', { defaultValue: 'No detail provided' }),
  lastUpdated: DS.attr('date'),
  location: DS.attr('string'),
  name: DS.attr('string'),
  status: DS.attr('string'),
  systemId: DS.attr('number'),
  // set a default value if there is no value
  title: DS.attr('string', { defaultValue: 'Not title provided' }),
  // computed properties
  // determine what color should be used based on computed status value flags
  color: Ember.computed('status', function() {
    let color = 'green';

    switch(true) {
      case this.get('isCritical'):
        color = 'red';
        break;
      case this.get('isInformational'):
        color = 'yellow';
        break;
      default: color = 'green';
    }

    return color;
  }),
  // determine which icon to display for this system based on computed status flags
  // this is for the notification icon
  icon: Ember.computed('status', function() {
    let icon = '/assets/icons/GreenCheck.png';

    switch(true) {
      case this.get('isCritical'):
        icon = '/assets/icons/Critical.png';
        break;
      case this.get('isInformational'):
        icon = '/assets/icons/Informational.png';
        break;
      default:
        icon = '/assets/icons/GreenCheck.png';
    }

    return icon;
  }),
  // determine which CSS classes to apply to in-app icons based on status flags
  iconCss: Ember.computed('status', function() {
    let icon = 'text-green check circle icon';

    switch(true) {
      case this.get('isCritical'):
        icon = 'text-red warning circle icon';
        break;
      case this.get('isInformational'):
        icon = 'text-yellow warning sign icon';
        break;
      default:
        icon = 'text-green check circle icon';
    }

    return icon;
  }),
  // check if status is critical (0)
  isCritical: Ember.computed('status', function() {
    return this.get('status') === 0;
  }),
  // check if status is informational (2)
  isInformational: Ember.computed('status', function() {
    return this.get('status') === 2;
  }),
  // check if status is normal (1)
  isUp: Ember.computed('status', function() {
    return this.get('status') === 1;
  })
});
