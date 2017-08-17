angular
.module('WDI_Group_Project')
.controller('MainCtrl', MainCtrl);

MainCtrl.$inject=['$rootScope', 'CurrentUserService', '$state'];
function MainCtrl($rootScope, CurrentUserService, $state) {
  const vm = this;

  vm.logout = logout;
  $rootScope.$on('loggedIn', () => {
    vm.user = CurrentUserService.currentUser;
  });

  $rootScope.$on('loggedOut', () => {
    vm.user = null;
    $state.go('landing');
  });

  function logout() {
    CurrentUserService.removeUser();
  }
}

$(function(){

  const imgArray = [
    'https://s29.postimg.org/c0vs5hqfb/Allotment_Images-06.png',
    'https://s17.postimg.org/vpfnsbsm7/Allotment_Images-05.png',
    'https://preview.ibb.co/bEHQPv/Allotment_Images_03_copy.jpg',
    'https://s29.postimg.org/fvhwe24s7/Allotment_Images-01.png',
    'https://s27.postimg.org/67rvr74pv/Allotment_Images-02.png'
  ];
  $('.jumbo').prepend(`<img id="vegImg" src="https://s27.postimg.org/67rvr74pv/Allotment_Images-02.png"/>`);

  setInterval(function(){
    const selectedImage = imgArray[Math.floor(Math.random()*imgArray.length)];
    $('#vegImg').fadeOut(3000);
    $('.jumbo').prepend(`<img id="vegImg" src="${selectedImage}"/>`);
  }, 5000);
});
