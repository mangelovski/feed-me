'use strict';
/* global angular */
/* exported feedmeApp */
/* exported angular */
/* App Module */

var feedmeApp = angular.module('feedmeApp', ['http-auth-interceptor', 'tmh.dynamicLocale','ui.router',
    'ngResource', 'ngCookies', 'feedmeAppUtils', 'pascalprecht.translate', 'truncate','ui.select2','ui.bootstrap']);

feedmeApp
    .config(['$stateProvider', '$urlRouterProvider', '$translateProvider',  'tmhDynamicLocaleProvider', 'USER_ROLES',
        function ($stateProvider, $urlRouterProvider, $translateProvider, tmhDynamicLocaleProvider, USER_ROLES) {


            $urlRouterProvider.otherwise('/main');

            $stateProvider
                .state('main', {
                    url:'/main',
                    views: {
                        "mainView": {
                            templateUrl: 'views/main.html',
                            controller: 'MainController',
                            access: {
                                authorizedRoles: [USER_ROLES.all]
                            }
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }
                })
                .state('login', {
                    url: '/login',
                    views: {
                        "mainView": {
                            templateUrl: 'views/login.html',
                            controller: 'LoginController',
                            access: {
                                authorizedRoles: [USER_ROLES.all]
                            }
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }

                })
                .state('error', {
                    url: '/error',
                    views: {
                        "mainView": {
                            templateUrl: 'views/error.html',
                            controller: function($rootScope,$scope){

                                $scope.additionalErrorInfo=$rootScope.additionalErrorInfo;
                                $scope.errorMessage=$rootScope.errorMessage;
                                $rootScope.errorMessage="";
                                $rootScope.additionalErrorInfo="";

                            },
                            access: {
                                authorizedRoles: [USER_ROLES.all]
                            }
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }

                })
                .state('settings', {
                    url: '/settings',
                    views: {
                        "mainView": {
                            templateUrl: 'views/settings.html',
                            controller: 'SettingsController',
                            access: {
                                authorizedRoles: [USER_ROLES.admin,USER_ROLES.operator,USER_ROLES.user]
                            }
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }

                })
                .state('restaurants', {
                    url: '/restaurants',
                    views: {
                        "mainView": {
                            templateUrl: 'views/restaurants.html',
                            controller: 'RestaurantsController',
                            access: {
                                authorizedRoles: [USER_ROLES.admin,USER_ROLES.operator,USER_ROLES.user]
                            }
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }

                }).state('checkout', {
                    url: '/checkout',
                    views: {
                        "mainView": {
                            templateUrl: 'views/checkout.html',
                            controller: 'CheckoutController',
                            access: {
                                authorizedRoles: [USER_ROLES.admin,USER_ROLES.operator,USER_ROLES.user]
                            }
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }

                }).state('restaurant', {
                    url: '/restaurant',
                    views: {
                        "mainView": {
                            templateUrl: 'views/menu.html',
                            controller: 'MenuController',
                            access: {
                                authorizedRoles: [USER_ROLES.admin,USER_ROLES.operator,USER_ROLES.user]
                            }
                        },
                        "orderView": {
                            controller: 'OrderController',
                            templateUrl:"views/order.html"
                        }
                    }

                })
                .state('password', {
                    url: '/password',
                    views: {
                        "mainView": {
                            templateUrl: 'views/password.html',
                            controller: 'PasswordController',
                            access: {
                                authorizedRoles: [USER_ROLES.admin,USER_ROLES.operator,USER_ROLES.user]
                            }
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }

                })
                .state('sessions', {
                    url: '/sessions',
                    views: {
                        "mainView": {
                            templateUrl: 'views/sessions.html',
                            controller: 'SessionsController',
                            resolve:{
                                resolvedSessions:['Sessions', function (Sessions) {
                                    return Sessions.get();
                                }],
                                access: {
                                    authorizedRoles: [USER_ROLES.admin,USER_ROLES.operator,USER_ROLES.user]
                                }
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }

                    }

                })
                .state('metrics', {
                    url: '/metrics',
                    views: {
                        "mainView": {
                            templateUrl: 'views/metrics.html',
                            controller: 'MetricsController',
                            access: {
                                authorizedRoles: [USER_ROLES.admin]
                            }
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }

                })
                .state('logs', {
                    url: '/logs',
                    views: {
                        "mainView": {
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
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }

                })
                .state('audits', {
                    url: '/audits',
                    views: {
                        "mainView": {
                            templateUrl: 'views/audits.html',
                            controller: 'AuditsController',
                            access: {
                                authorizedRoles: [USER_ROLES.admin]
                            }
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }

                })
                .state('logout', {
                    url: '/logout',
                    views: {
                        "mainView": {
                            templateUrl: 'views/main.html',
                            controller: 'LogoutController',
                            access: {
                                authorizedRoles: [USER_ROLES.all]
                            }
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }

                })
                .state('docs', {
                    url: '/docs',
                    views: {
                        "mainView": {
                            templateUrl: 'views/docs.html',
                            access: {
                                authorizedRoles: [USER_ROLES.admin]
                            }
                        },
                        "orderView": {
                            controller: function ($scope) {
                                $scope.showOrders = false;  //*** Exists! ***//
                            },
                            template:"orders"
                        }
                    }

                });

            // Initialize angular-translate
            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/',
                suffix: '.json'
            });

            $translateProvider.preferredLanguage('en');

            $translateProvider.useCookieStorage();

            tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
            tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');
            
        }])
        .run(['$rootScope', '$state', '$http', 'AuthenticationSharedService', 'Session', 'USER_ROLES',
            function($rootScope, $state, $http, AuthenticationSharedService, Session, USER_ROLES) {
                $rootScope.$on('$stateChangeStart', function (event, next) {
                    $rootScope.isAuthorized = AuthenticationSharedService.isAuthorized;
                    $rootScope.userRoles = USER_ROLES;
                    AuthenticationSharedService.valid(next.views.mainView.access.authorizedRoles);
                });

                // Call when the the client is confirmed
                $rootScope.$on('event:auth-loginConfirmed', function() {
                    $rootScope.authenticated = true;
                    if ($state.includes('login')) {
                        $state.go('main');
                    }
                });

                // Call when the 401 response is returned by the server
                $rootScope.$on('event:auth-loginRequired', function() {
                    Session.invalidate();
                    $rootScope.authenticated = false;
                    $state.go('login');
                });

                // Call when the 403 response is returned by the server
                $rootScope.$on('event:auth-notAuthorized', function() {
                    $rootScope.errorMessage = 'errors.403';
                    $state.go('error');
                });

                // Call when the user logs out
                $rootScope.$on('event:auth-loginCancelled', function() {
                    $state.go('');
                });
        }]);
