angular
.module('WDI_Group_Project')
.controller('FeaturedCtrl', FeaturedCtrl);

FeaturedCtrl.$inject = ['Allotments','filterFilter', '$scope', '$http'];

function FeaturedCtrl(Allotments, filterFilter, $scope, $http){
  const vm = this;
  vm.allotments = [];

  getAllotments();
  function getAllotments() {
    $http.get('http://localhost:7000/api/allotments')
    .then((res) => {
      vm.allotments = res.data[0].result.records;
      console.log(vm.allotments);
      startWatch();
    });
  }

  function filterAllotments() {
    const params = {
      Name: vm.q,
      NearestPostcode: vm.NearestPostcode
    };
    vm.allotmentsFiltered = filterFilter(vm.allotments, params);
    // console.log(vm.allotmentsFiltered);
  }

  function startWatch() {
    $scope.$watchGroup([
      () => vm.q,
      () => vm.NearestPostcode
      // () => vm.result.records.Name
    ], filterAllotments);
  }
}
