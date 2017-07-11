import Ember from 'ember';
let ipcRenderer = null;

if(window.ELECTRON) {
  ipcRenderer = window.require('electron').ipcRenderer;
}

export default Ember.Component.extend({
  tagName: '',
  // computed properties
  countIsCritical: Ember.computed('model.@each.isCritical', function() {
    return this.countItems('isCritical');
  }),
  countIsInformational: Ember.computed('model.@each.isInformational', function() {
    return this.countItems('isInformational');
  }),
  countIsUp: Ember.computed('model.@each.isUp', function() {
    return this.countItems('isUp');
  }),
  lastUpdated: Ember.computed('model.firstObject.lastUpdated', function() {
    return this.get('model.firstObject.lastUpdated');
  }),
  swatchColor: Ember.computed('countIsCritical', 'countIsInformational', 'countIsUp', function() {
    let color = 'green';

    switch(true) {
      case this.get('countIsCritical') > 0:
        color = 'red';
        break;
      case this.get('countIsInformational') > 0:
        color = 'yellow';
        break;
      case this.get('noConnection') && !this.get('model'):
        color = 'gray';
        break;
      default: color = 'green';
    }

    return `swatch-${color}`;
  }),
  // lifecycle
  didInsertElement() {
    if(ipcRenderer) {
      Ember.run.scheduleOnce('afterRender', () => {
        this.setTrayColor();
      });
    }
  },
  afterRender() {
    this.setTrayColor();
  },
  // observers
  watchCounts: function() {
    if(ipcRenderer) {
      this.setTrayColor();
    }
  }.observes('countIsCritical', 'countIsInformational', 'countIsUp', 'noConnection'),
  // functions
  countItems(itemType) {
    if(this.get('model')) {
      return this.get('model').map(function(item) {
        return item.get(itemType) ? 1 : 0;
      }).reduce(function(i, c) {
        return i + c;
      });
    } else {
      return 0;
    }
  },
  setTrayColor() {
    switch(true) {
      case this.get('noConnection'):
        ipcRenderer.send('noConnectionAlert');
        break;
      case this.get('countIsCritical') > 0:
        ipcRenderer.send('criticalAlert', '');
        break;
      case this.get('countIsInformational') > 0:
        ipcRenderer.send('informationalAlert', '');
        break;
      default:
        ipcRenderer.send('nominalAlert', '');
    }
  },
  // actions
  actions: {
    refresh() {
      this.sendAction('refresh');
    }
  }
});
