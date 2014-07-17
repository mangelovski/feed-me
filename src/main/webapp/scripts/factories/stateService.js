/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('StateService', ['$resource', '$http',
    function ($resource, $http) {
        var selectedRestaurant = "1";
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