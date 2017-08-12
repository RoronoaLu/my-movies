(function(angular){

    //创建模块
    var app = angular.module('home',['ngRoute']);
    //创建 路由
    app.config(['$routeProvider',function($routeProvider){

        $routeProvider.when('/home_page',{

            templateUrl:'./home/home.html',
            controller:'homeController'
        })
       
    }])
    //创建控制器 
    app.controller('homeController',['$scope',function($scope){

    }])

})(angular)