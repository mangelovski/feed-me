'use strict';
/**
 * Created by Martin on 6/19/2014.
 */


feedmeApp.controller('MenuController', ['$scope','MenuService',
    'RestaurantsService','StateService','OrderService','UserService',
    function ($scope,MenuService,RestaurantsService,StateService,OrderService,UserService) {
        $scope.orderView=true;
        $scope.addToCart = function(item) {

            var quantity;
            if(item.quantity>0){
                quantity=item.quantity;
            }else{
                quantity=item.defaultValue;
            }

           OrderService.addItemToOrder($scope.order.orderId,item.itemId,item.name,item.price,"",quantity).then(function(data){
           console.log(data);
           });

        };

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

            MenuService.loadMenu($scope.selectedId).then(function(data){
                $scope.menu=data;
                $scope.categories=[];
                for (var i = 0; i < $scope.menu.availableCategories.length; ++i) {
                    var flag=false;
                    var category=$scope.menu.availableCategories[i].name;
                    for(var j = 0; j <  $scope.categories.length; ++j) {

                        if( $scope.categories[j]===category){
                            flag=true;
                        }
                    }
                    if(!flag) {
                        $scope.categories.push(category)
                    }
                }

            });
        });

    }]);
