angular
  .module('WDI_Group_Project')
  .service('TokenService', TokenService);

TokenService.$inject = ['$window', 'jwtHelper'];
function TokenService($window, jwtHelper) {
  const self = this;

  self.setToken = (token) => {
    return $window.localStorage.setItem('auth-token', token);
  };

  self.getToken = () => {
    return $window.localStorage.getItem('auth-token');
  };

  self.decodeToken = () => {
    const token = self.getToken();    //C.
    return token ? jwtHelper.decodeToken(token) : null;  //D.
  };

  self.removeToken = () => {
    $window.localStorage.clear();
  };
}
