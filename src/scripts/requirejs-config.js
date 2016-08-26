/**
 * Created by wu on 2016/8/26.
 */
requirejs.config({
    // 调试模式
    debug: true,
    // 文件版本
    urlArgs: "v=1",
    // Sea.js 的基础路径
    baseUrl: "/scripts/",
    // 模块配置
    paths: {
        "jquery": "libs/jquery-3.1.0.min",
        "backbone": "libs/backbone-1.3.3.min",
        "underscore": "libs/underscore-1.8.3.min"
    },
    //配置别名
    map: {
        "*": {
            "base": "jquery"
        }
    },
    //配置非AMD模块
    shim: {
        "backbone": {
            deps: ["underscore", "base"],
            exports: "Backbone"
        },
        "underscore": {
            exports: "_"
        }
    },
    //注入配置信息
    /*config: {
        "tools": {
            config: {
                v: 1
            }
        }
    },*/
    // 文件类型
    scriptType: "text/javascript",
    // 超时时间，默认7秒。
    waitSeconds: 30
});