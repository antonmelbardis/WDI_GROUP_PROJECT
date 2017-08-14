angular
.module('WDI_Group_Project')
.controller('FeaturedCtrl', FeaturedCtrl);

FeaturedCtrl.$inject=['User'];
function FeaturedCtrl(User) {
  const vm = this;
  vm.users = User.query();
}
