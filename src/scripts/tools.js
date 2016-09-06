/**
 * Created by wu on 2016/8/26.
 */
define("tools", ["base", "underscore", "utils", "jquery/datetimepicker"], function($, _, Utils){
    'use strict';
    //模板配置
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    };
    //设置日历默认语言
    $.datetimepicker.setLocale("ch");

    Utils.tableCheckAll = function ($cont) {
        var _this = this;
        //Master Checkboxes
        $('thead .checkbox, tfoot .checkbox', $cont).checkbox({
            // check all children
            onChecked: function() {
                $('tbody .checkbox', $cont).checkbox('check');
            },
            // uncheck all children
            onUnchecked: function() {
                $('tbody .checkbox', $cont).checkbox('uncheck');
            }
        });
        //Child Checkboxes
        $('tbody .checkbox', $cont).checkbox({
            // Fire on load to set parent value
            fireOnInit : true,
            // Change parent state on each child checkbox change
            onChange: function() {
                var $checkAll = $('thead .checkbox, tfoot .checkbox', $cont),
                    $checkbox = $('tbody .checkbox', $cont),
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
                    $checkAll.checkbox('set checked');
                } else if(allUnchecked) {
                    $checkAll.checkbox('set unchecked');
                } else {
                    $checkAll.checkbox('set indeterminate');
                }
            }
        });
    };
    return Utils;
});