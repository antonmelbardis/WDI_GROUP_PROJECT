angular
.module('WDI_Group_Project')
.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['User', 'CurrentUserService', '$state'];
function LoginCtrl(User, CurrentUserService, $state) {

  const vm = this;

  vm.login = login;

  function login() {
    User
    .login(vm.user)
    .$promise
    .then(() => {
      CurrentUserService.getUser();
      $state.go('featured');
    });
  }
}

var num = 170
num.each(() => {
  setInterval(getFruits, 2000);
  function getFruits() {
    $http.get(`http://api.seasonsapp.com/crops/${num}/?format=json`)
    .$promise
    .then((data) => {
      var obj = {
        id: data.id,
        name: data.name,
        description: data.description,
        image: data.image,
        thumbnail: data.thumbnail
      }
      $http.post(`${API}/fruits`, obj)
  }
});

})
