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
    controllerAs: 'featured'
  });

  $urlRouterProvider.otherwise('/');
}
