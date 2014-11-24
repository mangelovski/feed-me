/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('OrderService', ['$resource', '$http',
    function ($resource, $http) {
        var currentOrder="";

        return {
            getAllOrdersByUserId: function (userId) {
                return $http.get('app/rest/getAllOrdersByUserId',{params: {userId: userId}}).then(function (response) {
                    return response.data;
                });
                return promise;
            },
            loadLastUncompletedOrderOrMakeNew: function (userId,restaurantId) {
                return $http.get('app/rest/getLastOrderOrCrateNew',{params: {restaurantId: restaurantId,userId:userId}})
                    .then(function (response) {
                   currentOrder=response.data;

                    return currentOrder;
                });
            },
            loadOrdersByUserRestaurantAndStatus: function (userId,restaurantId,status) {
                return $http.get('app/rest/getOrdersByStatusAndIds',
                    {params: {restaurantId: restaurantId,userId:userId,orderStatus:status}})
                    .then(function (response) {
                        currentOrder=response.data[0];

                        return response.data;
                    });
            },
            cleanDuplicateOrdersByUserRestaurantAndStatus: function (userId,restaurantId,status) {
                return $http.get('app/rest/cleanOrdersByStatusAndIds',
                    {params: {restaurantId: restaurantId,userId:userId,orderStatus:status}})
                    .then(function (response) {
                        console.log(response.data);
                        return response.data;
                    });
            },
            addItemToOrder: function (orderId,itemId,itemName,itemPrice,comments,quantity) {
             return $http.get('app/rest/account').then(function () {
                        var containsItem = false;
                        for (var j = 0; j < currentOrder.itemsOrdered.length; j++) {
                            if (currentOrder.itemsOrdered[j].itemId === itemId) {
                                currentOrder.itemsOrdered[j].quantity =
                                    parseInt(currentOrder.itemsOrdered[j].quantity)+parseInt(quantity);
                                if (comments != "")
                                    currentOrder.itemsOrdered[j].comments = comments;
                                containsItem = true;
                            }
                        }
                        if (!containsItem) {

                            var newItem = {
                                itemId: itemId,
                                name: itemName,
                                price: itemPrice,
                                quantity: quantity,
                                comments: comments
                            };
                            currentOrder.itemsOrdered.push(newItem);
                        }
                        return true;
            });
        },
            removeItemFromOrder: function (orderId,itemId) {
                return $http.get('app/rest/account').then(function () {
                        if(currentOrder.orderId==orderId) {
                            for (var j = 0; j < currentOrder.itemsOrdered.length; j++) {

                                if (currentOrder.itemsOrdered[j].itemId == itemId) {
                                    currentOrder.itemsOrdered[j].quantity =
                                        parseInt(currentOrder.itemsOrdered[j].quantity)-1;
                                    if(currentOrder.itemsOrdered[j].quantity==0){
                                        currentOrder.itemsOrdered.splice(j,1);
                                    }
                                    return true;
                                }
                            }

                        }
                    return false;
                });
            },
            saveOrderToServer: function (order) {
                currentOrder=order;
                return $http.put('app/rest/updateOrder',currentOrder).then(function (response) {

                    return response.data;
                });
            },
            createOrder: function () {
                currentOrder.orderStatus="onCheckout";
                return $http.put('app/rest/updateOrder',currentOrder).then(function (response) {

                    return response.data;
                });
            },
            finishOrdering: function (order) {
                currentOrder=order;
                currentOrder.orderStatus="ordered";
                return $http.put('app/rest/updateOrder',currentOrder).then(function (response) {

                    return response.data;
                });
            }

    }
    }]);