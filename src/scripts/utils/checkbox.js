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
     * @param {String} cont 复选框容器
     * @param {Object} allCont 全选框容器
     * @constructor
     */
    function Checkbox(cont, allCont) {
        if(cont) this.init(cont, allCont);
    }
    Checkbox.prototype = {
        /**
         * 初始化
         * @param options
         */
        init: function (cont, allCont) {
            var _this = this;
            //Master Checkboxes
            $(allCont+ ' .checkbox').checkbox({
                // check all children
                onChecked: function() {
                    $(cont+ ' .checkbox').checkbox('check');
                },
                // uncheck all children
                onUnchecked: function() {
                    $(cont+ ' .checkbox').checkbox('uncheck');
                }
            });
            //Child Checkboxes
            $(cont+ ' .checkbox').checkbox({
                // Fire on load to set parent value
                fireOnInit : true,
                // Change parent state on each child checkbox change
                onChange: function() {
                    var $parentCheckbox = $(allCont+ ' .checkbox'),
                        $checkbox = $(cont+ ' .checkbox'),
                        allChecked = true,
                        allUnchecked = true;
                    // check to see if all other siblings are checked or unchecked
                    $checkbox.each(function() {
                        if( $(this).checkbox('is checked') ) {
                            allUnchecked = false;
                        } else {
                            allChecked = false;
                        }
                    });
                    // set parent checkbox state, but dont trigger its onChange callback
                    if(allChecked) {
                        $parentCheckbox.checkbox('set checked');
                    } else if(allUnchecked) {
                        $parentCheckbox.checkbox('set unchecked');
                    } else {
                        $parentCheckbox.checkbox('set indeterminate');
                    }
                }
            });
        }
    };
    //让Popover具备事件功能
    Mediator.installTo(Checkbox.prototype);
    return function(cont, allCont){
        return new Checkbox(cont, allCont);
    };
});