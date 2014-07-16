/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('UserService', ['$resource', '$http',
    function ($resource, $http) {
        var currentUser = "1";
        return {
            getCurrentUser: function () {
                var promise = $http.get('app/rest/account').then(function () {

                    if(currentUser!=""){
                    return currentUser;}
                    return "1";
                });
                return promise;
            },
            setCurrentUser: function (currentUsr) {
                currentUser=currentUsr;
            }
        }
    }]);