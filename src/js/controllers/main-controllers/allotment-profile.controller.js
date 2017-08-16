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

  Allotment.get({ id: $stateParams.id }, data => {
    vm.selectedAllotment = data;

  });

////////// ADDING ALLOTMENTS TO 'MY-ALLOTMENTS ARRAY' //////////
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
        CurrentUserService.getUser();
        setTimeout(function() {
          $state.go('featured');
        }, 200);
      });

  }
}
