# overall-summary

This component shows an overall summary of the state of the currently loaded systems. This includes counts of how many systems fall into each status, as well as a color swatch that shows if any systems are in critical or informational statuses. The swatch will also turn gray to indicate a loss of connection to the server.

### Attributes

* `lastCheckDate`: This attribute takes a date value representing the last time the app checked for updates. This value is updated every time a new data set is loaded in the `main` route.

* `noConnection`: This attribute takes a boolean value indicating whether the app can retrieve data from the server. This value is updated every time a new data set is loaded in the `main` route.

* `model`: This attribute takes the collection of currently loaded systems.

### Actions

* `refresh`: This action should map to one that forces the `main` route to reload the system data from the server.

Example:
```
{{overall-summary
  lastCheckDate=lastCheckDate
  noConnection=noConnection
  model=model
  refresh="refresh"
}}
```
