angular
.module('WDI_Group_Project')
.directive('googleMapA', googleMapA);

googleMapA.$inject = ['$window', 'Allotment', '$stateParams', 'User'];

function googleMapA($window, Allotment, $stateParams, User) {
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
      // User.get( { id: $stateParams.id }, data => {
      //   Allotment.get( { id: data.allotments[0]}, response => {
      //     self.selectedUserCoords = {
      //       lat: parseFloat(response.latitude),
      //       lng: parseFloat(response.longitude)
      //     };
      //     console.log(self.selectedUserCoords);
      //   });
      // } );

      Allotment.get( { id: $stateParams.id }, data => {
        // console.log(data);
        self.selectedAllotmentCoords = {
          lat: parseFloat(data.latitude),
          lng: parseFloat(data.longitude)
        };
      })
      .$promise
      .then(() => {
        const map = new $window.google.maps.Map(element[0], {
          zoom: 14,
          center: self.selectedAllotmentCoords
        });
        new $window.google.maps.Marker({
          position: self.selectedAllotmentCoords,
          map: map,
          animation: $window.google.maps.Animation.DROP
        });
      });

    }
  };
  return directive;
}
