angular
.module('WDI_Group_Project')
.controller('CropShowCtrl', CropShowCtrl);


CropShowCtrl.$inject = ['Crop', '$stateParams', 'CurrentUserService', '$state', 'User', '$http', 'Allotment'];
function CropShowCtrl(Crop, $stateParams, CurrentUserService, $state, User, $http, Allotment) {
  const vm = this;

  vm.cropId         = $stateParams.id;
  vm.user           = CurrentUserService.currentUser;
  vm.addToForSale   = addToForSale;
  vm.checkSaveState = checkSaveState;
  vm.sellingUsers   = [];
  vm.selectedCrop   = Crop.get({ id: $stateParams.id });

  getUsers();
  getUsersLocations();

  function checkSaveState() {
    if (vm.user.forSale.indexOf(vm.selectedCrop._id) !== -1) {
      return true;
    } else {
      return false;
    }
  }

  ////////////////// CONNECTED WITH CUSTOM ROUTES IN CROP FACTORY
  function addToForSale() {
    Crop
    .saveCrop({ id: $stateParams.id, userId: vm.user._id })
    .$promise
    .then(() => {
      checkSaveState();
      $state.go('userShow', { id: vm.user._id });
    });
  }
  function getUsers() {
    $http.get('http://localhost:7000/api/users')
    .then(users => {
      users.data.forEach(function(user) {
        user.forSale.filter(function (crop) {
          if(crop === vm.cropId) {
            vm.sellingUsers.push(user);
            console.log(typeof vm.sellingUsers);
          }
        });
      });
    });
  }
  function getUsersLocations() {
    console.log(vm.sellingUsers);
    vm.sellingUsers.forEach(function(user) {
      $http.get(`http://localhost:7000/api/allotments/${user.allotment[0]}`)
      .then(allotment => {
        console.log(allotment);
      });
    });
  }
}

////////////////////////////////////////////////////////////////////

// const options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0
// };
// function success(position) {
//   const pos = position.coords;
//   console.log(`Latitude : ${pos.latitude}`);
//   console.log(`Longitude: ${pos.longitude}`);
//   vm.origin = `${pos.latitude},${pos.longitude}`;
//   vm.destination = '51.419268,-0.075922';
//
//   const service = new google.maps.DistanceMatrixService();
//   service.getDistanceMatrix(
//     {
//       origins: [vm.origin],
//       destinations: [vm.destination],
//       travelMode: 'DRIVING'
//     }, getDistance);
//   function getDistance(response) {
//     console.log(response.rows[0].elements[0].distance.text);
//   }
// }
// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }
// navigator.geolocation.getCurrentPosition(success, error, options);

///////////////////////////////////////////////////////////////////
