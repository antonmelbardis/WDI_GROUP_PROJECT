angular
.module('WDI_Group_Project')
.controller('UserShowCtrl', UserShowCtrl);

UserShowCtrl.$inject = ['User', '$http', '$stateParams', 'CurrentUserService', '$state', 'Crop', 'Allotment'];

function UserShowCtrl(User, $http, $stateParams, CurrentUserService, $state, Crop, Allotment) {
  const vm = this;

  vm.user = CurrentUserService.currentUser;
  vm.forSale = vm.user.forSale;
  vm.allotments = vm.user.allotments;

  // for(let i = 0; i < vm.forSale.length; i++) {
  //   vm.crop[i] = Crop.get({ id: });
  //   console.log(vm.crop[i]);
  // }

  // console.log(vm.forSale);
  // console.log(vm.allotments);

}
