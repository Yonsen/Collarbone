/**
 * Created by wu on 2016/8/26.
 */
define("views/user/form", ["base", "underscore", "backbone", "tools", "text!/pages/user/list.html"], function($, _, Backbone, Tools, tmpl){
    'use strict';
    return Backbone.View.extend({
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            /*'keypress .new-todo': 'createOnEnter',
            'click .clear-completed': 'clearCompleted',
            'click .toggle-all': 'toggleAllComplete'*/
        },
        initialize: function () {
            this.$list = this.$(".user-list");
            this.template = _.template(this.$list.html());

            this.listenTo(this.list, "add", this.addOne);
            this.listenTo(this.list, "reset", this.addAll);
            /*this.listenTo(this.list, "change:completed", this.filterOne);
            this.listenTo(this.list, "filter", this.filterAll);
            this.listenTo(this.list, "all", _.debounce(this.render, 0));*/

            // Suppresses 'add' events with {reset: true} and prevents the app view
            // from being re-rendered for every model. Only renders when the 'reset'
            // event is triggered at the end of the fetch.
            this.list.fetch({reset: true});
        },
        render: function() {
            this.$list.html(this.template(this.model.attributes));
            return this;
        },
        addOne: function (model) {
            var view = new app.TodoView({ model: model });
            this.$list.append(view.render().el);
        },
        addAll: function () {
            this.$list.html("");
            this.list.each(this.addOne, this);
        }
    });
});