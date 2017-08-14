angular
.module('WDI_Group_Project')
.controller('FeaturedCtrl', FeaturedCtrl);

FeaturedCtrl.$inject = ['Allotments','filterFilter', '$scope', '$http'];
function FeaturedCtrl(Allotments, filterFilter, $scope, $http){
  const vm = this;
  vm.allotments = [];
  vm.crops = [];

  getAllotments();
  getCrops();

  function getAllotments() {
    if() {
      $http.get('http://localhost:7000/api/allotments')
      .then((res) => {
        vm.allotments = res.data[0].result.records;
        startWatch();
      });
    }
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
    console.log(vm.cropsFiltered);
  }
  function startCropWatch() {
    $scope.$watchGroup([
      () => vm.cropName
      // () => vm.result.records.Name
    ], filterCrops);
  }
}
