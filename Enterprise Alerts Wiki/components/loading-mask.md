# loading-mask

The `{{loading-mask}}` component displays a modal with loading text and an SVG loading image on top of whichever route is currently open. It takes no attributes and has no actions to map. It can be opened by calling `$('#loading-mask').modal('show');` and hidden by calling `$('#loading-mask').modal('hide');` as part of a Javascript function.

Only one instance of the loading mask should be in the application at a time as the id of the DOM element is hardcoded in the component, and adding multiple copies will result in errors. The component is included in the `application.hbs` file.

Example:
```
{{loading-mask}}
```
