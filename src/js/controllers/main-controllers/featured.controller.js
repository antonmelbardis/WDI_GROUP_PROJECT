angular
.module('WDI_Group_Project')
.controller('FeaturedCtrl', FeaturedCtrl);

FeaturedCtrl.$inject = ['Allotment','filterFilter', '$scope', '$http', 'CurrentUserService', 'User'];

function FeaturedCtrl(Allotment, filterFilter, $scope, $http, CurrentUserService, User){
  const vm = this;
  vm.allotments = [];
  vm.crops = [];
  vm.user = CurrentUserService.currentUser;
  console.log(vm.user.role);

  vm.destination = 'se192ab';
  vm.origin = vm.user.postcode;

  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [vm.origin],
      destinations: [vm.destination],
      travelMode: 'DRIVING'
    }, getDistance);

  function getDistance(response) {
    console.log(response.rows[0].elements[0].distance.text);
  }

  getAllotment();
  getCrops();

    ///////// GET ALLOTMENTS AND ADD WATCH FOR USER INPUT /////////
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
