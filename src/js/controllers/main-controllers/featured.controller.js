angular
.module('WDI_Group_Project')
.controller('FeaturedCtrl', FeaturedCtrl);

FeaturedCtrl.$inject = ['Allotments','filterFilter', '$scope', '$http', 'CurrentUserService'];

function FeaturedCtrl(Allotments, filterFilter, $scope, $http, CurrentUserService){
  const vm = this;
  vm.allotments = [];
  vm.crops = [];
  vm.user = CurrentUserService.currentUser;

  vm.destination = 'ec1y4ab';
  vm.origin = vm.user.firstName;
  vm.destination = vm.destination;

  const service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [vm.origin],
      destinations: [vm.destination],
      travelMode: 'DRIVING'
    }, getDistance);

  function getDistance(response) {
    console.log(response);
  }


  getAllotments();
  getCrops();

    ///////// GET ALLOTMENTS AND ADD WATCH FOR USER INPUT /////////
  function getAllotments() {
    $http.get('http://localhost:7000/api/allotments')
    .then((res) => {
      vm.allotments = res.data[0].result.records;
      startWatch();
    });
  }

  function filterAllotments() {
    const params = {
      NearestPostcode: vm.NearestPostcode
    };
    vm.allotmentsFiltered = filterFilter(vm.allotments, params);
  }
  function startWatch() {
    $scope.$watchGroup([
      () => vm.NearestPostcode
    ], filterAllotments);
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
