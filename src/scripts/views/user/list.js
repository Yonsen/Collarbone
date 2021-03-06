/**
 * Created by wu on 2016/8/26.
 */
define("views/user/list", ["base", "underscore", "backbone", "tools", "collections/users", "views/user/detail", "text!/pages/user/list.html"], function($, _, Backbone, Tools, UserList, UserView, tmpl){
    'use strict';
    return Backbone.View.extend({
        models: new UserList(),
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            /*'keypress .new-todo': 'createOnEnter',
            'click .clear-completed': 'clearCompleted',
            'click .toggle-all': 'toggleAllComplete'*/
        },
        initialize: function () {
            var _this = this;
            _this.$el.html(tmpl);
            _this.$models = _this.$(".user-list");
            _this.itemTemplate = _.template(_this.$models.children().html());
            _this.$models.html("");
            _this.template = _.template(_this.$el.html());

            _this.listenTo(_this.models, "add", _this.addOne);
            _this.listenTo(_this.models, "reset", _this.addAll);
            /*this.listenTo(this.list, "change:completed", this.filterOne);
            this.listenTo(this.list, "filter", this.filterAll);
            this.listenTo(this.list, "all", _.debounce(this.render, 0));*/

            // Suppresses 'add' events with {reset: true} and prevents the app view
            // from being re-rendered for every model. Only renders when the 'reset'
            // event is triggered at the end of the fetch.
            _this.models.fetch({reset: true});
            return _this;
        },
        render: function() {
            var _this = this;
            _this.$el.html(_this.template(_this.models));
            _this.$models = _this.$(".user-list");
            return _this;
        },
        addOne: function (model) {
            var _this = this;
            _this.$models.append(new UserView({
                model: model,
                tagName: "tr",
                template: _this.itemTemplate
            }).render().el);
            Tools.tableCheckAll(_this.$el);
            return _this;
        },
        addAll: function () {
            var _this = this;
            _this.render();

            _this.models.each(_this.addOne, this);
            return _this;
        }
    });
});