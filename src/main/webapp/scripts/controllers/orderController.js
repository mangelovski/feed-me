'use strict';
/**
 * Created by Martin on 6/19/2014.
 */

feedmeApp.controller('OrderController', ['$scope', 'RestaurantsService','StateService','OrderService','UserService',
    function ($scope, RestaurantsService, StateService,OrderService, UserService ) {
        $scope.showOrders = true;

        StateService.getSelectedRestaurant().then(function(data){
            $scope.selectedId=parseInt(data);
            RestaurantsService.loadRestaurantById($scope.selectedId).then(function(data){
                $scope.restaurant=data;
            });
            UserService.getCurrentUser().then(function(data){
                OrderService.loadLastUncompletedOrderOrMakeNew(parseInt(data),$scope.selectedId).then(function(data){
                    $scope.order=data;
                });
            });
        });
    }]);

