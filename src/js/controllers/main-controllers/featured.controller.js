angular
.module('WDI_Group_Project')
.controller('FeaturedCtrl', FeaturedCtrl);

FeaturedCtrl.$inject = ['Allotment','filterFilter', '$scope', '$http', 'CurrentUserService', '$document'];
function FeaturedCtrl(Allotment, filterFilter, $scope, $http, CurrentUserService, $document){
  const vm = this;

  vm.crops = [];
  vm.user = CurrentUserService.currentUser;

  ///////// GET ALLOTMENTS AND ADD WATCH FOR USER INPUT /////////
  getAllotment();
  function getAllotment() {
    $http.get('http://localhost:7000/api/allotments')
    .then((res) => {
      vm.allotments = res.data;
      startWatch();
    });
  }
  function filterAllotment() {
    const params = {
      nearestPostcode: vm.nearestPostcode
    };
    vm.allotmentsFiltered = filterFilter(vm.allotments, params);
  }

  function startWatch() {
    $scope.$watchGroup([
      () => vm.nearestPostcode
    ], filterAllotment);
  }

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
