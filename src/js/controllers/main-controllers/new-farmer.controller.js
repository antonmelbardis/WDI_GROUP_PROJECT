// angular
//   .module('WDI_Group_Project')
//   .controller('ListAllotmentsCtrl', ListAllotmentsCtrl);
//
// ListAllotmentsCtrl.$inject = ['Allotments','filterFilter', '$scope'];
// function ListAllotmentsCtrl(Allotments, filterFilter, $scope){
//   const vm = this;
//   // vm.all = [];
//
//   vm.allotments = Allotments.query();
//   filterAllotments();
//
//   function filterAllotments() {
//     vm.filtered = filterFilter(vm.allotments, vm.q);
//   }
//
//   $scope.$watchGroup([
//     () => vm.q,
//     () => vm.Name
//   ], filterAllotments);
//
// }

angular
.module('WDI_Group_Project')
.controller('ListAllotmentsCtrl', ListAllotmentsCtrl);

ListAllotmentsCtrl.$inject = ['Allotments','filterFilter', '$scope', '$http'];

function ListAllotmentsCtrl(Allotments, filterFilter, $scope, $http){
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
