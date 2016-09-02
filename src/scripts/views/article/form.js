/**
 * Created by wu on 2016/8/26.
 */
define('views/article/form', ['base', 'underscore', 'backbone', 'tools', 'models/article', 'text!/pages/article/form.html'], function($, _, Backbone, Tools, Article, tmpl){
    'use strict';
    return Backbone.View.extend({
        ue: UE.getEditor('editor'),
        template: _.template(tmpl),
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            /*'keypress .new-todo': 'createOnEnter',
            'click .clear-completed': 'clearCompleted',
            'click .toggle-all': 'toggleAllComplete'*/
        },
        initialize: function (opts) {
            var _this = this;

            _this.model = new Article({id: opts.id});

            _this.listenTo(_this.model, 'change', _this.render);
            _this.listenTo(_this.model, 'reset', _this.render);

            _this.model.fetch({reset: true});
        },
        render: function() {
            var _this = this;
            _this.$el.html(_this.template(_this.model.attributes));
            $('select.dropdown').dropdown();
            $('.ui.checkbox').checkbox();
            $('.ui.form').form({
                fields : validationRules,
                inline : true,
                on     : 'blur'
            });
            return _this;
        }
    });
});