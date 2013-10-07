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
      this.filters = { remaining: null };
    },
    model: Request,
    url: "/api/requests",
    comparator: function(request) {
      return -(new Date(request.get("created_at"))).getTime();
    },
    // Filter down the list of all requests that are finished.
    done: function() {
      return new RequestsCollection(this.without.apply(this, this.remaining()));
    },
    // Filter down the list to only requests that are not finished.
    remaining: function() {
      return new RequestsCollection(this.filter(function(r){ return _.isEmpty(r.get('completed_at')) }));
    },
    // Filter the list by scope
    filterByScope: function(scopes) {
      return new RequestsCollection(this.filter(function(r){ return _.contains(scopes, r.scope.get('id').toString()) }));
    },
    applyFilters: function() {
      var filtered = this;
      for (var key in this.filters) {
        if (this.filters.hasOwnProperty(key)) {
          filtered = filtered[key](this.filters[key]);
        }
      }
      return filtered
    }
  });
  return new RequestsCollection();
});