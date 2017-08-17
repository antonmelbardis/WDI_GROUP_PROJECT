angular
.module('WDI_Group_Project')
.config(Router);

Router.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider'];
function Router($stateProvider, $locationProvider, $urlRouterProvider){
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: '/js/views/landing.html'
  })
  .state('register', {
    url: '/register',
    templateUrl: '/js/views/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })
  .state('login', {
    url: '/login',
    templateUrl: '/js/views/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
  })
  .state('featured', {
    url: '/featured',
    templateUrl: '/js/views/main-states/featured.html',
    controller: 'FeaturedCtrl',
    controllerAs: 'FeaturedCtrl'
  })
  .state('allotmentProfile', {
    url: '/allotment/:id',
    templateUrl: '/js/views/main-states/allotment-profile.html',
    controller: 'AllotmentProfileCtrl',
    controllerAs: 'AllotmentProfileCtrl'
  })
  .state('cropShow', {
    url: '/crop/:id',
    templateUrl: '/js/views/main-states/crop-show.html',
    controller: 'CropShowCtrl',
    controllerAs: 'CropShowCtrl'
  })
  .state('userShow', {
    url: '/user/:id',
    templateUrl: '/js/views/main-states/profile.html',
    controller: 'UserShowCtrl',
    controllerAs: 'UserShowCtrl'
  });

  $urlRouterProvider.otherwise('/');
}
