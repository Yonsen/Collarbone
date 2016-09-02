/**
 * Created by wu on 2016/8/22.
 */
require(["base", "underscore", "backbone", "tools"], function($, _, Backbone, Tools){
    'use strict';
    var Index = {
        $header: $("#header"),
        $menu: $("#menu"),
        $wrapper: $("#wrapper"),
        $content: $("#content"),
        init: function () {
            var _this = this;
            _this.reset();
            _this.events();
        },
        reset: function () {
            var _this = this;
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
            "user/form/:id": "userForm",
            "user/detail/:id": "userDetail",
            "article": "articleList",
            "article/form/:id": "articleForm",
            "article/detail/:id": "articleDetail",
            "search/:query": "search", // #search/kiwis
            "search/:query/p:page": "search" // #search/kiwis/p7
        },
        loadPage: function (viewName, id) {
            var $cont = Index.get(),
                param = {
                    el: $cont
                };
            if(id) param.id = id;
            require(["views/" + viewName], function (View) {
                $cont.html(new View(param).el);
            });
        },
        userList: function() {
            this.loadPage("user/list");
        },
        userForm: function(id) {
            this.loadPage("user/form", id);
        },
        userDetail: function(id) {
            this.loadPage("user/detail", id);
        },
        articleList: function() {
            this.loadPage("article/list");
        },
        articleForm: function(id) {
            this.loadPage("article/form", id);
        },
        articleDetail: function(id) {
            this.loadPage("article/detail", id);
        },
        search: function(query, page) {debugger
        }
    });
    new Router();
    Backbone.history.start();
});