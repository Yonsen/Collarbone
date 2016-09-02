define("utils", ["utils/base", "libs/md5", "libs/sha1", "libs/base64", "utils/mediator", "utils/transfer", "utils/format", "utils/date", "utils/array", "utils/number", "utils/json", "utils/cookie", "utils/dom", "utils/drag", "utils/popover", "utils/checkbox", "utils/storage"], function(Base){
   var args = Base._SLICE.call(arguments, 1),
        Utils = Base.extend(Base, {
            MD5: args.shift(),
            SHA1: args.shift(),
            Base64: args.shift(),
            Mediator: args.shift(),
            Transfer: args.shift(),
            Format: args.shift(),
            Date: args.shift(),
            Array: args.shift(),
            Number: args.shift(),
            JSON: args.shift(),
            Cookie: args.shift(),
            DOM: args.shift(),
            Drag: args.shift(),
            Popover:  args.shift(),
            Checkbox:  args.shift(),
            Storage: args.shift()
        });
    Utils.Base64.raw = false;
    Utils.Base64.utf8decode = true;
    /**
     * 获取URL中“?”之后的指定参数
     * @method getQueryString
     * @param {String} [name] 必选，指定参数的KEY
     * @returns {String} 指定的参数值
     */
    Utils.getQueryString = function(name){
        return Utils.Transfer.decodeHashString(location.search.replace(/^\?+/, ""))[name];
    };
    /**
     * 获取URL中“?”之后的所有参数
     * @method getRequest
     * @param {String} [str] 可选，Hash对象，location.search 或 location.hash
     * @param {String} [sign=&] 可选，默认“&”，键值对分隔符
     * @param {String} [flag==] 可选，默认“=”，键值分隔符
     * @returns {Object} 所有参数
     */
    Utils.getRequest = function(str, sign, flag){
        str = (str||location.search).replace(/^\?|\#+/, ""); //获取url中'?'符后的字符串
        return Utils.Transfer.decodeHashString(str, sign, flag);
    };
    /**
     * 确认框
     * @method cfm
     * @param {String} [text] 必选，要显示的文字
     * @returns {Object} 弹出框对象
     */
    Utils.cfm = window.confirm = function(text){
        return Utils.Popover({
            id: "popover-cfm",
            style: "popover-cfm",
            width: 480,
            title: "温馨提示",
            content: text,
            isShadowClose: false,
            ok: "确认",
            no: "取消"
        });
    };
    /**
     * 提示框
     * @method alt
     * @param {Object} [opts] 必选，弹出框配置选项
     * @returns {Object} 弹出框对象
     */
    Utils.alt = window.alert = function(opts){
        opts = Base.extend({
            id: "popover-alt",
            style: "popover-alt",
            icon: "fa-times-circle",
            width: 480,
            title: "温馨提示",
            isShadowClose: false,
            no: "关闭"
        }, opts);
        opts.content = '<dl class="row"><dt class="col"><i class="fa '+opts.icon+'"></i></dt><dd class="col">'+opts.content+'</dd></dl>';
        return Utils.Popover(opts);
    };
    /**
     * 成功提示框
     * @method suc
     * @param {String} [text] 必选，要显示的文字
     * @returns {Object} 弹出框对象
     */
    Utils.suc = window.confirm = function(text){
        return Utils.alt({
            id: "popover-suc",
            style: "popover-suc",
            icon: "fa-check-circle",
            content: text,
            ok: "确认"
        });
    };
    /**
     * 信息提示框
     * @method suc
     * @param {String} [text] 必选，要显示的文字
     * @returns {Object} 弹出框对象
     */
    Utils.msg = function(text){
        return Utils.alt({
            id: "popover-msg",
            style: "popover-msg",
            icon: "fa-exclamation-circle",
            content: text,
            ok: "确认"
        });
    };
    /**
     * 错误提示框
     * @method err
     * @param {String} [text] 必选，要显示的文字
     * @returns {Object} 弹出框对象
     */
    Utils.err = function(text){
        return Utils.alt({
            id: "popover-err",
            style: "popover-err",
            icon: "fa-times-circle",
            content: text,
            ok: "确认"
        });
    };
    return Utils;
});