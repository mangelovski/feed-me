'use strict';
/**
 * Created by Martin on 6/19/2014.
 */

feedmeApp.controller('OrderController', ['$scope','$state', 'RestaurantsService','StateService','OrderService','UserService',
    function ($scope,$state, RestaurantsService, StateService,OrderService, UserService ) {
        $scope.showOrders = true;
        $scope.removeOne = function(item) {

            OrderService.removeItemFromOrder($scope.order.orderId,item.itemId).then(function(data){
            });

        };
        $scope.createOrder=function(){
            OrderService.createOrder().then(function(){
                $state.go('checkout');

            });
        };
        $scope.saveOrder=function(){
            OrderService.saveOrderToServer();
        };
        var refreshOrder=function(){
            StateService.getSelectedRestaurant().then(function(data){
                $scope.selectedId=data;
                RestaurantsService.loadRestaurantById($scope.selectedId).then(function(data){
                    $scope.restaurant=data;
                });
                UserService.getCurrentUser().then(function(data){
                    OrderService.loadLastUncompletedOrderOrMakeNew(data,$scope.selectedId).then(function(data){
                        $scope.order=data;
                    });
                });
            });
        };
        refreshOrder();
    }]);

