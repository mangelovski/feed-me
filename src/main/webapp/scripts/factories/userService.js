/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('UserService', ['$resource', '$http',
    function ($resource, $http) {
        var currentUser = "user";
        return {
            getCurrentUser: function () {
                var promise = $http.get('app/rest/account').then(function () {
                    return currentUser;
                });
                return promise;
            },
            setCurrentUser: function (currentUsr) {
                currentUser=currentUsr;
            }
        }
    }]);