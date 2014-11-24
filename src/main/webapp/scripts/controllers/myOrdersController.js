'use strict';
/**
 * Created by Martin on 6/19/2014.
 */

feedmeApp.controller('MyOrdersController', ['$rootScope','$scope','$state',
    'OrderService','UserService',
    function ($rootScope,$scope,$state,OrderService, UserService ) {
        $scope.oneAtATime = true;

        var refreshOrders=function(){
                UserService.getCurrentUser().then(function(data){
                    $scope.userId=data;
                    OrderService.getAllOrdersByUserId($scope.userId)
                        .then(function(data){

                            $scope.allOrders=data;
                            //debugger;
                    });
                });
        };
        refreshOrders();

    }]);

