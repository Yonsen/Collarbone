/**
 * Created by wu on 2016/8/26.
 */
define("collections/articles", ["base", "underscore", "backbone", "tools", "models/article"], function($, _, Backbone, Tools, Article){
    'use strict';
    return Backbone.Collection.extend({
        url: "/data/user/list.json",
        model: Article,
        completed: function () {
            return this.where({completed: true});
        },
        remaining: function () {
            return this.where({completed: false});
        },
        nextOrder: function () {
            return this.length ? this.last().get('order') + 1 : 1;
        },
        comparator: 'order'
    });
});