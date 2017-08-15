angular
.module('WDI_Group_Project')
.controller('AllotmentProfileCtrl', AllotmentProfileCtrl);


AllotmentProfileCtrl.$inject = ['Allotments', '$http', '$stateParams', 'CurrentUserService'];
function AllotmentProfileCtrl(Allotments, $http, $stateParams, CurrentUserService) {
  const vm = this;

  vm.allotmentId = vm.get($stateParams);



}
