define([
  'underscore', 
  'backbone', 
  'models/scope'
  ], function(_, Backbone, Scope){
  var ScopesCollection = Backbone.Collection.extend({
    // Reference to this collection's model.
    model: Scope,
    url: "requests/api/scopes"
  });
  return new ScopesCollection();
});