# list-controls

This component creates the controls for selecting location and sort type. The list of locations that are available is currently hardcoded as a select list inside of this component.

### Attributes

* `location`: This takes an attribute which holds the currently selected location value (All, North, South, Central). This should not be the user friendly name of the location, but rather the one that is used to send to the data services.

* `sortType`: This takes an attribute which holds the currently selected sort type value (name or status)

### Actions

* `setSortType`: This action should accept a value for the sort type and then set it to the attribute being passed into `sortType`. For an example of the implementation, see the `actions` hash in the `main.js` controller file.

* `updateLocation`: This action should accept a value for location and then set it to the attribute being passed into `location`. For an example of the implementation, see the `actions` hash in the `main.js` controller file.

Example:
```
{{list-controls
  location=location
  sortType=sortType
  setSortType="setSortType"
  updateLocation="updateLocation"
}}
```
