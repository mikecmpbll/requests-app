define(['underscore', 'backbone'], function(_, Backbone) {
  var ScopeModel = Backbone.Model.extend({
    // Default attributes for the Request.
    defaults: function() {
      return {
        created_at: new Date()
      }
    },
    show: function() {
      // todo..
    },
    delete: function() {
      this.destroy();
      this.collection.render();
    }
  });
  return ScopeModel;
});