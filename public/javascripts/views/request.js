define([
  'jquery',
  'underscore', 
  'backbone',
  'views/request_detail',
  'text!templates/request.html',
  'moment'
  ], function($, _, Backbone, RequestDetailView, requestTemplate){
  var RequestView = Backbone.View.extend({
    tagName: "tr",
    template: _.template(requestTemplate),
    events: {
      "click": "toggleDetail",
      "click .delete": "deleteRequest"
      // "click .done": "deleteRequest"
    },
    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.detailView = new RequestDetailView({model: this.model});
    },
    render: function() {
      this.$el.html(this.template(_.extend(this.model.toJSON(), {scope: this.model.scope.toJSON()})));
      return this;
    },
    toggleDetail: function(e) {
      // You'll never actually click on the tr, because it's chokka with tds
      // so we check for a click event on it's immediate children.
      if(e.target.parentNode == this.el) {
        if (this.detailView.$el.closest("html").length == 0) {
          this.$el.after(this.detailView.render().el);
        } else {
          this.detailView.remove();
        }
      }
    },
    deleteRequest: function(e) {
      e.stopPropagation();
      var r=confirm("Are you sure?");
      if (r==true) {
        this.model.delete();
        self = this;
        this.$el.find('td').wrapInner('<div/>').parent()
            .find('td > div').slideUp(400, function() {
          $(this).parent().parent().remove();
          self.remove();
        });
        this.detailView.remove();
      }
    }
  });
  return RequestView;
});