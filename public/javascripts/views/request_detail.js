define([
  'jquery',
  'underscore', 
  'backbone',
  'text!templates/request_detail.html'
  ], function($, _, Backbone, requestDetailTemplate){
  var RequestDetailView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template(requestDetailTemplate),
    events: {
      // todo..
    },
    initialize: function() {
      // this.listenTo(this.model, 'change', this.render);
    },
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
  return RequestDetailView;
});