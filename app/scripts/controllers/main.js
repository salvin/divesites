'use strict';

/**
 * @ngdoc function
 * @name divesitesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the divesitesApp
 */
angular.module('divesitesApp')
    .controller('MainCtrl', function ($scope, uiGmapGoogleMapApi) {
        // Do stuff with your $scope.
        // Note: Some of the directives require at least something to be defined originally!
        // e.g. $scope.markers = []

        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
        $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
        $scope.options = {scrollwheel: false};




        // uiGmapGoogleMapApi is a promise.
        // The "then" callback function provides the google.maps object.
        uiGmapGoogleMapApi.then(function(maps) {
            //this.map = {center: {latitude: 45, longitude: -73}, zoom: 8};

        });
    });

