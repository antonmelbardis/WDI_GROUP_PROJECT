angular
.module('WDI_Group_Project')
.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function LoginCtrl(User, CurrentUserService, $state) {

  const vm = this;

  vm.login = login;

  function login() {
    User
    .login(vm.user)
    .$promise
    .then(() => {
      CurrentUserService.getUser();
      setTimeout(function() {
        $state.go('featured');
      }, 200);    
    });
  }
}
