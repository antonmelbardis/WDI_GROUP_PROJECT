angular
.module('WDI_Group_Project')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject=['$rootScope', 'CurrentUserService', '$state'];
function MainCtrl($rootScope, CurrentUserService, $state) {
  const vm = this;

  vm.logout = logout;
  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('login');
  });

  function logout() {
    CurrentUserService.removeUser();
  }
}
