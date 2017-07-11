# list-by-name

This component takes an array of systems as its model and displays them ordered by name. It also maps to an action that sets a system as selected when the list item is clicked. See the `main.js` controller file for an implementation of the `select` action.

Example:
```
{{list-by-name
  model=systeList
  select="select"
}}
```
