(function(angular){

    //创建模块 
    var app = angular.module('details',['ngRoute','myJsonpService']);
    
    //配置路由
    app.config(['$routeProvider',function($routeProvider){
        $routeProvider.when('/details/:id',{
            templateUrl:'./details/details.html',
            controller:'detailsController'
        })
    }])

     //创建 控制器
        app.controller('detailsController',[
            '$scope',
            '$routeParams',
            'myService',
            function($scope,$routeParams,myService){
                myService.jsonp('http://api.douban.com//v2/movie/subject/'+$routeParams.id,{},function(data){
                    $scope.data = data;
                    $scope.$apply();
                })
            }
        ])
})(angular)

