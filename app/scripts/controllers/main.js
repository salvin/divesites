'use strict';

/**
 * @ngdoc function
 * @name divesitesApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the divesitesApp
 */
angular.module('divesitesApp')
    .controller('MainCtrl', ['$scope', 'dataService', 'uiGmapGoogleMapApi', 'mapService', function ($scope, dataServiece, uiGmapGoogleMapApi, mapService) {
        // Do stuff with your $scope.
        // Note: Some of the directives require at least something to be defined originally!
        // e.g. $scope.markers = []
        /* jshint validthis: true */
        var vm = this;
        vm.map = {center: {latitude: '50 21.640N', longitude: '4 7.619W'}, zoom: 14};
        vm.regions = [];

        vm.sites = [];
        vm.selectRegion = selectRegion;
        vm.getMarkerIcon = getMarkerIcon;


        // uiGmapGoogleMapApi is a promise.
        // The "then" callback function provides the google.maps object.
        uiGmapGoogleMapApi.then(function (maps) {
            activate();
        });

        function activate() {
            vm.regions = dataServiece.getRegions().then(
                function processRegions(regions) {
                    vm.regions = regions;
                    vm.map = {center: dataServiece.convertGeo(vm.regions[0].geo), zoom: vm.regions[0].geo.zoom};
                }
            );
        }

        function selectRegion(name) {
            var selectedRegions = vm.regions.filter(function (elem) {
                return elem.name === name;
            }), selectedRegion;
            selectedRegion = selectedRegions[0];
            vm.map = {center: selectedRegion.geo, zoom: selectedRegion.geo.zoom};

            dataServiece.getSitesInRegion(selectedRegion.name).then(processSites);
        }

        function processSites(sites) {
            vm.sites = sites;
        }

        function getMarkerIcon(marker) {
            var ret = {}
            switch (marker.siteType) {
                case 'reef':
                    ret = {};
                    break;
                case 'wreck':
                    ret = {};
                    break;
            }
            return ret;
        }

    }]);

