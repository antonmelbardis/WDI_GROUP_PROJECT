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
    'https://i.imgur.com/BnmXD5x.jpg',
    'http://fillmurray.com/g/400/400',
    'http://fillmurray.com/g/300/400'
  ];
  $('.jumbotronHolder').prepend(`<img id="vegImg" src="https://i.imgur.com/BnmXD5x.jpg"/>`);

  setInterval(function(){
    const selectedImage = imgArray[Math.floor(Math.random()*imgArray.length)];
    $('#vegImg').fadeOut(1000);
    $('.jumbotronHolder').prepend(`<img id="vegImg" src="${selectedImage}"/>`);
  }, 3000);


});
