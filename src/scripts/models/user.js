/**
 * Created by wu on 2016/8/26.
 */
define("models/user", ["base", "underscore", "backbone", "tools"], function($, _, Backbone, Tools){
    'use strict';
    return Backbone.Model.extend({
        defaults: {
            username: "",
            nickname: ""
        }
    });
});