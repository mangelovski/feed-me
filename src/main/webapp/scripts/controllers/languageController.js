'use strict';
/**
 * Created by Martin on 6/19/2014.
 */
feedmeApp.controller('LanguageController', ['$scope', '$translate',
    function ($scope, $translate) {
        $scope.changeLanguage = function (languageKey) {
            $translate.use(languageKey);
        };
    }]);