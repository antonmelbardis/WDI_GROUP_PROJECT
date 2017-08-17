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

// $(function(){
//
//   const imgArray = [
//     'https://i.imgur.com/ZCZgqDe.jpg',
//     'https://i.imgur.com/JcV6jDq.jpg',
//     'https://i.imgur.com/uL5QQwM.jpg',
//     'https://i.imgur.com/mfF4HOK.jpg',
//     'https://i.imgur.com/mmAF0YU.jpg',
//     'https://i.imgur.com/c0XYzDV.jpg'
//   ];
//
//   $('body').css('background', 'url("https://i.imgur.com/uL5QQwM.jpg")');
//
//   setInterval(function(){
//     const selectedImage = imgArray[Math.floor(Math.random()*imgArray.length)];
//     $('#vegImg').fadeOut(2000);
//     $('.jumbotronHolder').prepend(`<img id="vegImg" src="${selectedImage}"/>`);
//   }, 4000);
//
//
// });
