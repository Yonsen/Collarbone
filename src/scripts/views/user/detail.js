/**
 * Created by wu on 2016/8/26.
 */
define("views/user/detail", ["base", "underscore", "backbone", "tools"], function($, _, Backbone, Tools){
    'use strict';
    return Backbone.View.extend({
        events: {
            "click .edit": "edit",
            "click .remove": "remove"
        },
        initialize: function (opts) {
            var _this = this;
            _this.template = opts.template;

            _this.listenTo(_this.model, "change", _this.render);
            
            return _this;
        },
        render: function() {
            var _this = this;
            _this.$el.html(_this.template(_this.model.attributes));
            return _this;
        },
        edit: function(e){
            alert("编辑");
        },
        remove: function(e){
            alert("删除");
        }
    });
});