angular
.module('WDI_Group_Project')
.service('CurrentUserService', CurrentUserService);

CurrentUserService.$inject = ['TokenService', 'User', '$rootScope']; //A.
function CurrentUserService(TokenService, User, $rootScope) {
  const self = this;

  self.getUser = () => {
    const decoded = TokenService.decodeToken();
    console.log(decoded); //B.
    if (decoded) {
      User // this is the factory
      .get({ id: decoded.id })
      .$promise
      .then(data => {
        self.currentUser = data; //C.
        $rootScope.$broadcast('loggedIn');  //D.
      });
    }
  };

  self.removeUser = () => { //E.
    self.currentUser = null;
    TokenService.removeToken();  //F.
    $rootScope.$broadcast('loggedOut');
  };

  self.getUser(); //G.
}
