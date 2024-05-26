# Upmind Technical Test Documentation

The focus is on structuring and managing the form's functionality to ensure it is responsive, scalable, and maintainable.

## Assumptions

- Vue-router not included in project dependencies, as no route changes required.
- Pinia or alternative store not included in project dependencies, as data is unlikely to be passed along more than 3/4 component levels.

## Approach

### Dynamic Form

The dynamic form receives an array of fields via props in the form of a class. The Field class will determine the type, appearance, formatting, and validations of the provided field.

### Inputs

Inputs are componentized depending on the type of data that is required. These individual components allows us to capture, format and validate the data with the correct and suitable approach depending on the data type.

Text, password and date input types are be bundled together into a single component as this will allow for sufficient customization in most use cases.

The select and checkbox inputs will be placed into their own individual components as they do not have much in common in comparison to the other input components.

### Internationalization (i18n)

Internationalization will be provided at the highest-level during the field definitions, which will pass down into the dynamic form. Reactivity for the field definitions will be required to allow the languages properties such as label and validation messages to be changed dynamically.

## Setting up the Project

### 1. Install the dependancies

```sh
npm install
```

### 2. Compile and Hot-Reload for Development

```sh
npm run dev
```

### 2. Open in Browser

```sh
http://localhost:5173/
```
