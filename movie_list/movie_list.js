;
(function (angular) {

  // 创建模块
  var app = angular.module('movie_list', ['ngRoute', 'myJsonpService']);

  app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/:movieType/:page?', {

      templateUrl: './movie_list/movie_list.html',

      controller: 'movie_listController'
    })
  }])

  app.controller('movie_listController', [
    '$scope',
    '$http',
    '$routeParams',
    '$route',
    'myService',
    function ($scope, $http, $routeParams, $route, myService) {

         $scope.loading = true;//加载动画
      // 每页 多少 条
      $scope.pageSize = 5;
      //
      $scope.page = ($routeParams.page || '1') - 0;

   
      // 从 第几页开始

      var start = ($scope.page - 1) * $scope.pageSize;

      myService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.movieType, {
        start: start,
        count: $scope.pageSize,
        q:$routeParams.q
      }, function (data) {
        $scope.data = data;
        // console.log(data)
        $scope.totalpage =Math.ceil( $scope.data.total / $scope.pageSize);
        //动画消失
         $scope.loading = false;
        $scope.$apply();
      })

      $scope.getPage = function (nowPage) {
        //判断 
        if (nowPage <= 0 || nowPage>$scope.totalpage) {
          return;
        }
        $route.updateParams({
          page: nowPage
        });
      }

      //   $http.get('./movie_list/data.json').then(function(res){
      //     $scope.data = res.data
      //   })
      /*$scope.data = {
        count: 20,
        start: 0,
        total: 43,
        subjects: [
          {
            rating: {
              max: 10,
              average: 7.5,
              stars: '40',
              min: 0
            },
            genres: [
              '动作'
            ],
            title: '战狼2',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1000525/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/39105.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/39105.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/39105.jpg'
                },
                name: '吴京',
                id: '1000525'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1100321/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1415801312.29.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1415801312.29.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1415801312.29.jpg'
                },
                name: '弗兰克·格里罗',
                id: '1100321'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1274840/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1401440361.14.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1401440361.14.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1401440361.14.jpg'
                },
                name: '吴刚',
                id: '1274840'
              }
            ],
            collect_count: 136374,
            original_title: '战狼2',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1000525/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/39105.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/39105.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/39105.jpg'
                },
                name: '吴京',
                id: '1000525'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p2485983612.webp',
              large: 'http://img7.doubanio.com/view/movie_poster_cover/lpst/public/p2485983612.webp',
              medium: 'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2485983612.webp'
            },
            alt: 'https://movie.douban.com/subject/26363254/',
            id: '26363254'
          },
          {
            rating: {
              max: 10,
              average: 0,
              stars: '00',
              min: 0
            },
            genres: [
              '爱情',
              '奇幻'
            ],
            title: '三生三世十里桃花',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1049732/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/38640.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/38640.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/38640.jpg'
                },
                name: '刘亦菲',
                id: '1049732'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1276051/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1435567211.65.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1435567211.65.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1435567211.65.jpg'
                },
                name: '杨洋',
                id: '1276051'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1276171/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1370330521.5.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1370330521.5.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1370330521.5.jpg'
                },
                name: '罗晋',
                id: '1276171'
              }
            ],
            collect_count: 4205,
            original_title: '三生三世十里桃花',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1274347/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/17758.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/17758.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/17758.jpg'
                },
                name: '赵小丁',
                id: '1274347'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1289344/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/45049.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/45049.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/45049.jpg'
                },
                name: '安东尼·拉默里纳拉',
                id: '1289344'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2494279388.webp',
              large: 'http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2494279388.webp',
              medium: 'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2494279388.webp'
            },
            alt: 'https://movie.douban.com/subject/25823277/',
            id: '25823277'
          },
          {
            rating: {
              max: 10,
              average: 0,
              stars: '00',
              min: 0
            },
            genres: [
              '剧情',
              '运动'
            ],
            title: '我是马布里',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1173696/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1501554655.02.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1501554655.02.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1501554655.02.jpg'
                },
                name: '斯蒂芬·马布里',
                id: '1173696'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1028237/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/28356.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/28356.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/28356.jpg'
                },
                name: '吴尊',
                id: '1028237'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1274825/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/21352.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/21352.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/21352.jpg'
                },
                name: '何冰',
                id: '1274825'
              }
            ],
            collect_count: 308,
            original_title: '我是马布里',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1335623/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1382696083.12.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1382696083.12.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1382696083.12.jpg'
                },
                name: '杨子',
                id: '1335623'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2494729086.webp',
              large: 'http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2494729086.webp',
              medium: 'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2494729086.webp'
            },
            alt: 'https://movie.douban.com/subject/25903033/',
            id: '25903033'
          },
          {
            rating: {
              max: 10,
              average: 0,
              stars: '00',
              min: 0
            },
            genres: [
              '剧情',
              '喜剧'
            ],
            title: '谁是球王',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1338185/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1393237473.93.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1393237473.93.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1393237473.93.jpg'
                },
                name: '尹航',
                id: '1338185'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1321741/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1466061885.29.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1466061885.29.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1466061885.29.jpg'
                },
                name: '代旭',
                id: '1321741'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1315443/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1435074101.27.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1435074101.27.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1435074101.27.jpg'
                },
                name: '李晨浩',
                id: '1315443'
              }
            ],
            collect_count: 113,
            original_title: '谁是球王',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1324056/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1495086607.22.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1495086607.22.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1495086607.22.jpg'
                },
                name: '裘仲维',
                id: '1324056'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2494628757.webp',
              large: 'http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2494628757.webp',
              medium: 'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2494628757.webp'
            },
            alt: 'https://movie.douban.com/subject/26958767/',
            id: '26958767'
          },
          {
            rating: {
              max: 10,
              average: 0,
              stars: '00',
              min: 0
            },
            genres: [
              '动画',
              '奇幻',
              '冒险'
            ],
            title: '玩偶奇兵',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1328395/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1496307914.59.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1496307914.59.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1496307914.59.jpg'
                },
                name: '严丽祯',
                id: '1328395'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1326522/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1498555670.36.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1498555670.36.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1498555670.36.jpg'
                },
                name: '李晔',
                id: '1326522'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1374803/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1496307969.11.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1496307969.11.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1496307969.11.jpg'
                },
                name: '王衡',
                id: '1374803'
              }
            ],
            collect_count: 118,
            original_title: '玩偶奇兵',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1374801/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1496307826.17.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1496307826.17.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1496307826.17.jpg'
                },
                name: '申宇',
                id: '1374801'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1336918/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1496307805.39.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1496307805.39.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1496307805.39.jpg'
                },
                name: '黄燕',
                id: '1336918'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p2492765331.webp',
              large: 'http://img7.doubanio.com/view/movie_poster_cover/lpst/public/p2492765331.webp',
              medium: 'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2492765331.webp'
            },
            alt: 'https://movie.douban.com/subject/27026033/',
            id: '27026033'
          },
          {
            rating: {
              max: 10,
              average: 0,
              stars: '00',
              min: 0
            },
            genres: [
              '剧情',
              '历史'
            ],
            title: '建军大业',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1000572/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/43.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/43.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/43.jpg'
                },
                name: '刘烨',
                id: '1000572'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1312699/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1414489207.88.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1414489207.88.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1414489207.88.jpg'
                },
                name: '朱亚文',
                id: '1312699'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1255860/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1415028529.74.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1415028529.74.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1415028529.74.jpg'
                },
                name: '黄志忠',
                id: '1255860'
              }
            ],
            collect_count: 226,
            original_title: '建军大业',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1106979/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1403267018.07.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1403267018.07.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1403267018.07.jpg'
                },
                name: '刘伟强',
                id: '1106979'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2493892158.webp',
              large: 'http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2493892158.webp',
              medium: 'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2493892158.webp'
            },
            alt: 'https://movie.douban.com/subject/26692823/',
            id: '26692823'
          },
          {
            rating: {
              max: 10,
              average: 7,
              stars: '35',
              min: 0
            },
            genres: [
              '喜剧',
              '动画',
              '冒险'
            ],
            title: '神偷奶爸3',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1054391/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/15731.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/15731.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/15731.jpg'
                },
                name: '史蒂夫·卡瑞尔',
                id: '1054391'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1022588/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/24543.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/24543.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/24543.jpg'
                },
                name: '克里斯汀·韦格',
                id: '1022588'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1027229/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/5253.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/5253.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/5253.jpg'
                },
                name: '崔·帕克',
                id: '1027229'
              }
            ],
            collect_count: 84192,
            original_title: 'Despicable Me 3',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1313385/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/51602.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/51602.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/51602.jpg'
                },
                name: '凯尔·巴尔达',
                id: '1313385'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1313061/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1389806916.36.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1389806916.36.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1389806916.36.jpg'
                },
                name: '皮埃尔·科凡',
                id: '1313061'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1365884/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1499651172.02.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1499651172.02.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1499651172.02.jpg'
                },
                name: '埃里克·吉伦',
                id: '1365884'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p2469070974.webp',
              large: 'http://img7.doubanio.com/view/movie_poster_cover/lpst/public/p2469070974.webp',
              medium: 'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2469070974.webp'
            },
            alt: 'https://movie.douban.com/subject/25812712/',
            id: '25812712'
          },
          {
            rating: {
              max: 10,
              average: 5.4,
              stars: '30',
              min: 0
            },
            genres: [
              '喜剧',
              '动画',
              '冒险'
            ],
            title: '大耳朵图图之美食狂想曲',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1317642/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/40719.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/40719.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/40719.jpg'
                },
                name: '潘延',
                id: '1317642'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1321911/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1357876944.24.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1357876944.24.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1357876944.24.jpg'
                },
                name: '范楚绒',
                id: '1321911'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1328393/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1498555461.54.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1498555461.54.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1498555461.54.jpg'
                },
                name: '胡谦',
                id: '1328393'
              }
            ],
            collect_count: 676,
            original_title: '大耳朵图图之美食狂想曲',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1327328/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1381377742.7.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1381377742.7.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1381377742.7.jpg'
                },
                name: '速达',
                id: '1327328'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2490966346.webp',
              large: 'http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2490966346.webp',
              medium: 'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2490966346.webp'
            },
            alt: 'https://movie.douban.com/subject/22232939/',
            id: '22232939'
          },
          {
            rating: {
              max: 10,
              average: 7.6,
              stars: '40',
              min: 0
            },
            genres: [
              '剧情',
              '动作',
              '武侠'
            ],
            title: '绣春刀II：修罗战场',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1077991/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1453574419.48.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1453574419.48.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1453574419.48.jpg'
                },
                name: '张震',
                id: '1077991'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1052359/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/37843.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/37843.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/37843.jpg'
                },
                name: '杨幂',
                id: '1052359'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1274761/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/25943.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/25943.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/25943.jpg'
                },
                name: '张译',
                id: '1274761'
              }
            ],
            collect_count: 97046,
            original_title: '绣春刀II：修罗战场',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1321200/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/50405.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/50405.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/50405.jpg'
                },
                name: '路阳',
                id: '1321200'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2492665487.webp',
              large: 'http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2492665487.webp',
              medium: 'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2492665487.webp'
            },
            alt: 'https://movie.douban.com/subject/26270502/',
            id: '26270502'
          },
          {
            rating: {
              max: 10,
              average: 7.5,
              stars: '40',
              min: 0
            },
            genres: [
              '剧情',
              '喜剧',
              '音乐'
            ],
            title: '闪光少女',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1319376/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1433145556.71.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1433145556.71.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1433145556.71.jpg'
                },
                name: '徐璐',
                id: '1319376'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1354775/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1498308698.86.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1498308698.86.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1498308698.86.jpg'
                },
                name: '彭昱畅',
                id: '1354775'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1375961/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1498314784.03.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1498314784.03.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1498314784.03.jpg'
                },
                name: '刘泳希',
                id: '1375961'
              }
            ],
            collect_count: 24028,
            original_title: '闪光少女',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1375966/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1498315140.44.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1498315140.44.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1498315140.44.jpg'
                },
                name: '王冉',
                id: '1375966'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p2494275431.webp',
              large: 'http://img7.doubanio.com/view/movie_poster_cover/lpst/public/p2494275431.webp',
              medium: 'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2494275431.webp'
            },
            alt: 'https://movie.douban.com/subject/26790961/',
            id: '26790961'
          },
          {
            rating: {
              max: 10,
              average: 0,
              stars: '00',
              min: 0
            },
            genres: [
              '动作',
              '战争',
              '动画'
            ],
            title: '大象林旺之一炮成名',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1326029/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1497931434.53.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1497931434.53.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1497931434.53.jpg'
                },
                name: '宋晓宇',
                id: '1326029'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1375891/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1497931521.94.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1497931521.94.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1497931521.94.jpg'
                },
                name: '李垚',
                id: '1375891'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1375892/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1497931601.49.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1497931601.49.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1497931601.49.jpg'
                },
                name: '徐炜',
                id: '1375892'
              }
            ],
            collect_count: 21,
            original_title: '大象林旺之一炮成名',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1375890/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1498455064.89.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1498455064.89.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1498455064.89.jpg'
                },
                name: '李涛歌',
                id: '1375890'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p2493912545.webp',
              large: 'http://img7.doubanio.com/view/movie_poster_cover/lpst/public/p2493912545.webp',
              medium: 'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2493912545.webp'
            },
            alt: 'https://movie.douban.com/subject/27068480/',
            id: '27068480'
          },
          {
            rating: {
              max: 10,
              average: 0,
              stars: '00',
              min: 0
            },
            genres: [
              '动作',
              '历史',
              '战争'
            ],
            title: '龙之战',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1274585/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/5612.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/5612.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/5612.jpg'
                },
                name: '刘佩琦',
                id: '1274585'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1318973/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1490533079.73.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1490533079.73.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1490533079.73.jpg'
                },
                name: '曹云金',
                id: '1318973'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1342748/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1464930051.83.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1464930051.83.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1464930051.83.jpg'
                },
                name: '罗昱焜',
                id: '1342748'
              }
            ],
            collect_count: 176,
            original_title: '龙之战',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1319184/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/46010.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/46010.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/46010.jpg'
                },
                name: '高峰',
                id: '1319184'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2494840188.webp',
              large: 'http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2494840188.webp',
              medium: 'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2494840188.webp'
            },
            alt: 'https://movie.douban.com/subject/26873799/',
            id: '26873799'
          },
          {
            rating: {
              max: 10,
              average: 8,
              stars: '40',
              min: 0
            },
            genres: [
              '喜剧',
              '动画',
              '奇幻'
            ],
            title: '大护法',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1345276/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1471147748.38.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1471147748.38.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1471147748.38.jpg'
                },
                name: '小连杀',
                id: '1345276'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1343032/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1439298716.36.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1439298716.36.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1439298716.36.jpg'
                },
                name: '图特哈蒙',
                id: '1343032'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1275482/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/32611.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/32611.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/32611.jpg'
                },
                name: '金士杰',
                id: '1275482'
              }
            ],
            collect_count: 99054,
            original_title: '大护法',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1358697/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1493285970.66.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1493285970.66.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1493285970.66.jpg'
                },
                name: '不思凡',
                id: '1358697'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2490948849.webp',
              large: 'http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2490948849.webp',
              medium: 'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2490948849.webp'
            },
            alt: 'https://movie.douban.com/subject/26811587/',
            id: '26811587'
          },
          {
            rating: {
              max: 10,
              average: 5.8,
              stars: '30',
              min: 0
            },
            genres: [
              '动画'
            ],
            title: '豆福传',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1280571/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/10935.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/10935.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/10935.jpg'
                },
                name: '陈佩斯',
                id: '1280571'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1274438/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/32977.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/32977.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/32977.jpg'
                },
                name: '李立群',
                id: '1274438'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1317669/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/40762.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/40762.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/40762.jpg'
                },
                name: '季冠霖',
                id: '1317669'
              }
            ],
            collect_count: 1824,
            original_title: '豆福传',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1354805/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1455949404.39.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1455949404.39.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1455949404.39.jpg'
                },
                name: '邹燚',
                id: '1354805'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p2494279975.webp',
              large: 'http://img7.doubanio.com/view/movie_poster_cover/lpst/public/p2494279975.webp',
              medium: 'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2494279975.webp'
            },
            alt: 'https://movie.douban.com/subject/26705107/',
            id: '26705107'
          },
          {
            rating: {
              max: 10,
              average: 0,
              stars: '00',
              min: 0
            },
            genres: [
              '惊悚',
              '恐怖'
            ],
            title: '诡井',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1349114/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1448033220.72.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1448033220.72.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1448033220.72.jpg'
                },
                name: '彭禺厶',
                id: '1349114'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1371277/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/GgYl_I9a2Iscel_avatar_uploaded1490756493.05.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/GgYl_I9a2Iscel_avatar_uploaded1490756493.05.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/GgYl_I9a2Iscel_avatar_uploaded1490756493.05.jpg'
                },
                name: '王萌',
                id: '1371277'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1329440/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1369633357.44.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1369633357.44.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1369633357.44.jpg'
                },
                name: '周凯文',
                id: '1329440'
              }
            ],
            collect_count: 7,
            original_title: '诡井',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1377598/',
                avatars: {
                  small: 'http://img3.doubanio.com/f/movie/ca527386eb8c4e325611e22dfcb04cc116d6b423/pics/movie/celebrity-default-small.png',
                  large: 'http://img7.doubanio.com/f/movie/63acc16ca6309ef191f0378faf793d1096a3e606/pics/movie/celebrity-default-large.png',
                  medium: 'http://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
                },
                name: '常杨',
                id: '1377598'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2494181189.webp',
              large: 'http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2494181189.webp',
              medium: 'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2494181189.webp'
            },
            alt: 'https://movie.douban.com/subject/27091323/',
            id: '27091323'
          },
          {
            rating: {
              max: 10,
              average: 5.4,
              stars: '30',
              min: 0
            },
            genres: [
              '剧情',
              '动作',
              '奇幻'
            ],
            title: '悟空传',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1013782/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1368156632.65.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1368156632.65.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1368156632.65.jpg'
                },
                name: '彭于晏',
                id: '1013782'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1315861/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1368598869.24.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1368598869.24.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1368598869.24.jpg'
                },
                name: '倪妮',
                id: '1315861'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1041510/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/802.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/802.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/802.jpg'
                },
                name: '余文乐',
                id: '1041510'
              }
            ],
            collect_count: 81351,
            original_title: '悟空传',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1274244/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1387853548.15.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1387853548.15.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1387853548.15.jpg'
                },
                name: '郭子健',
                id: '1274244'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2475060299.webp',
              large: 'http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2475060299.webp',
              medium: 'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2475060299.webp'
            },
            alt: 'https://movie.douban.com/subject/26035290/',
            id: '26035290'
          },
          {
            rating: {
              max: 10,
              average: 6.7,
              stars: '35',
              min: 0
            },
            genres: [
              '剧情'
            ],
            title: '皮绳上的魂',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1362878/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1495517018.67.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1495517018.67.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1495517018.67.jpg'
                },
                name: '金巴',
                id: '1362878'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1376956/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1499769716.36.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1499769716.36.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1499769716.36.jpg'
                },
                name: '曲尼次仁',
                id: '1376956'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1376957/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1499769871.04.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1499769871.04.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1499769871.04.jpg'
                },
                name: '夏诺.扎西敦珠',
                id: '1376957'
              }
            ],
            collect_count: 844,
            original_title: '皮绳上的魂',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1301697/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1356350729.21.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1356350729.21.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1356350729.21.jpg'
                },
                name: '张杨',
                id: '1301697'
              }
            ],
            year: '2016',
            images: {
              small: 'http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p2494811175.webp',
              large: 'http://img7.doubanio.com/view/movie_poster_cover/lpst/public/p2494811175.webp',
              medium: 'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2494811175.webp'
            },
            alt: 'https://movie.douban.com/subject/26177735/',
            id: '26177735'
          },
          {
            rating: {
              max: 10,
              average: 8,
              stars: '40',
              min: 0
            },
            genres: [
              '剧情'
            ],
            title: '深夜食堂2',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1051523/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/20084.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/20084.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/20084.jpg'
                },
                name: '小林薰',
                id: '1051523'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1043635/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/30282.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/30282.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/30282.jpg'
                },
                name: '河井青叶',
                id: '1043635'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1037432/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1433765376.2.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1433765376.2.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1433765376.2.jpg'
                },
                name: '佐藤浩市',
                id: '1037432'
              }
            ],
            collect_count: 19485,
            original_title: '続・深夜食堂',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1291293/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/34872.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/34872.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/34872.jpg'
                },
                name: '松冈锭司',
                id: '1291293'
              }
            ],
            year: '2016',
            images: {
              small: 'http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p2494842674.webp',
              large: 'http://img7.doubanio.com/view/movie_poster_cover/lpst/public/p2494842674.webp',
              medium: 'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2494842674.webp'
            },
            alt: 'https://movie.douban.com/subject/26798437/',
            id: '26798437'
          },
          {
            rating: {
              max: 10,
              average: 0,
              stars: '00',
              min: 0
            },
            genres: [
              '儿童',
              '喜剧',
              '动画'
            ],
            title: '赛尔号大电影6：圣者无敌',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1321912/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/51744.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/51744.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/51744.jpg'
                },
                name: '罗玉婷',
                id: '1321912'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1320013/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1359861027.53.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1359861027.53.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1359861027.53.jpg'
                },
                name: '翟巍',
                id: '1320013'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1332379/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1496308187.65.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1496308187.65.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1496308187.65.jpg'
                },
                name: '王晓彤',
                id: '1332379'
              }
            ],
            collect_count: 20,
            original_title: '赛尔号大电影6：圣者无敌',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1330788/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1500536247.43.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1500536247.43.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1500536247.43.jpg'
                },
                name: '王章俊',
                id: '1330788'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img3.doubanio.com/view/movie_poster_cover/ipst/public/p2475952676.webp',
              large: 'http://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2475952676.webp',
              medium: 'http://img3.doubanio.com/view/movie_poster_cover/spst/public/p2475952676.webp'
            },
            alt: 'https://movie.douban.com/subject/26969037/',
            id: '26969037'
          },
          {
            rating: {
              max: 10,
              average: 5,
              stars: '25',
              min: 0
            },
            genres: [
              '剧情',
              '喜剧'
            ],
            title: '父子雄兵',
            casts: [
              {
                alt: 'https://movie.douban.com/celebrity/1324043/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1490342249.11.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1490342249.11.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1490342249.11.jpg'
                },
                name: '大鹏',
                id: '1324043'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1051526/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1120.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1120.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1120.jpg'
                },
                name: '范伟',
                id: '1051526'
              },
              {
                alt: 'https://movie.douban.com/celebrity/1353578/',
                avatars: {
                  small: 'http://img3.doubanio.com/img/celebrity/small/1458201743.67.jpg',
                  large: 'http://img3.doubanio.com/img/celebrity/large/1458201743.67.jpg',
                  medium: 'http://img3.doubanio.com/img/celebrity/medium/1458201743.67.jpg'
                },
                name: '张天爱',
                id: '1353578'
              }
            ],
            collect_count: 10818,
            original_title: '父子雄兵',
            subtype: 'movie',
            directors: [
              {
                alt: 'https://movie.douban.com/celebrity/1315235/',
                avatars: {
                  small: 'http://img7.doubanio.com/img/celebrity/small/1361009693.81.jpg',
                  large: 'http://img7.doubanio.com/img/celebrity/large/1361009693.81.jpg',
                  medium: 'http://img7.doubanio.com/img/celebrity/medium/1361009693.81.jpg'
                },
                name: '袁卫东',
                id: '1315235'
              }
            ],
            year: '2017',
            images: {
              small: 'http://img7.doubanio.com/view/movie_poster_cover/ipst/public/p2492957074.webp',
              large: 'http://img7.doubanio.com/view/movie_poster_cover/lpst/public/p2492957074.webp',
              medium: 'http://img7.doubanio.com/view/movie_poster_cover/spst/public/p2492957074.webp'
            },
            alt: 'https://movie.douban.com/subject/26898747/',
            id: '26898747'
          }
        ],
        title: '正在上映的电影-北京'
      }
      // console.log($scope.data.subjects)
      var json = JSON.stringify($scope.data.subjects)
      document.write(json)*/
    }
  ])
})(angular)