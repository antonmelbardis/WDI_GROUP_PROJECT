angular
.module('WDI_Group_Project')
.controller('AllotmentProfileCtrl', AllotmentProfileCtrl);


AllotmentProfileCtrl.$inject = ['Allotment', '$state', '$stateParams', 'CurrentUserService'];
function AllotmentProfileCtrl(Allotment, $state, $stateParams, CurrentUserService) {
  const vm = this;

  vm.allotmentId       = $stateParams.id;
  vm.user              = CurrentUserService.currentUser;
  vm.addToMyAllotment  = addToMyAllotment;
  vm.checkSaveState    = checkSaveState;

  vm.selectedAllotment = Allotment.get({ id: $stateParams.id });


  function checkSaveState() {
    if (vm.user.allotments.indexOf(vm.selectedAllotment._id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  function addToMyAllotment() {
    Allotment
      .saveAllotment({ id: $stateParams.id, userId: vm.user._id })
      .$promise
      .then(() => {
        checkSaveState();
        $state.go('userShow', { id: vm.user._id });
      });
  }
}
