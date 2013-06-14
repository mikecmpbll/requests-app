define([
  'underscore',
  'backbone'
  ], function(_, Backbone) {
  var RequestModel = Backbone.Model.extend({
    initialize: function() {
      this.scope = this.collection.scopes.get(this.get('scope_id'));
    },
    // Default attributes for the Request.
    defaults: function() {
      return {
        created_at: new Date()
      };
    },
    delete: function() {
      this.destroy();
    },
    markAsDone: function() {
      this.save({completed_at: new Date()});
    }
  });
  return RequestModel;
});