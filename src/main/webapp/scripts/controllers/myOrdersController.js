'use strict';
/**
 * Created by Martin on 6/19/2014.
 */

feedmeApp.controller('CheckoutController', ['$rootScope','$scope','$state', 'RestaurantsService','StateService',
    'OrderService','UserService','AreaService',
    function ($rootScope,$scope,$state, RestaurantsService, StateService,OrderService, UserService, AreaService ) {
        $scope.showOrders = false;
        $scope.totalPrice = function(){
            debugger;
            if($scope.order!==undefined) {
                var sum = 0;
                for (var i = 0; i < $scope.order.itemsOrdered.length; i++) {
                    var price = Number.parseFloat($scope.order.itemsOrdered[i].price)
                        * Number.parseFloat($scope.order.itemsOrdered[i].quantity);
                    sum = sum + price;
                }

                var distance = AreaService.calculateDistanceBetweenAreas()-Math.round(sum / 1000);
                var distancePrice = AreaService.getDistancePrice();
                var totalsum = sum;
                if (distance>0) {

                    totalsum = sum + distance * distancePrice;
                }

                return {sum: sum,distance: distance,distancePrice: distancePrice,totalSum:totalsum};
            }
        };
        $scope.removeOne = function(item) {

            OrderService.removeItemFromOrder($scope.order.orderId,item.itemId).then(function(data){
                console.log(data);
            });

        };
        $scope.saveOrder = function() {
            OrderService.saveOrderToServer().then(function(data){
                console.log(data);
            });
        };
        $scope.createOrder = function() {
            $rootScope.additionalErrorInfo="errors.contactAdmin";
            $rootScope.errorMessage="errors.orderNotFound";
            $state.go('error');
            /*OrderService.finishOrder().then(function(data){
                console.log(data);
                //redirect to myOrders
            });*/
        };
        var refreshOrder=function(){
            StateService.getSelectedRestaurant().then(function(data){
                $scope.selectedId=data;
                RestaurantsService.loadRestaurantById($scope.selectedId).then(function(data){
                    $scope.restaurant=data;
                });
                UserService.getCurrentUser().then(function(data){
                    $scope.userId=data;
                    OrderService.loadOrdersByUserRestaurantAndStatus($scope.userId,$scope.selectedId,"onCheckout")
                        .then(function(data){

                            if(data.length==1){
                        $scope.order=data[0];}
                            else if(data.length<1){
                                $rootScope.additionalErrorInfo="errors.contactAdmin";
                                $rootScope.errorMessage="errors.orderNotFound";
                                $state.go('error');
                            }
                            else if(data.length>1){
                            OrderService.cleanDuplicateOrdersByUserRestaurantAndStatus(
                                $scope.userId,
                                $scope.selectedId,
                                "onCheckout").then(function(data){
                                    OrderService.loadOrdersByUserRestaurantAndStatus(
                                        $scope.userId,
                                        $scope.selectedId,
                                        "onCheckout")
                                        .then(function(data){
                                        $scope.order=data[0];});
                                });
                            }

                    });
                });
            });
        };
        refreshOrder();

    }]);

