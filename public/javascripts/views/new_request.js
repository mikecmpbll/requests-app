define([
  'jquery',
  'underscore', 
  'backbone',
  'text!templates/new_request.html'
  ], function($, _, Backbone, newRequestTemplate){
  var NewRequestView = Backbone.View.extend({
    id: "new-request",
    template: _.template(newRequestTemplate),
    events: {
      'submit #new-request-form': 'createNewRequest'
    },
    initialize: function() {
      this.$el.hide();
    },
    render: function() {
      this.$el.html(this.template({ scopes: this.collection.scopes }))
      return this;
    },
    createNewRequest: function(e) {
      e.preventDefault();
      form = e.currentTarget;
      this.collection.create($(form).serializeObject());
      $("button.new-request").click();
      $("#new-request-form")[0].reset();
    }
  });
  return NewRequestView;
});