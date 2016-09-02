"use strict";
/**
 * @fileOverview 复选框操作类
 */
define("utils/checkbox", ["base", "utils/mediator"], function($, Mediator){
    /**
     * 弹出框基础类
     * @summary 弹出框基础类
     * @namespace Utils.Checkbox
     * @author Woo
     * @version 1.0
     * @since 2016/8/30
     * @param {String} name 必选，复选框name
     * @param {Object} cont 所在容器
     * @constructor
     */
    function Checkbox(name, cont) {
        if(name) this.init(name, cont);
    }
    Checkbox.prototype = {
        /**
         * 初始化
         * @param options
         */
        init: function (name, cont) {
            var _this = this;
            _this.name = name; //复选框name
            _this.nameAll = name + "-all"; //全选框name
            _this.checkbox = "input[type='checkbox'][name='"+_this.name+"']"; //复选框选择器
            _this.checkAll = "input[type='checkbox'][name='"+_this.nameAll+"']"; //全选框选择器
            _this.$cont = $(cont||"body");
            _this.events();
        },
        /**
         * 是否全部选中
         * @returns {boolean}
         */
        hasCheckAll: function () {
            var _this = this;
            var $inputs = $(_this.checkbox, _this.$cont),
                count = $inputs.length,
                checked = 0;
            _this.values = [];
            $inputs.each(function (i, el) {
                if(el.checked){
                    _this.values.push($.trim(el.value));
                    checked++;
                }
            });
            return count==checked;
        },
        /**
         * 事件
         */
        events: function () {
            var _this = this;
            _this.$cont.on("change", _this.checkbox, function (e) {debugger
                var checked = _this.hasCheckAll();
                $(_this.checkAll, _this.$cont).each(function (i, el) {
                    if(el.checked != checked){
                        el.checked = checked;
                        $(el).parent().toggleClass("checked");
                        _this.trigger("change.all", el, checked);
                    }
                });
                $(this).parent().toggleClass("checked");
                _this.trigger("change", this, this.checked);
                console.log(_this.values);
            });
            _this.$cont.on("change", _this.checkAll, function (e) {
                var checked = this.checked;
                $(_this.checkbox, _this.$cont).each(function (i, el) {
                    if(el.checked != checked){
                        el.checked = checked;
                        $(el).parent().toggleClass("checked");
                        _this.trigger("change", el, checked);
                    }
                });
                $(this).parent().toggleClass("checked");
                _this.trigger("change.all", this, checked);
                console.log(_this.values);
            });
        }
    };
    //让Popover具备事件功能
    Mediator.installTo(Checkbox.prototype);
    return function(options){
        return new Checkbox(options);
    };
});