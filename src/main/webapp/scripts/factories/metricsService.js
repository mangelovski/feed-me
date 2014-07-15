/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('MetricsService', ['$resource',
    function ($resource) {
        return $resource('metrics/metrics', {}, {
            'get': { method: 'GET'}
        });
    }]);