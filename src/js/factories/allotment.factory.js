angular.module('WDI_Group_Project')
  .factory('Allotments', Allotments);

Allotments.$inject = ['API', '$resource'];
function Allotments(API, $resource) {
  return $resource(`${API}/allotments/:id`, { id: '@_id'});
}
