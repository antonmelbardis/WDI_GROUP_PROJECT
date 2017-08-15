angular
.module('WDI_Group_Project')
.controller('UserShowCtrl', UserShowCtrl);

UserShowCtrl.$inject = ['User', '$http', '$stateParams', 'CurrentUserService', '$state', 'Crop', 'Allotment', 'filterFilter', '$scope'];

function UserShowCtrl(User, $http, $stateParams, CurrentUserService, $state, Crop, Allotment, filterFilter, $scope) {
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


  //////////// GET CROPS AND ADD WATCH FOR USER INPUT ////////////
  getCrops();

  function getCrops() {
    $http.get('http://localhost:7000/api/crops')
    .then((res) => {
      vm.crops = res.data;
      startCropWatch();
    });
  }
  function filterCrops() {
    const params = {
      name: vm.cropName
    };
    vm.cropsFiltered = filterFilter(vm.crops, params);
  }
  function startCropWatch() {
    $scope.$watchGroup([
      () => vm.cropName
    ], filterCrops);
  }
}
