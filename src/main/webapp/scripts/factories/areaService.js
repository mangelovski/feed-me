/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('AreaService', ['$resource', '$http',
    function ($resource, $http) {

        return {
            calculateDistanceBetweenAreas: function (area1,area2) {

                return 4;
            },
            getDistancePrice: function () {

                return 50;
            }
    }
    }]);