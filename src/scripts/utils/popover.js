"use strict";
/**
 * @fileOverview 弹出框基础类
 */
define("utils/popover", ["base", "utils/drag", "utils/mediator"], function($, Drag, Mediator){
    /**
     * 弹出框基础类
     * @summary 弹出框基础类
     * @namespace Utils.Popover
     * @author Woo
     * @version 1.0
     * @since 2016/8/30
     * @param {Object} options 配置参数
     * @param {Object} options.trigger 触发DOM对象
     * @param {Object} options.target 弹出层DOM对象
     * @constructor
     */
    function Popover(options) {
        this.init(options);
    }
    Popover.prototype = {
        /**
         * 初始化
         * @param options
         */
        init: function (options) {
            var _this = this;
            var opts = $.extend({
                style: "", //样式
                width: "", //宽度
                height: "", //高度
                title: "", //标题
                content: "", //内容
                isShadowClose: true, //点击阴影区域是否关闭弹出框
                isClose: true, //是否展示关闭按钮
                isHide: false, //是否为显示隐藏
                ok: "", //确认按钮文字
                no: "" //取消按钮文字
            }, options||{});
            _this.opts = opts;
            if($("#" + opts.id).length)return;
            _this.$dom = $(opts.target);
            if(!_this.$dom.length){
                _this.$dom = $('<div id="'+opts.id+'" class="popover '+opts.style+'"></div>');
                _this.$shadow = $('<div class="popover-shadow"></div>').appendTo(_this.$dom);
                _this.$panel = $('<div class="popover-panel"></div>');
                if(opts.title){ //显示标题
                    _this.$head = $('<div class="popover-head"></div>');
                    if(opts.isClose){ //显示关闭按钮
                        _this.$close = $('<i class="fa fa-close fr" title="关闭"></i>');
                        _this.$head.append(_this.$close);
                    }
                    _this.$title = $('<h3 class="popover-title">'+opts.title+'</h3>');
                    _this.$head.append(_this.$title);
                    _this.$panel.append(_this.$head);
                }
                _this.$body = $('<div class="popover-body">'+opts.content+'</div>');
                _this.$panel.append(_this.$body);
                if(opts.ok){ //显示确认按钮
                    _this.$ok = $('<a class="col btn btn-primary" href="javascript:;">' + opts.ok + '</a>');
                }
                if(opts.no){ //显示取消按钮
                    _this.$no = $('<a class="col btn btn-default" href="javascript:;">' + opts.no + '</a>');
                }
                if(_this.$ok || _this.$no){
                    _this.$foot = $('<div class="popover-foot row"></div>');
                    _this.$foot.append(_this.$no);
                    _this.$foot.append(_this.$ok);
                    _this.$panel.append(_this.$foot);
                }
                _this.$dom.append(_this.$panel);
                $(document.body).append(_this.$dom);
            }else{
                opts.isHide = true;
                _this.$panel = $(".popover-panel", _this.$dom);
                _this.$shadow = $(".popover-shadow", _this.$dom);
                _this.$head = $(".popover-head", _this.$panel);
                _this.$close = $(".fa-close", _this.$head);
                _this.$title = $(".popover-title", _this.$head);
                _this.$body = $(".popover-body", _this.$panel);
                _this.$foot = $(".popover-foot", _this.$panel);
                _this.$ok = $(".btn-primary", _this.$foot);
                _this.$no = $(".btn-default", _this.$foot);
            }
            opts.zIndex && _this.$dom.css("z-index", opts.zIndex); //设置层级
            _this.$panel.width(opts.width||"auto")
                .height(opts.height||"auto");
            _this.events();
            _this.show();
        },
        /**
         * 显示
         */
        show: function () {
            var _this = this;
            _this.$dom.addClass("popover-open");
            _this.setPosition();
        },
        /**
         * 隐藏
         */
        hide: function () {
            var _this = this;
            _this.$dom.removeClass("popover-open");
            if(!_this.opts.isHide){
                _this.$dom.remove();
            }
        },
        /**
         * 设置位置
         */
        setPosition: function () {
            var _this = this;
            var cw = _this.$dom.width(),
                ch = _this.$dom.height(),
                w = _this.$panel.width(),
                h = _this.$panel.height();
            _this.$panel.css({
                top: Math.max(0, (ch-h)/2),
                left: Math.max(0, (cw-w)/2)
            });
        },
        /**
         * 事件
         */
        events: function () {
            var _this = this;
            _this.$ok && _this.$ok.on("click", function () {
                _this.hide();
                _this.trigger("ok");
            });
            _this.$no && _this.$no.on("click", function () {
                _this.hide();
                _this.trigger("no");
            });
            _this.$close && _this.$close.on("click", function () {
                _this.hide();
                _this.trigger("close");
            });
            _this.opts.isShadowClose && _this.$shadow && _this.$shadow.on("click", function () {
                _this.hide();
                _this.trigger("close");
            });
        }
    };
    //让Popover具备事件功能
    Mediator.installTo(Popover.prototype);
    return function(options){
        return new Popover(options);
    };
});