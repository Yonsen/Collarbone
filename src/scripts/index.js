/**
 * Created by wu on 2016/8/22.
 */
require(["base", "underscore", "backbone", "tools"], function($, _, Backbone, Tools){
    'use strict';
    var Index = {
        $header: $("#header"),
        $footer: $("#footer"),
        $menu: $("#menu"),
        $main: $("#main"),
        $content: $("#content"),
        init: function () {
            var _this = this;
            _this.reset();
            _this.events();
        },
        reset: function () {
            var _this = this,
                wh = $(window).height(); //窗口高度
            _this.$main.css("min-height", wh);
        },
        events: function () {
            var _this = this;
            _this.$menu.on("click.a", "a", function (e) {
                e.preventDefault();
                var $this = $(this),
                    $li = $this.closest("li"),
                    $ul = $this.next("ul");
                if($ul.length){ //有子菜单
                    if($li.hasClass("open")){ //已展开
                        $li.removeClass("open");
                        $(".fa.fr", $this).toggleClass("fa-caret-down fa-caret-right");
                        $li.stop(true, true).animate({
                            height: $this.height()
                        }, 300);
                    }else{
                        $li.addClass("open");
                        $(".fa.fr", $this).toggleClass("fa-caret-down fa-caret-right");
                        $li.stop(true, true).animate({
                            height: $this.height() + $ul.outerHeight(true)
                        }, 300);
                    }
                }else{
                    $("a.selected", _this.$menu).removeClass("selected");
                    $this.addClass("selected");
                }
            });
            $(window).on("resize", function (e) {
                _this.reset();
            });
        }
    };
    Index.init();
});