/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('OrderService', ['$resource', '$http',
    function ($resource, $http) {
        var nextId=2;
        var allOrders = {'Orders': [
            {
                OrderId:1,
                UserId: 1,
                RestaurantId:1,
                itemsOrdered: [

                            {
                                itemId: 1,
                                name: "Topeno Sirenje",
                                price: 150,
                                quantity:3,
                                comments:""
                            },
                            {
                                itemId: 4,
                                name: "Pileski prsti",
                                price: 250,
                                quantity:1,
                                comments:""
                            },
                    {
                        itemId: 6,
                        name: "Shopska",
                        price: 200,
                        quantity:2,
                        comments:"no onions"
                    },
                    {
                        itemId: 9,
                        name: "Kebapce",
                        price: 15,
                        quantity:10,
                        comments:"with onions"
                    },
                    {
                        itemId: 12,
                        name: "Uvijac",
                        price: 180,
                        quantity:1,
                        comments:""
                    },
                    {
                        itemId: 16,
                        name: "Sladoled topce",
                        price: 15,
                        quantity:3,
                        comments:""
                    }
                    ],
                    orderStatus:"makingCart"
            }
        ]};

        return {
            loadOrderById: function (orderId) {
                var promise = $http.get('app/rest/account').then(function () {
                    for(var i =0; i<allOrders.Orders.length;i++){
                        if(allOrders.Orders[i].OrderId==orderId){
                            return allOrders.Orders[i];
                        }
                    }
                    return "";
                });
                return promise;
            },
            loadLastUncompletedOrderOrMakeNew: function (userId,restaurantId) {
                var promise = $http.get('app/rest/account').then(function () {
                    for(var i =0; i<allOrders.Orders.length;i++){
                        if(allOrders.Orders[i].UserId==userId
                            &&allOrders.Orders[i].orderStatus==="makingCart"
                            &&allOrders.Orders[i].RestaurantId==restaurantId){
                            return allOrders.Orders[i];
                        }
                    }
                    var NewOrder= {
                        OrderId: nextId,
                        UserId: userId,
                        RestaurantId: restaurantId,
                        itemsOrdered: []
                    };
                        nextId++;
                        allOrders.Orders.push(NewOrder);
                    return NewOrder;
                });
                return promise;
            },
            addItemToOrder: function (orderId,itemId,itemName,itemPrice,comments,quantity) {
                var promise = $http.get('app/rest/account').then(function () {
                    for(var i =0; i<allOrders.Orders.length;i++){
                        if(allOrders.Orders[i].OrderId==orderId) {
                            var containsItem = false;
                            for (var j = 0; j < allOrders.Orders[i].itemsOrdered.length; j++) {
                                if (allOrders.Orders[i].itemsOrdered[j].itemId == itemId) {
                                    allOrders.Orders[i].itemsOrdered[j].quantity += quantity;
                                    if (comments != "")
                                        allOrders.Orders[i].itemsOrdered[j].comments = comments;
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
                            allOrders.Orders[i].itemsOrdered.push(newItem);
                             }
                            return true;
                        }
                    }
                    return false;
                });
                return promise;
            }
        }
    }]);