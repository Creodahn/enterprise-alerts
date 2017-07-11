# text-box

This component provides a nicely formatted textarea with an included label. The textarea is disabled, so the user cannot enter text into it. Instead, it is used to display values retrieved from the data service.

### Attributes

* `label`: This takes a value that should appear as the label for the textarea

* `value`: This takes a value that represents the value displayed inside the textarea

Example:
```
{{text-box
  label="Detail"
  value=model.detail
}}
```
