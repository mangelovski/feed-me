/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('MenuService', ['$resource', '$http',
    function ($resource, $http) {

        return {
            loadMenu: function (id) {
                var promise = $http.get('app/rest/menu',{params: {restaurantId: id}}).then(function (response) {
                    return response.data;
                });
                return promise;
            }
        };

    }]);