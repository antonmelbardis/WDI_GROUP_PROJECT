angular
.module('WDI_Group_Project')
.directive('googleMapU', googleMapU);

googleMapU.$inject = ['$window', 'Allotment', '$stateParams', 'User'];
function googleMapU($window, Allotment, $stateParams, User) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '='
    },
    link($scope, element) {
      const self = this;

      self.seller = $stateParams.id;
      console.log(self.seller);
      // if url is /users we use first option, else second
      User.get( { id: $stateParams.id }, data => {
        Allotment.get( { id: data.allotments[0]}, response => {
          self.selectedUserCoords = {
            lat: parseFloat(response.latitude),
            lng: parseFloat(response.longitude)
          };
          console.log(self.selectedUserCoords);
          // const userCoords = self.selectedUserCoords;
          // return self.selectedUserCoords;
        })
        .$promise
        .then(() => {

          const map = new $window.google.maps.Map(element[0], {
            zoom: 14,
            center: self.selectedUserCoords
          });
          new $window.google.maps.Marker({
            position: self.selectedUserCoords,
            map: map,
            animation: $window.google.maps.Animation.DROP
          });
        });
      });
    }
  };
  return directive;
}
