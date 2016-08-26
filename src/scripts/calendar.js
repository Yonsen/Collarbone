/**
 * Created by wu on 2016/8/25.
 */
;(function(window, document, undefined){
    function Calendar(options){
        var _this = this;
        var date = new Date();
        _this.year = date.getFullYear();
        _this.month = date.getMonth()+1;
        _this.day = date.getDate();
        _this.today = _this.year+'-'+_this.month+'-'+_this.day;
        _this.format = 'YYYY年MM月';
        _this.bars = ['日','一','二','三','四','五','六'];
        _this.days = [0,31,28,31,30,31,30,31,31,30,31,30,31];
        _this.years = [
            ['癸','甲','乙','丙','丁','戊','己','庚','辛','壬']
            ,['亥','子','丑','寅','卯','辰','巳','午','未','申','酉','戌']
            ,['猪','鼠','牛','虎','兔','龙','蛇','马','羊','猴','鸡','狗']
        ];
        var dom = document.getElementById(options.container);
        if(!dom)return;
        _this.dom = dom;
        _this.init();
    }
    Calendar.prototype = {
        init: function(){
            var _this = this;
            _this.head = document.createElement('div');
            _this.head.className = 'head';

            var prev = document.createElement('span');
            prev.className = 'prev_month';
            _this.prevmonth = document.createElement('a');
            _this.prevmonth.href = 'javascript:;';
            _this.prevmonth.title = '上一月';
            prev.appendChild(_this.prevmonth);
            _this.prevmonth.onclick = function(o){
                return function(e){
                    _this.prevMonth.call(o, e);
                }
            }(_this);
            _this.head.appendChild(prev);

            _this.yearmonth = document.createElement('span');
            _this.yearmonth.className = 'year_month';
            _this.head.appendChild(_this.yearmonth);

            var next = document.createElement('span');
            next.className = 'next_month';
            _this.nextmonth = document.createElement('a');
            _this.nextmonth.href = 'javascript:;';
            _this.nextmonth.title = '下一月';
            next.appendChild(_this.nextmonth);
            _this.nextmonth.onclick = function(o){
                return function(e){
                    _this.nextMonth.call(o, e);
                }
            }(_this);
            _this.head.appendChild(next);

            _this.dom.appendChild(_this.head);

            var bars = document.createElement('div');
            bars.className = 'cbar';
            var htmls = [];
            for(var i=0; i<7; i++){
                htmls.push('<span>'+_this.bars[i]+'</span>');
            }
            bars.innerHTML = htmls.join('');
            _this.dom.appendChild(bars);

            _this.body = document.createElement('div');
            _this.body.className = 'body';
            _this.dom.appendChild(_this.body);

            _this.bind();
        }
        ,bind: function(){
            var _this = this;
            if((_this.year%4==0&&_this.year%100!=0)||_this.year%400==0){
                _this.days[2] = 29;
            };
            var day = _this.days[_this.month];

            //农历年份的计算：公历年份数减3，除以 10 的余数是天干，除以12 的余数是地支
            _this._year = _this.years[0][(_this.year-3)%10];
            _this._year += _this.years[1][(_this.year-3)%12];

            _this.yearmonth.innerHTML = _this.format.replace(/YYYY/,_this.year).replace(/MM/,_this.month) + '（'+_this._year+'年）';
            var htmls = [];
            var date = new Date('YYYY-MM-DD'.replace(/YYYY/,_this.year).replace(/MM/,_this.month).replace(/DD/,1));
            var week = date.getDay();
            if(week>0){
                var _day = _this.days[(_this.month-1)||12];
                for(var a=_day-week+1; a<=_day; a++){
                    htmls.push('<span class="dis"><a href="javascript:;">'+a+'</a></span>');
                }
            }
            for(var b=1; b<=day; b++){
                if(_this.today == _this.year+'-'+_this.month+'-'+b){
                    htmls.push('<span class="sel"><a href="javascript:;" title="'+_this.getLunar(_this.year, _this.month, b)+'">'+b+'</a></span>');
                }else{
                    htmls.push('<span><a href="javascript:;" title="'+_this.getLunar(_this.year, _this.month, b)+'">'+b+'</a></span>');
                }
            }
            if(htmls.length<42){
                var len = htmls.length;
                for(var c=1; c<=42-len; c++){
                    htmls.push('<span class="dis"><a href="javascript:;">'+c+'</a></span>');
                }
            }
            _this.body.innerHTML = htmls.join('');
        }
        ,getLunar: function(year, month, day){//农历
            var _this = this;
            //设：公元年数－1977（或1901）＝4Q＋R
            //则：阴历日期=14Q+10.6(R+1)+年内日期序数-29.5n （注:式中Q、R、n均为自然数，R<4）
            //例：1994年5月7日的阴历日期为：
            //1994－1977＝17＝4×4＋1
            //故：Q＝4，R＝1 则：5月7日的阴历日期为：
            //14×4+10.6(1+1)+(31+28+31+31+7)-29.5n
            //=204.2- 29.5n
            //然后用29.5去除204.2得商数6......27.2，6即是n值，余数27即是阴历二十七日。
            var Q = Math.floor((year - 1977)/4);
            var R = (year - 1977)%4;
            var n = day;
            for(var i=1; i<month; i++){
                n += _this.days[i];
            }
            var res = 14*Q + 10.6*(R+1) + day-1;
            var M = Math.floor(res/29.5);
            var D = Math.floor(res%29.5);
            return 'MM-DD'.replace(/MM/,M).replace(/DD/,D)
        }
        ,prevMonth: function(){
            var _this = this;
            if(_this.month>1){
                _this.month--;
            }else{
                _this.year--;
                _this.month = 12;
            }
            _this.bind();
        }
        ,nextMonth: function(){
            var _this = this;
            if(_this.month<12){
                _this.month++;
            }else{
                _this.year++;
                _this.month = 1;
            }
            _this.bind();
        }
    };
    new Calendar({container:'calendar'});
})(window, document);