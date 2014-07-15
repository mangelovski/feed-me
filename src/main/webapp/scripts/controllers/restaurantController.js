'use strict';
/**
 * Created by Martin on 6/19/2014.
 */

feedmeApp.controller('RestaurantController', ['$scope', '$translate', '$filter', 'RestaurantService','StateService',
    function ($scope, $translate, $filter, RestaurantService, StateService) {

       $scope.loadResaurant = function(){
           RestaurantService.loadRestourant($scope.selectedId).then(function(data){
               $scope.restourant = data;
               debugger;
               $scope.areas=[];
               $scope.types=[];
               /*for (var i = 0; i < $scope.restourants.length; ++i) {
                var flag=false;
                var area=$scope.restourants[i].area;
                for(var j = 0; j <  $scope.areas.length; ++j) {

                if( $scope.areas[j]===area){
                flag=true;
                }
                }
                if(!flag){
                $scope.areas.push(area)
                }
                var flag=false;
                var type=$scope.restourants[i].type;
                for(var j = 0; j <  $scope.types.length; ++j) {

                if( $scope.types[j]===type){
                flag=true;
                }
                }
                if(!flag){
                $scope.types.push(type)
                }
                }*/
           });
       };
        StateService.getSelectedRestaurant().then(function(data){
            $scope.selectedId=data;
            debugger;
            $scope.loadResaurant();
        });


    }]);

