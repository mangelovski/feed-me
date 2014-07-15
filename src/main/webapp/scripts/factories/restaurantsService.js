/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('RestaurantsService', ['$resource', '$http', '$q', '$filter',
    function ($resource, $http, $q, $filter) {
        var RestaurantsService = {};
        var currentRestourants = {'Restourants': [
            {
                id: 1,
                name: 'Staro Bure',
                area: '1',
                type: 'National',
                shortDesc: 'good bbq, test short description',
                comments: 'we recommend the чорба!'
            },
            {id: 2,
                name: 'Veneto',
                area: '1',
                type: 'Italian',
                shortDesc: 'exclusive italian with unique dishes',
                comments: 'we recommend chicken with mushrooms'
            },
            {
                id: 3,
                name: 'Enriko',
                area: '1',
                type: 'Italian',
                shortDesc: 'great italian restaurant with tasty food',
                comments: 'we recommend the sandwiches'
            },
            {id:8,
                name: 'Gala Kujna1',
                area: '1',
                type: 'Cantene',
                shortDesc: 'there is only processed home baked food',
                comments: 'we recommend the rice with white chicken'
            },
            {id:4,
                name: 'Celik',
                area: '2',
                type: 'National',
                shortDesc: 'there is only salads here',
                comments: ' Шопска со тиквички is a must'
            },
            { id:5,
                name: '1001 night',
                area: '3',
                type: 'Arabian',
                shortDesc: 'Oriental restaurant with exclusive food ',
                comments: 'we recommend the falafel or the tikka'
            },
            {   id:6,
                name: '4 seasons',
                area: '5',
                type: 'Unique',
                shortDesc: 'Unique tasty food',
                comments: 'we recommend the special chicken sandwitch'
            },
            {   id:7,
                name: 'Kostarika',
                area: '2',
                type: 'Italian',
                shortDesc: 'Great italian pizzas and salads',
                comments: 'we recommend the fantasy pizza'
            }
        ]};

        RestaurantsService.loadAllRestourants = function () {
            /*var link = UtilFactory.findLink('visits', currentPatient.links);
             var deferred = $q.defer();
             if (link !== undefined) {
             $http({
             url: configuration.defaultApiPath + link.href.slice(1),
             method: link.method
             })
             .success(function(data) {
             UtilFactory.replaceCapitalInToLowerLetter(data);
             visits=data.visits;
             deferred.resolve(data);
             })
             .error(function(error) {
             deferred.reject(error);
             });
             } else {
             deferred.reject('Can not find path');
             }
             return deferred.promise;*/
            return currentRestourants;
        };
        return {
            loadAllRestourants: function () {
                var promise = $http.get('app/rest/account').then(function () {
                    return currentRestourants;
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

        /* return $resource('app/rest/logs', {}, {
         'findAll': { method: 'GET', isArray: true},
         'changeLevel':  { method: 'PUT'}
         });*/
    }]);