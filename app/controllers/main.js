import Ember from 'ember';
const { error, log } = Ember.Logger;
let ipcRenderer = null;

if(window.ELECTRON) {
  ipcRenderer = window.require('electron').ipcRenderer;
}

export default Ember.Controller.extend({
  // attributes
  isRead: false,
  // lifecycle
  init() {
    this._super(...arguments);

    let location = localStorage.getItem('location');

    if(ipcRenderer) {
      location = location ? location : ipcRenderer.sendSync('getLocation', '');
    }

    this.set('location', location ? location : 'All');

    if(ipcRenderer) {
      ipcRenderer.on('refresh', (/* event, arg */) => {
        this.actions.refresh.call(this);
      });
    } else {
      setInterval(()=> {
        this.actions.refresh.call(this);
      }, 300000);
    }

    Ember.run.schedule('afterRender', () => {
      this.getIsMobile();

      $(window).resize((/* e */) => {
        this.getIsMobile();

        if(!this.get('isMobile') && !$('#mobile-detail-modal').hasClass('active')) {
          $('#mobile-detail-modal').remove();
        }
      });
    });
  },
  // observers
  // use observer to catch change on both init and action call
  watchLocation: function() {
    localStorage.setItem('location', this.get('location'));
  }.observes('location'),
  // functions
  getIsMobile() {
    let isMobile = false;

    if($(window).width() < 770) {
      isMobile = true;
    }

    this.set('isMobile', isMobile);
  },
  // actions
  actions: {
    compareStatuses() {
      try {
        if(this.get('lastCheck')) {
          for(let i = 0; i < 3; i++) {
            const systemsByStatus = this.get('model').filterBy('status', i),
                  updatedSystems = [];

            systemsByStatus.map((sys) => {
              const oldStatus = this.get('lastCheck').filter((oldStatus) => {
                return oldStatus.get('systemId') === sys.get('systemId') && oldStatus.get('location') === sys.get('location') ? oldStatus : null;
              }).reduce((i, c) => {
                return i || c;
              });

              if(!!oldStatus && (sys.get('date') !== oldStatus.get('date') || sys.get('status') !== oldStatus.get('status'))) {
                log('found a system that was changed');

                updatedSystems.push(sys);
              }
            });

            this.actions.makeNotification.call(this, updatedSystems);
          }
        }
      } catch(err) {
        error(err);
      } finally {
        Ember.run.later(() => {
          $('#loading-mask').modal('hide');
        }, 1000);
      }
    },
    deselect() {
      if(this.get('isMobile')) {
        $('#mobile-detail-modal').modal('hide');
      } else if(!this.get('isMobile') && !$('#mobile-detail-modal').hasClass('active')) {
        $('#mobile-detail-modal').remove();
      }

      this.set('selected', null);
    },
    makeNotification(updatedSystems) {
      if(updatedSystems.length > 0) {
        const updateLengthMoreThanOne = updatedSystems.length > 1,
              firstSystem = updatedSystems[0],
              status = firstSystem.get('status'),
              possibleStatuses = [' is in a critical state', ' is back to normal', ' is in a warning state'],
              body = updateLengthMoreThanOne ? updatedSystems.map((sys) => {
                return `${sys.get('name')}${possibleStatuses[status]}`;
              }).join('\n') : firstSystem.get('detail'),
              icon = firstSystem.get('icon'),
              title = updateLengthMoreThanOne ? 'Multiple systems updated' : (firstSystem.get('title') || 'No title provided'),
              clickHandler = () => {
                switch(true) {
                  case updatedSystems.length > 1:
                    this.transitionToRoute('main.notifications', updatedSystems.map((system) => {
                      return system.get('id').toString();
                    }).join(','));

                    break;
                  case updatedSystems.length === 1: {
                    const sys = this.get('model').findBy('id', updatedSystems[0].get('id'));

                    if(ipcRenderer) {
                      ipcRenderer.send('showMainWindow', '');
                    }

                    this.actions.select.call(this, sys);

                    break;
                  }
                }
              };
        let options = null;

        if(window.cordova) {
          options = {
            id: firstSystem.get('id'),
            title,
            text: body
          };
          window.cordova.plugins.notification.local.schedule(options);
          window.cordova.plugins.notification.local.on('click', (/* notification */) => {
            clickHandler();
          });
        } else {
          let notification = null;

          options = {
            body,
            icon,
            permission: 'granted',
            title
          };

          notification = new Notification(title, options);
          notification.addEventListener('click', () => {
            clickHandler();
          });
        }
      }
    },
    refresh() {
      $('#loading-mask').modal('show');

      try {
        if(this.get('model')) {
          this.set('lastCheck', this.get('model').map((system) => {
            return Ember.Object.create({
              date: system.get('date'),
              detail: system.get('detail'),
              location: system.get('location'),
              status: system.get('status'),
              name: system.get('name'),
              systemId: system.get('systemId'),
              title: system.get('title')
            });
          }));

          this.set('lastCheckDate', new Date());
          this.get('model').map((sys) => {
            sys.rollbackAttributes();
          });
        } else {
          $('#loading-mask').modal('hide');
        }

        this.send('refreshModel', !!this.get('model'));
      } catch(err) {
        log('caught error in refresh()');
        error(err);
      }
    },
    select(system) {
      if(this.get('selected') && !this.get('isMobile')) {
        this.set('selected', null);

        Ember.run.later(() => {
          this.set('selected', system);
        }, 750);
      } else {
        this.set('selected', system);

        if(this.get('isMobile')) {
          $('#mobile-detail-modal').modal('show');
        }
      }

      log(this.get('selected'));
      log(this.get('isMobile'));
    },
    showHistory() {
      const id = this.get('selected.id');

      if(this.get('isMobile')) {
        this.actions.deselect.call(this);
      } else {
        $('#history-button').addClass('loading');
      }

      this.transitionToRoute('main.history', id);
    },
    updateLocation(location) {
      this.set('location', location);
      this.set('lastCheck', []);
      this.send('refreshModel', false);
    }
  }
});
