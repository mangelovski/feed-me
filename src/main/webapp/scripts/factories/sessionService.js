/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('Session', [
    function () {
        this.create = function (login, firstName, lastName, email, userRoles) {
            this.login = login;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.userRoles = userRoles;
        };
        this.invalidate = function () {
            this.login = null;
            this.firstName = null;
            this.lastName = null;
            this.email = null;
            this.userRoles = null;
        };
        return this;
    }]);

feedmeApp.constant('USER_ROLES', {
    all: '*',
    admin: 'ROLE_ADMIN',
    operator: 'ROLE_OPERATOR',
    user: 'ROLE_USER'
});