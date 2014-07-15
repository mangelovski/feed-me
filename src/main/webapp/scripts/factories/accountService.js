/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('AccountService', ['$resource',
    function ($resource) {
        return $resource('app/rest/account', {}, {
        });
    }]);