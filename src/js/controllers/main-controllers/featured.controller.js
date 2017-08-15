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

  // $http
  // .get(`http://maps.googleapis.com/maps/api/distancematrix/json?origins=${vm.user.firstName}&destinations=${vm.destination}&mode=walking&units=imperial&key=AIzaSyA8sivM6qLlU7ByUEsaQ0gxDBGtYYCtCXc`)
  // .then(data => {
  //   console.log(data);
  // });

  // const origin = vm.user.firstName;
  // const destination = vm.destination;
  //
  // const service = new google.maps.DistanceMatrixService();
  // service.getDistanceMatrix(
  //   {
  //     origins: [origin],
  //     destinations: [destination],
  //     travelMode: 'DRIVING'
  //   }, getDistance);
  //
  // function getDistance(response) {
  //   console.log(response);
  // }


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
