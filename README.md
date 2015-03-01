# reflux-enquire
Reflux store for listing to changes in media queries

## Install

`npm install require-enquire`

## Registering Media Queries

```javascript
var RefluxEnquireStore = require('reflux-enquire');

// register screen breakpoints for media queries
RefluxEnquireStore.register('sm', 'only screen and (min-width: 48em)');
RefluxEnquireStore.register('md', 'only screen and (min-width: 62em)');
RefluxEnquireStore.register('lg', 'only screen and (min-width: 75em)');

```

## Listening for changes

One way of using this...

```
var React = require('react'),
    Reflux = require('reflux'),
    RefluxEnquireStore = require('reflux-enquire');

// Dashboard
var Dashboard = React.createClass({

  // get screen state
  getInitialState: function(){
    return {
      media: RefluxEnquireStore.getState()
    };
  },

  // add mixins
  mixins: [Reflux.listenTo(RefluxEnquireStore,"onMediaChange")],

  // listen for screen changes
  onMediaChange: function(){
  
    // getState() returns an object with boolean values for each registered media query
    this.setState({
        media: RefluxEnquireStore.getState()
      });
  },
  render: function(){
    
    // using state variable
    if (this.state.media.md) {
      // do something
    } else {
      // do something else
    }

    // more code here
  }
});

```
