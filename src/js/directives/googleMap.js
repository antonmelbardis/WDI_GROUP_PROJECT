angular
  .module('WDI_Group_Project')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window', 'Allotment', '$stateParams'];
function googleMap($window, Allotment, $stateParams) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '='
    },
    link($scope, element) {
      const self = this;


      Allotment.get({ id: $stateParams.id }, data => {
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
