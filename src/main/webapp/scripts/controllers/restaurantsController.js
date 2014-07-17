'use strict';
/**
 * Created by Martin on 6/19/2014.
 */

feedmeApp.controller('RestaurantsController', ['$scope', '$translate', '$filter', 'RestaurantsService',
    'StateService','$state',
    function ($scope, $translate, $filter, RestaurantsService, StateService,$state) {

       $scope.loadResaurants = function(){

       };
        $scope.setRestaurant = function() {
            $scope.selected = this.restaurant;
            StateService.setSelectedRestaurant($scope.selected.restaurantId);
            $state.go('restaurant');
        };

        RestaurantsService.loadAllRestaurants().then(function(data){
            $scope.restourants = data;
            $scope.areas=[];
            $scope.types=[];
            for (var i = 0; i < $scope.restourants.length; ++i) {
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
                flag=false;
                var type=$scope.restourants[i].type;
                for(var j = 0; j <  $scope.types.length; ++j) {

                    if( $scope.types[j]===type){
                        flag=true;
                    }
                }
                if(!flag){
                    $scope.types.push(type)
                }
            }
        });
      /*  $scope.onChangeDate = function() {
            AuditsService.findByDates($scope.fromDate, $scope.toDate).then(function(data){
                $scope.audits = data;
            });
        };

        // Date picker configuration
        $scope.today = function() {
            // Today + 1 day - needed if the current day must be included
            var today = new Date();
            var tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate()+1); // create new increased date

            $scope.toDate = $filter('date')(tomorrow, "yyyy-MM-dd");
        };

        $scope.previousMonth = function() {
            var fromDate = new Date();
            if (fromDate.getMonth() == 0) {
                fromDate = new Date(fromDate.getFullYear() - 1, 0, fromDate.getDate());
            } else {
                fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
            }

            $scope.fromDate = $filter('date')(fromDate, "yyyy-MM-dd");
        };

        $scope.today();
        $scope.previousMonth();

        AuditsService.findByDates($scope.fromDate, $scope.toDate).then(function(data){
            $scope.audits = data;
        });*/
    }]);

