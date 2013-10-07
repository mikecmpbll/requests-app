define([
  'jquery',
  'underscore', 
  'backbone',
  'views/request',
  'views/new_request',
  'misc',
  'jqueryui'
  ], function($, _, Backbone, RequestView, NewRequestView){
	var AppView = Backbone.View.extend({
		el: $("#request-app"),
		events: {
			"click button.new-request": "toggleNewRequestView",
      "change select#filter_scope": "filterByScope"
		},
	  initialize: function() {
      this.listIndexes = new Array();
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.render);
      this.collection.reset(JSON.parse(window.MyApp.bootstrap().requests));
	  },
	  render: function() {
      this.$el.find("#request-list > tbody").empty();
      this.collection.applyFilters().each(function(item) {
        this.addOne(item);
      }, this);
    },
    addOne: function(request) {
      var $collection = this.$el.find("#request-list > tbody"),
          $children = $collection.children();
      var view = new RequestView({model: request});
      var index = this.collection.indexOf(request);

      this.listIndexes.push(index);
      if (this.listIndexes.length == 1) {
        $collection.append(view.render().el);
      } else {
        this.listIndexes.sort(function(a,b){return (a-b)});
        var ins = this.listIndexes.indexOf(index);
        var pos = $children.eq(ins);
        var newTr = view.render().el;
        if (pos.length > 0) {
          $children.eq(ins).before(newTr);
        } else {
          $collection.append(newTr);
        }
      }
    },
    toggleNewRequestView: function(ev) {
      if (!$("#new-request-form").length > 0) {
      	var view = new NewRequestView({collection: this.collection});
      	$(ev.target).after(view.render().el);
        $("#new-request").slideDown(function() {
          $(ev.target).text("Cancel");
          $(ev.target).toggleClass("btn-primary");
        });
      } else {
        $("#new-request").slideToggle(function() {
          $(ev.target).text($(ev.target).text() === "Cancel" ? "New Request" : "Cancel");
          $(ev.target).toggleClass("btn-primary");
        });
      }
    },
    filterByScope: function(ev) {
      if (_.isEmpty($(ev.target).val())) {
        delete this.collection.filters.filterByScope
      } else { this.collection.filters.filterByScope = new Array($(ev.target).val()); }
      console.log(this.collection.filters.filterByScope);
      this.render();
    }
	});
	return AppView;
});