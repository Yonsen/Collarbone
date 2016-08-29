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
                //e.preventDefault();
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
        },
        get: function () {
            return Index.$content.html('<div/>').children();
        }
    };
    Index.init();
    var Router = Backbone.Router.extend({
        initialize: function () {
            console.log("Route initialize");
        },
        routes: {
            "": "index",
            "user": "userList",
            "user/:101": "userForm",
            "article": "articleList",
            "article/:101": "articleForm",
            "search/:query": "search", // #search/kiwis
            "search/:query/p:page": "search" // #search/kiwis/p7
        },
        userList: function() {
            var $cont = Index.get();
            require(["views/user/list"], function (UserListView) {
                $cont.html(new UserListView({
                    el: $cont
                }).el);
            });
        },
        userForm: function(id) {
            var $cont = Index.get();
            require(["views/user/form"], function (UserFormView) {
                $cont.html(new UserFormView({
                    id: id,
                    el: $cont
                }).el);
            });
        },
        articleList: function() {
            var $cont = Index.get();
            require(["views/article/list"], function (ArticleListView) {
                $cont.html(new ArticleListView({
                    el: $cont
                }).el);
            });
        },
        articleForm: function(id) {
            var $cont = Index.get();
            require(["views/article/form"], function (ArticleFormView) {
                $cont.html(new ArticleFormView({
                    id: id,
                    el: $cont
                }).el);
            });
        },
        search: function(query, page) {debugger
        }
    });
    new Router();
    Backbone.history.start();
});