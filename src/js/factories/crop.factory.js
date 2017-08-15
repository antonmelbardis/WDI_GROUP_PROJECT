angular.module('WDI_Group_Project')
.factory('Crop', Crop);

Crop.$inject = ['API', '$resource'];
function Crop(API, $resource) {
  return $resource(`${API}/crops/:id`, { id: '@_id'}, {
    'saveCrop': { method: 'GET', url: `${API}/crops/:id/save/:userId`}
  });
}
