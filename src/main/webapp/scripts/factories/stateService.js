/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('StateService', ['$resource', '$http',
    function ($resource, $http) {
        var selectedRestaurant = "53c7982218f88924674bc8e4";
        return {
            getSelectedRestaurant: function () {
                var promise = $http.get('app/rest/account').then(function () {

                    if(selectedRestaurant!=""){
                    return selectedRestaurant;}
                    return "53c7982218f88924674bc8e4";
                });
                return promise;
            },
            setSelectedRestaurant: function (restaurantId) {
               selectedRestaurant=restaurantId;

            }
        }
    }]);