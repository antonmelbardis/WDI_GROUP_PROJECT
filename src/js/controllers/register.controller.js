angular
.module('WDI_Group_Project')
.controller('RegisterCtrl', RegisterCtrl);

RegisterCtrl.$inject=['User', 'CurrentUserService', '$state'];
function RegisterCtrl(User, CurrentUserService, $state){
  const vm = this;

  vm.toggleRoles = toggleRoles;
  vm.role        = { roles: [] };
  vm.roles       = ['Buyer', 'Seller'];

  function toggleRoles(role1) {
    if (vm.role.roles.indexOf(role1) !== -1) {
      const index = vm.role.roles.indexOf(role1);
      vm.role.roles.splice(index, 1);
    } else {
      vm.role.roles.push(role1);
    }
    console.log(vm.role);
    console.log(vm.user);
  }


  vm.register = register;

  function register() {
    vm.user.role = vm.role.roles;
    User
    .register(vm.user)
    .$promise
    .then(() => {
      CurrentUserService.getUser();
      $state.go('featured');
    });
  }
}
