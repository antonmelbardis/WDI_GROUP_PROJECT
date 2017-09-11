angular
.module('WDI_Group_Project')
.controller('UserShowCtrl', UserShowCtrl);

UserShowCtrl.$inject = ['User', '$http', '$stateParams', 'CurrentUserService', '$state', 'Crop', 'Allotment', 'filterFilter', '$scope'];

function UserShowCtrl(User, $http, $stateParams, CurrentUserService, $state, Crop, Allotment, filterFilter, $scope) {
  const vm = this;

  vm.user = CurrentUserService.currentUser;
  vm.cropArray = [];
  vm.allotmentArray = [];
  vm.seller = $stateParams.id;
  vm.cropDelete = cropDelete;

  vm.goBack = goBack;
  function goBack() {
    window.history.back();
  }

  function cropDelete(item) {
    console.log(item._id);
    Crop
    .deleteCrop({ id: item._id, userId: vm.user._id})
    .$promise
    .then(catfish => {
      console.log(catfish);
      vm.cropArray = [];
      catfish.forSale.forEach(function(crop) {
        vm.cropArray.push(crop);
      });
    });
  }

  User.get({id: vm.seller})
  .$promise
  .then(seller => {
    vm.seller = seller;
    vm.seller.forSale.forEach(function(crop) {
      vm.cropForSale = Crop.get({ id: crop});
      vm.cropArray.push(vm.cropForSale);
    });

    vm.seller.allotments.forEach(function(allotment) {
      vm.myAllotment = Allotment.get({ id: allotment});
      vm.allotmentArray.push(vm.myAllotment);
    });
  });

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

    if (params.name !== undefined || params.name.lenth < 1) {
      cropAnimation();
    }
  }
  function cropAnimation() {
    const duration = 1000;
    const offset = 100;
    const someElement = angular.element(document.getElementsByClassName('crop-query')[0]);
    $document.scrollToElement(someElement, offset, duration);
  }
  function startCropWatch() {
    $scope.$watchGroup([
      () => vm.cropName
    ], filterCrops);
  }
}
