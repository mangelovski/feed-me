'use strict';
/**
 * Created by Martin on 6/19/2014.
 */
feedmeApp.controller('LoginController', ['$scope', '$state', 'AuthenticationSharedService',
    function ($scope, $state, AuthenticationSharedService) {
        $scope.rememberMe = true;
        $scope.login = function () {
            AuthenticationSharedService.login({
                username: $scope.username,
                password: $scope.password,
                rememberMe: $scope.rememberMe
            })
        }
    }]);
