/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('StateService', ['$resource', '$http', '$q', '$filter',
    function ($resource, $http, $q, $filter) {
        var selectedRestaurant = "";
        return {
            getSelectedRestaurant: function () {
                var promise = $http.get('app/rest/account').then(function () {

                    return selectedRestaurant;
                });
                return promise;
            },
            setSelectedRestaurant: function (restaurantId) {
               selectedRestaurant=restaurantId;
            }
        }
    }]);