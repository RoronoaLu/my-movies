(function (angular) {

  // 创建 模块
  var app = angular.module('myJsonpService', [])
  // 创建 服务
  app.service('myService', ['$window',function ($window) {
     this.jsonp = function(url, arg, fun) {

            //创建 script
            var script = $window.document.createElement('script');
            //设置 src 属性
            var querystring = '';
            for (var key in arg) {
                querystring += key + '=' + arg[key] + '&';
            }

            //防止用户名 冲突 
            var funcName = 'myJsonp' + $window.Math.random().toString().substr(2);//substr() 是可以从字符串中可以抽取下下标指定数目的字符

            url += '?' + querystring + 'callback='+funcName;

            $window[funcName] = function (data) {

                fun(data);
            }

            script.src = url;
            //将script 标签 添加到 body 中
            $window.document.body.appendChild(script);
        };
  }])
})(angular)
