// Filename: main.js

// Require.js allows us to configure mappings to paths
// as demonstrated below:
require.config({
  paths: {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.10.0/jquery.min',
    jqueryui: '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min',
    underscore: 'libs/underscore',
    backbone: 'libs/backbone',
    text: 'libs/text',
    bootstrap: 'libs/bootstrap.min',
    misc: 'libs/misc',
    moment: 'libs/moment.min'
  },

  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: [ 'jquery' ]
    },
    jqueryui: {
      deps: [ 'jquery' ]
    }
  }

});

require([
  'views/app',
  'collections/requests',
  'bootstrap'
  ], function(AppView, AppCollection){
  var app_view = new AppView({
    collection: AppCollection
  });
});