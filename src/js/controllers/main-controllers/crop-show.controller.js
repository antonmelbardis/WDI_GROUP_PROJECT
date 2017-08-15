angular
.module('WDI_Group_Project')
.controller('CropShowCtrl', CropShowCtrl);


CropShowCtrl.$inject = ['Crop', '$stateParams', 'CurrentUserService', '$state'];
function CropShowCtrl(Crop, $stateParams, CurrentUserService, $state) {
  const vm = this;

  vm.cropId         = $stateParams.id;
  vm.user           = CurrentUserService.currentUser;
  vm.addToForSale   = addToForSale;
  vm.checkSaveState = checkSaveState;

  vm.selectedCrop   = Crop.get({ id: $stateParams.id });

  function checkSaveState() {
    if (vm.user.forSale.indexOf(vm.selectedCrop._id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  function addToForSale() {
    Crop
      .saveCrop({ id: $stateParams.id, userId: vm.user._id })
      .$promise
      .then(() => {
        checkSaveState();
        $state.go('userShow', { id: vm.user._id });
      });
  }
}
