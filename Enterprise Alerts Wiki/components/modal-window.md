# modal-window

The `modal-window` component sets up a modal that can have custom content loaded into it. This component can be heavily customized.

### Attributes

* `closable`: this attribute takes a boolean value indicating whether or not to show the close icon for the modal. If no value is passed, it will default to `false`.

* `id`: this attribute takes a string value that sets the element ID in the DOM. This attribute is required.

* `title`: this attribute takes a value to use as the title in the header bar of the modal. This attribute is optional.

* `transition`: this attribute takes a string that is one of Semantic UI's predefined transitions:
    - `scale`
    - `fade <up, down, left, right>`
    - `<horizontal, vertical> flip`
    - `drop`
    - `fly <up, down, left, right>`
    - `swing <up, down, left, right>`
    - `browse <up, down, left, right>`
    - `slide <up, down, left, right>`

* `content-classes`: this attribute takes a string that describes one or more CSS classes to apply to the `content` section of the modal. This attribute is optional.

* `modal-classes`: this attribute takes a string that describes one or more CSS classes to apply to the body of the modal. This attribute is optional.

* `title-classes`: this attribute takes a string that describes one or more CSS classes to apply to the `header` of the modal. This attribute is optional.

### Actions

* `modalClosed`: this action is fired every time the modal is closed. It can be used as a hook to perform a specific action when the modal is hidden. For example, in the `history` and `notifications` routes, this action is used to remove their respective modals from the DOM and transition back to the `main` route. See the controller files for either route for an example. NOTE: if a modal is nested inside of a route that may be transitioned away from, then the modal _must_ be removed before the route transition. For this to work properly, the modal needs to be nested inside a parent element inside of the route's template to avoid any DOM manipulation errors.

Example:
```
<div>
  {{#modal-window
    closable=true
    id="example-modal"
    title="Awesome Modal"
    transition="horizontal flip"
    title-classes="text-red"
    modalClosed="modalClosed"
  }}
    <div class="flex-spacer history-list">
      <ul class="no-margin no-padding">
        {{#each sortedHistory as |system|}}
          {{history-item model=system}}
        {{/each}}
      </ul>
    </div>
  {{/modal-window}}
</div>
```
