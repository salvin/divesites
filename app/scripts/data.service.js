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
                    {name: 'Mountbatten Pontoon', siteType:'waypoint', geo:{lat: '50 21.640N', lng: '4 7.619W'}},
                    {name: 'Mountbatten Breakwater', siteType:'waypoint', geo:{lat: '50 21.557N', lng: '4 08.206W'}},
                    {name: 'Mallard Shoal', siteType:'waypoint', geo:{lat: '50 21.722N', lng: '4 08.297W'}},
                    {name: 'East Channel', siteType:'waypoint', geo:{lat: '50 20.040N', lng: '4 08.061W'}},
                    {name: 'West Channel', siteType:'waypoint', geo:{lat: '50 20.106N', lng: '4 10.075W'}},
                    {name: 'Shag Stone', siteType:'waypoint', geo:{lat: '50 19.056N', lng: '4 07.661W'}},
                    {name: 'Mewstone', siteType:'waypoint', geo:{lat: '50 18.264N', lng: '4 06.642W'}},
                    {name: 'Penlee Point', siteType:'waypoint', geo:{lat: '50 19.031N', lng: '4 11.123W'}},
                    {name: 'Rame Head', siteType:'waypoint', geo:{lat: '50 18.557N', lng: '4 13.466W'}},
                    {name: 'Looe Bar', siteType:'waypoint', geo:{lat: '50 21.007N', lng: '4 26.908W'}},
                    {name: 'Hope Cove', siteType:'waypoint', geo:{lat: '50 14.716N', lng: '3 51.969W'}},
                    {name: 'Salcombe Bar', siteType:'waypoint', geo:{lat: '50 13.166N', lng: '3 46.489W'}},
                    {name: 'Challaborough', siteType:'waypoint', geo:{lat: '50 17.170N', lng: '3 54.050W'}},

                    {
                        name: 'The Persier',
                        siteType:'wrack',
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
                        siteType:'wrack',
                        geo: {
                            lat: '50 19.597N',
                            lng: '4 14.711W'
                        },
                        slack: 'Diveable at any time on a neap. Diveable at any time on a spring, on tucking into the wreck or the lee.',
                        depth: '6-27m',
                        desc: '',
                        notes: 'Permanently buoyed on the bow. To find the wreck go to the JEL Red shipping buoy and drive approximately 100m towards the shore. Easily visible on an echo sounder. 442ft, 10,414 ton Liberty Ship sunk by U-624 in March 1945. Stern section in 27 metres about 50m off main wreck.',
                        source: 'Ben Jaffey, June 2004, 100 Best Dives in Cornwall'
                    },
                    {
                        name: 'Scylla',
                        siteType:'wrack',
                        geo: {
                            lat: '50 19.660N',
                            lng: '4 15.193W'
                        },
                        slack: 'Diveable at any time in the lee',
                        depth: '6-27m',
                        desc: '',
                        notes: 'Former Navy vessel sunk as “underwater reef”. Permanently buoyed on bow, midships and stern.',
                        source: 'Ben Jaffey, June 2004'
                    },
                    {
                        name: 'Eddystone Lighthouse',
                        siteType:'reef',
                        geo: {
                            lat: '50 10.750N',
                            lng: '4 15.950W'
                        },
                        slack: 'Diveable in tÔhe lee at any time. On springs, 2½ hours after HW/LW Plymouth (Devonport).',
                        depth: '0-40m',
                        desc: '',
                        notes: '',
                        source: 'Ben Jaffey, July 2003 http://www.divernet.com/travel/eddy699.htm'
                    }

                ],
                'North Cornwall':[
                    {
                        name: 'St Chamond (the Train Wreck)',
                        geo: {
                            lat: '50 14.861N',
                            lng: '5 29.833W'
                        },
                        slack: 'HW/LW St. Ives + 15',
                        depth: '26mm',
                        desc: '314 ft, 3077-ton sunk by U-60 in April 1918. Are 5x steam engines on board, hence the nickname. Plenty of fish. Buoyed.',
                        notes: '',
                        source: 'Ben Jaffey, July 2003 http://www.divernet.com/travel/eddy699.htm'
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
                return fillMeta(element);
            });
        }
        function prepareSites(){
            Object.keys(sites).map(function processingSites(regionElement){
                sites[regionElement].map(function processingSitesInner(site, index){
                    sites[regionElement][index] = fillMeta(site);

                });
            });
        }

        function fillMeta(element){
            var processedElement = element;
            processedElement = fillGeo(element);
            processedElement = fillMarkerIcon(element);
            return processedElement;
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

        function fillMarkerIcon(element){
            element.icon = 'images/icons/';
            if(typeof(element.siteType) !== 'undefined'){
                switch(element.siteType){
                    case 'wrack':
                        element.icon +='wrack.png';
                        break;
                    case 'reef':
                        element.icon +='reef.png';
                        break;
                    case 'waypoint':
                        element.icon +='waypoint.png';
                        break;
                }
            }else{
                element.icon +='waypoint.png';
            }

            element.options = {
                labelContent: element.name,
                labelAnchor: '22 0',
                labelClass: 'marker-labels'
            };
            return element;

        }

    }
})();