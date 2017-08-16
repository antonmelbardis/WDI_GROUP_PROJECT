angular
.module('WDI_Group_Project')
.controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject=['User', 'CurrentUserService', '$state', 'Allotment', 'filterFilter', '$scope'];
function RegisterCtrl(User, CurrentUserService, $state, Allotment, filterFilter, $scope){
  const vm = this;

  vm.register   = register;
  vm.allotments = [];

  function register() {
    User
    .register(vm.user)
    .$promise
    .then(() => {
      CurrentUserService.getUser();
      $state.go('featured');
    });
  }
}
