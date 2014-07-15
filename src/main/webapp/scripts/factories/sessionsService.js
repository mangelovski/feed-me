/**
 * Created by Martin on 6/20/2014.
 */
'use strict';
feedmeApp.factory('Sessions', ['$resource',
    function ($resource) {
        return $resource('app/rest/account/sessions/:series', {}, {
            'get': { method: 'GET', isArray: true}
        });
    }]);