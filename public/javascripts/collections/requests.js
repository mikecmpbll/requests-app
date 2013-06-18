define([
  'underscore', 
  'backbone', 
  'models/request',
  'collections/scopes',
  ], function(_, Backbone, Request, ScopesCollection){
  var RequestsCollection = Backbone.Collection.extend({
    initialize: function() {
      this.scopes = ScopesCollection;
      this.scopes.reset(JSON.parse(window.MyApp.bootstrap().scopes));
    },
    model: Request,
    url: "/api/requests",
    comparator: function(request) {
      return -(new Date(request.get("created_at"))).getTime();
    },
    // Filter down the list of all requests that are finished.
    done: function() {
      return this.without.apply(this, this.remaining());
    },
    // Filter down the list to only requests that are still not finished.
    remaining: function() {
      return this.filter(function(request){ return _.isEmpty(request.get('completed_at')); });
    }
  });
  return new RequestsCollection();
});