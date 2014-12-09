(function () {
    'use strict';
    angular
        .module('divesitesApp')
        .factory('dataService', dataService);

    function dataService($q) {
        var regions = [
                {name: 'Plymouth', geo: {lat: '50 21.640N', lng: '4 7.619W', zoom: 10}},
                {name: 'North Cornwall', geo: {lat: '50° 14.861N', lng: '5° 29.833W', zoom: 10}}
            ],
            sites = {
                'Plymouth': [
                    {
                        name: 'The Persier',
                        geo: {
                            lat: '50 17.115N',
                            lng: '3 58.138W '
                        },
                        slack: 'At any time on a neap.',
                        depth: '28m',
                        desc: '',
                        notes: '8 miles SE of Plymouth Sound, past Hilsea Point. Large wreck, stands 2-3m proud and always has large shoals of fish on it.',
                        source: 'Ben Jaffey, July 2003, http://www.divernet.com/wrecks/wtour520603.shtml'
                    },
                    {
                        name: 'James Eagan Layne',
                        geo: {
                            lat: '50 19.597N',
                            lng: '4 14.711W'
                        },
                        slack: 'Diveable at any time on a neap. Diveable at any time on a spring, on tucking into the wreck or the lee.',
                        depth: '6-27m',
                        desc: '',
                        notes: 'Permanently buoyed on the bow. To find the wreck go to the JEL Red shipping buoy and drive approximately 100m towards the shore. Easily visible on an echo sounder. 442ft, 10,414 ton Liberty Ship sunk by U-624 in March 1945. Stern section in 27 metres about 50m off main wreck.',
                        source: 'Ben Jaffey, June 2004, 100 Best Dives in Cornwall'
                    }

                ]
            };
        prepareData();


        return {
            convertGeo: convertGeo,
            getRegions: getRegions,
            getSitesInRegion: getSitesInRegion
        };
        function getRegions() {
            var deferred = $q.defer();
            deferred.resolve(regions);
            return deferred.promise;
        }

        function getSitesInRegion(regionName) {
            var deferred = $q.defer();
            deferred.resolve(sites[regionName]);
            return deferred.promise;
        }

        function convertGeo(geo) {
            var lat = ddmToDeg(geo.lat),
                lng = ddmToDeg(geo.lng);

            /*
             50 10.750N 4 15.950W
             50°10'45.0"N 4°15'57.0"W
             50.179167, -4.265833
             */
            return {
                latitude: lat,
                longitude: lng
            };
        }

        function ddmToDeg(dms) {
            if (!dms) {
                return Number.NaN;
            }
            var neg = dms.match(/(^\s?-)|(\s?[SW]\s?$)/) != null ? -1.0 : 1.0;
            dms = dms.replace(/(^\s?-)|(\s?[NSEW]\s?)$/, '');
            var parts = dms.match(/(\d{1,3})[.,°d ]?\s*(\d{0,2}(?:\.\d+)?)[']?/);
            if (parts === null) {
                return Number.NaN;
            }
            // parts:
            // 0 : degree
            // 1 : degree
            // 2 : minutes


            var d = (parts[1] ? parts[1] : '0.0') * 1.0;
            var m = (parts[2] ? parts[2] : '0.0') * 1.0;
            var dec = (d + (m / 60.0)) * neg;
            return dec;
        }

        function prepareData() {
            prepareRegions();
            prepareSites();
        }

        function prepareRegions(){
            regions = regions.map(function processingRegions(element){
                return fillGeo(element);
            });
        }
        function prepareSites(){
            Object.keys(sites).map(function processingSites(regionElement){
                sites[regionElement].map(function processingSitesInner(site, index){
                    sites[regionElement][index] = fillGeo(site);
                });
            });
        }

        function fillGeo(element){
            var processed = element;
            if(typeof(processed.geo.latitude) === 'undefined'){
                processed.geo.latitude = ddmToDeg(processed.geo.lat);
            }

            if(typeof(processed.geo.longitude) === 'undefined'){
                processed.geo.longitude = ddmToDeg(processed.geo.lng);
            }

            return processed;
        }

    }
})();