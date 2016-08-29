/**
 * Created by wu on 2016/8/26.
 */
define("models/article", ["base", "underscore", "backbone", "tools"], function($, _, Backbone, Tools){
    'use strict';
    return Backbone.Model.extend({
        url: "/data/user/101.json",
        defaults: {
            id: "",
            username: "",
            nickname: ""
        }
    });
});