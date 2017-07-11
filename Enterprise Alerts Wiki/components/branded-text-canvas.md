# branded-text-canvas

This component creates an HTML 5 canvas that accepts a string to display with the UCHealth branding underline beneath it. It also accepts an X and Y coordinate pair for the upper left corner of the text.

The component also requires an `id` attribute, which is then assigned as the id of the canvas element added to the DOM.

Example:
```
{{branded-text-canvas
  id="header"
  text="uchealth alerts"
  textX=75
  textY=43
}}
```
