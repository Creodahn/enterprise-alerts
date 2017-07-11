# system-list

This component displays a list of systems that are passed to it in the order in which they are passed in. It also allows the user to click on a system to set it as the selected system.

### Attributes

* `model`: This attribute accepts the list of systems to be displayed

### Actions

* `select`: This action passes back the system that was clicked

Example:
```
{{system-list
  model=sortedSystems
  select="select"
}}
```
