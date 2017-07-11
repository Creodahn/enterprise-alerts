# list-selector

This component manages which list is displayed. It also contains the `{{list-controls}}` component.

### Attributes

* `location`: This takes an attribute which holds the currently selected location value (All, North, South, Central). This should not be the user friendly name of the location, but rather the one that is used to send to the data services.

* `model`: This should be a list of all systems currently loaded

### Actions

* `select`: This action passes back a single system record to set as the selected system

* `updateLocation`: This action should accept a value for location and then set it to the attribute being passed into `location`. For an example of the implementation, see the `actions` hash in the `main.js` controller file.

Example:
```
{{list-selector
  location=location
  model=model
  select="select"
  updateLocation="updateLocation"
}}
```
