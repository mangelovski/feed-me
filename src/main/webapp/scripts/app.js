'use strict';
/* global angular */
/* exported feedmeApp */
/* exported angular */
/* App Module */

var feedmeApp = angular.module('feedmeApp', ['http-auth-interceptor', 'tmh.dynamicLocale','ui.router',
    'ngResource', 'ngCookies', 'feedmeAppUtils', 'pascalprecht.translate', 'truncate','ui.select2']);

feedmeApp
    .config(['$stateProvider', '$urlRouterProvider', '$translateProvider',  'tmhDynamicLocaleProvider', 'USER_ROLES',
        function ($stateProvider, $urlRouterProvider, $translateProvider, tmhDynamicLocaleProvider, USER_ROLES) {


            $urlRouterProvider.otherwise('/main');

            $stateProvider
                .state('main', {
                    url:'/main',
                    templateUrl: 'views/main.html',
                    controller: 'MainController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'views/login.html',
                    controller: 'LoginController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .state('error', {
                    url: '/error',
                    templateUrl: 'views/error.html',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .state('settings', {
                    url: '/settings',
                    templateUrl: 'views/settings.html',
                    controller: 'SettingsController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .state('restaurants', {
                    url: '/restaurants',
                    templateUrl: 'views/restaurants.html',
                    controller: 'RestaurantsController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                }).state('restaurant', {
                    url: '/restaurant',
                    templateUrl: 'views/restaurant.html',
                    controller: 'RestaurantController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .state('password', {
                    url: '/password',
                    templateUrl: 'views/password.html',
                    controller: 'PasswordController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .state('sessions', {
                    url: '/sessions',
                    templateUrl: 'views/sessions.html',
                    controller: 'SessionsController',
                    resolve:{
                        resolvedSessions:['Sessions', function (Sessions) {
                            return Sessions.get();
                        }]
                    },
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .state('metrics', {
                    url: '/metrics',
                    templateUrl: 'views/metrics.html',
                    controller: 'MetricsController',
                    access: {
                        authorizedRoles: [USER_ROLES.admin]
                    }
                })
                .state('logs', {
                    url: '/logs',
                    templateUrl: 'views/logs.html',
                    controller: 'LogsController',
                    resolve:{
                        resolvedLogs:['LogsService', function (LogsService) {
                            return LogsService.findAll();
                        }]
                    },
                    access: {
                        authorizedRoles: [USER_ROLES.admin]
                    }
                })
                .state('audits', {
                    url: '/audits',
                    templateUrl: 'views/audits.html',
                    controller: 'AuditsController',
                    access: {
                        authorizedRoles: [USER_ROLES.admin]
                    }
                })
                .state('logout', {
                    url: '/logout',
                    templateUrl: 'views/main.html',
                    controller: 'LogoutController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .state('docs', {
                    url: '/docs',
                    templateUrl: 'views/docs.html',
                    access: {
                        authorizedRoles: [USER_ROLES.admin]
                    }
                });

            // Initialize angular-translate
            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/',
                suffix: '.json'
            });

            $translateProvider.preferredLanguage('en');

            $translateProvider.useCookieStorage();

            tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js')
            tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');
            
        }])
        .run(['$rootScope', '$state', '$http', 'AuthenticationSharedService', 'Session', 'USER_ROLES',
            function($rootScope, $state, $http, AuthenticationSharedService, Session, USER_ROLES) {
                $rootScope.$on('$stateChangeStart', function (event, next) {
                    $rootScope.isAuthorized = AuthenticationSharedService.isAuthorized;
                    $rootScope.userRoles = USER_ROLES;
                    AuthenticationSharedService.valid(next.access.authorizedRoles);
                });

                // Call when the the client is confirmed
                $rootScope.$on('event:auth-loginConfirmed', function(data) {
                    $rootScope.authenticated = true;
                    if ($state.includes('login')) {
                        $state.go('main');
                    }
                });

                // Call when the 401 response is returned by the server
                $rootScope.$on('event:auth-loginRequired', function(rejection) {
                    Session.invalidate();
                    $rootScope.authenticated = false;
                    $state.go('login');
                });

                // Call when the 403 response is returned by the server
                $rootScope.$on('event:auth-notAuthorized', function(rejection) {
                    $rootScope.errorMessage = 'errors.403';
                    $state.go('error');
                });

                // Call when the user logs out
                $rootScope.$on('event:auth-loginCancelled', function() {
                    $state.go('');
                });
        }]);
