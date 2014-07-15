'use strict';
/**
 * Created by Martin on 6/19/2014.
 */
feedmeApp.controller('LogoutController', ['$state', 'AuthenticationSharedService',
    function ($state, AuthenticationSharedService) {
        AuthenticationSharedService.logout();
    }]);