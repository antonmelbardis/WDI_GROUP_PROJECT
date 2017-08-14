angular
.module('WDI_Group_Project')
.controller('FeaturedCtrl', FeaturedCtrl);

FeaturedCtrl.$inject=['$http', 'filterFilter', '$scope'];
function FeaturedCtrl($http, filterFilter, $scope) {
  console.log('Hello');

  $http
  .get('http://api.seasonsapp.com/crops/categories/1/?format=json')
  .then(data => {
    console.log(data);
  });
}



// const cat = 5;
// for(var i = 0; i < cat; i++) {
//   $http
//   .get(`http://api.seasonsapp.com/crops/categories/${i}/?format=json`)
//   .$promise
//   .then(data => {
//
//   })
//
// }
