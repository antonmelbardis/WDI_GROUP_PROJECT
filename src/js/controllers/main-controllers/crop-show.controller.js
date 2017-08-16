angular
.module('WDI_Group_Project')
.controller('CropShowCtrl', CropShowCtrl);


CropShowCtrl.$inject = ['Crop', '$stateParams', 'CurrentUserService', '$state', 'User'];
function CropShowCtrl(Crop, $stateParams, CurrentUserService, $state, User) {
  const vm = this;

  vm.cropId         = $stateParams.id;
  vm.user           = CurrentUserService.currentUser;
  vm.addToForSale   = addToForSale;
  vm.checkSaveState = checkSaveState;
  vm.sellingUsers   = [];
  vm.selectedCrop   = Crop.get({ id: $stateParams.id });
  // console.log(vm.user.allotments);

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
  getUsers();
  function checkSaveState() {
    if (vm.user.forSale.indexOf(vm.selectedCrop._id) !== -1) {
      return true;
    } else {
      return false;
    }
  }
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
    User.query(function(userArray) {
      userArray.forEach(function(user) {
        user.forSale.filter(function (crop) {
          if(crop === vm.cropId) {
            vm.sellingUsers.push(user);
          }
        });
      });
    });
  }
}
