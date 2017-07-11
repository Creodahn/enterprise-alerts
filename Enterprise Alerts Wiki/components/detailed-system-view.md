# detailed-system-view

This component creates a view for a single system's current status data.

It accepts the following attributes and action mappings:

### Attributes
* `isMobile`: this is a boolean that should indicate whether or not the app has detected it is running in a mobile environment
* `model`: this should be a single system record that is to be displayed

### Actions:
* `deselect`: the action this maps to should set the attribute being passed to `model` to a `null` value. See the `actions` in the `main.js` controller file for an example implementation
* `showHistory`: the action this maps to should take the id from the attribute passed to `model` and use it to transition to the `main/history/:id` route. See the `actions` in the `main.js` controller file for an example implementation

Example:
```
{{detailed-system-view
  isMobile=isMobile
  model=selected
  deselect="deselect"
  showHistory="showHistory"
}}
```
