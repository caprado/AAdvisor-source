# AAdvisor-source

## Setup
```
npm install
```

Fix issue with web dev locking up when updating.
```
npm install webpack-dev-server@2.x
```

## Component status
Component      |Implemented | ui-fabric-react | Notes
---            | :---:      |:---:            |---
Datepicker     | Yes        | Yes             | beware of the increased size!

## Features
 - ES Modules! every component can be used indivudually. No need to load a huge bundle, just to show ex. a button
 - Styles are automatically loaded and respect theme
 - Font files are not needed. All components uses svgs instead for their icons

 ## Todo
  - Datepicker still leaks a few non-scoped styles for the icons
  - Double async issue on wordpress rest api returns overwrite (component disabled currently)
