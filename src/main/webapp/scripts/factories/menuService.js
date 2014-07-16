/**
 * Created by Martin on 6/21/2014.
 */
'use strict';
feedmeApp.factory('MenuService', ['$resource', '$http',
    function ($resource, $http) {
        var allMenus = {'Menies': [
            {
                RestaurantId:1,
                menuId: 1,
                availableCategories: [
                    {
                        name: "Starters",
                        availableItems: [
                            {
                                itemId: 1,
                                name: "Topeno Sirenje",
                                price: 150,
                                desc: "home made cheese, baked in oven",
                                defaultValue:1
                            },
                            {
                                itemId: 2,
                                name: "Bieno sirenje na skara",
                                price: 200,
                                desc: "baked cheese",
                                defaultValue:1

                            },
                            {
                                itemId: 3,
                                name: "Pecurki na skara",
                                price: 200,
                                desc: "mushrooms on grill",
                                defaultValue:1
                            },
                            {
                                itemId: 4,
                                name: "Pileski prsti",
                                price: 250,
                                desc: "chicken nuggets",
                                defaultValue:1
                            }
                        ]
                    },
                    {
                        name: "Salads",
                        availableItems: [
                            {
                                itemId: 5,
                                name: "Egejska",
                                price: 150,
                                desc: "asd",
                                defaultValue:1
                            },
                            {
                                itemId: 6,
                                name: "Shopska",
                                price: 200,
                                desc: "fgh"
                            },
                            {
                                itemId: 7,
                                name: "Makedonska",
                                price: 100,
                                desc: "jkl",
                                defaultValue:1
                            },
                            {
                                itemId: 8,
                                name: "Cezar",
                                price: 250,
                                desc: "asdf",
                                defaultValue:1
                            }
                        ]
                    },
                    {
                        name: "Grill",
                        availableItems: [
                            {
                                itemId: 9,
                                name: "Kebapce",
                                price: 15,
                                desc: "asd",
                                defaultValue:1
                            },
                            {
                                itemId: 10,
                                name: "Pleskavica",
                                price: 150,
                                desc: "fgh",
                                defaultValue:1
                            },
                            {
                                itemId: 11,
                                name: "Sharska Pleskavica",
                                price: 200,
                                desc: "jkl",
                                defaultValue:1
                            },
                            {
                                itemId: 12,
                                name: "Uvijac",
                                price: 180,
                                desc: "asdf",
                                defaultValue:1
                            },
                            {
                                itemId: 13,
                                name: "Rebro",
                                price: 200,
                                desc: "asdf",
                                defaultValue:1
                            },
                            {
                                itemId: 14,
                                name: "Becka Snicla",
                                price: 230,
                                desc: "asdf",
                                defaultValue:1
                            },
                            {
                                itemId: 15,
                                name: "Domacha kobasica",
                                price: 140,
                                desc: "asdf",
                                defaultValue:1
                            }
                        ]
                    },
                    {
                        name: "Desserts",
                        availableItems: [
                            {
                                itemId: 16,
                                name: "Sladoled topce",
                                price: 15,
                                desc: "asd",
                                defaultValue:1
                            },
                            {
                                itemId: 17,
                                name: "Saher Torta",
                                price: 150,
                                desc: "fgh",
                                defaultValue:1
                            },
                            {
                                itemId: 18,
                                name: "Toplo-Ladno",
                                price: 200,
                                desc: "jkl",
                                defaultValue:1
                            },
                            {
                                itemId: 19,
                                name: "Baklava",
                                price: 180,
                                desc: "asdf",
                                defaultValue:1
                            },
                            {
                                itemId: 20,
                                name: "Bogata palacinka",
                                price: 200,
                                desc: "asdf",
                                defaultValue:1
                            },
                            {
                                itemId: 21,
                                name: "CheeseCake",
                                price: 230,
                                desc: "asdf",
                                defaultValue:1
                            },
                            {
                                itemId: 22,
                                name: "Slatko od smokvi",
                                price: 140,
                                desc: "asdf",
                                defaultValue:1
                            }
                        ]
                    }
                ]
            },
            {
                RestaurantId:2,
                id: 2,
                availableCategories: [],
                name: 'Veneto'
            },
            {
                RestaurantId:3,
                id: 3,
                name: 'Enriko',
                availableCategories: []
            },
            { RestaurantId:4,
                id: 4,
                name: 'Gala Kujna1',
                availableCategories: []
            },
            { RestaurantId:5,
                id: 5,
                name: 'Celik',
                availableCategories: []
            },
            {  RestaurantId:6,
                id: 6,
                name: '1001 night',
                availableCategories: []
            },
            {    RestaurantId:7,
                id: 7,
                name: '4 seasons',
                availableCategories: []
            },
            {    RestaurantId:8,
                id: 8,
                name: 'Kostarika',
                availableCategories: []
            }
        ]};

        return {
            loadMenu: function (id) {
                var promise = $http.get('app/rest/account').then(function () {
                    for(var i =0; i<allMenus.Menies.length;i++){
                        if(allMenus.Menies[i].RestaurantId==id){
                            return allMenus.Menies[i];
                        }
                    }
                    return "";
                });
                return promise;
            }
        };

    }]);