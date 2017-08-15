angular.module('WDI_Group_Project')
  .factory('Allotment', Allotment);

Allotment.$inject = ['API', '$resource'];
function Allotment(API, $resource) {
  return $resource(`${API}/allotments/:id`, { id: '@_id'}, {
    'saveAllotment': { method: 'GET', url: `${API}/allotments/:id/save/:userId`}
  });
}
