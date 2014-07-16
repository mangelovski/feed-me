/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('StateService', ['$resource', '$http',
    function ($resource, $http) {
        var selectedRestaurant = "";
        return {
            getSelectedRestaurant: function () {
                var promise = $http.get('app/rest/account').then(function () {

                    if(selectedRestaurant!=""){
                    return selectedRestaurant;}
                    return "1";
                });
                return promise;
            },
            setSelectedRestaurant: function (restaurantId) {
               selectedRestaurant=restaurantId;
            }
        }
    }]);