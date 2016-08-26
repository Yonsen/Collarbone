/**
 * Created by wu on 2016/8/26.
 */
define("collections/users", ["base", "underscore", "backbone", "tools", "models/user"], function($, _, Backbone, Tools, User){
    'use strict';
    return Backbone.Collection.extend({
        model: User,
        localStorage: new Backbone.LocalStorage('todos-backbone'),
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