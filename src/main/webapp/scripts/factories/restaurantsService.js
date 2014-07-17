/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('RestaurantsService', ['$resource', '$http',
    function ($resource, $http) {
        return {
            loadAllRestaurants: function () {
                var promise = $http.get('app/rest/allRestaurants').then(function (response) {
                    return response.data;
                });
                return promise;
            },
            loadRestaurantById: function (id) {
                var promise = $http.get('app/rest/restaurant', {params: {restaurantId: id}}).then(function (response) {
                    return response.data;
                });
                return promise;
            },
            loadPopularRestourants: function (fromDate, toDate) {
                var promise = $http.get('app/rest/audits/byDates', {params: {fromDate: fromDate, toDate: toDate}}).then(function (response) {
                    return 'not implemented';
                });
                return promise;
            },
            loadRestourantsByArea: function (fromDate, toDate) {
                var promise = $http.get('app/rest/audits/byDates', {params: {fromDate: fromDate, toDate: toDate}}).then(function (response) {
                    return 'not implemented';
                });
                return promise;
            }
        }
    }]);