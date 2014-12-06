'use strict';

angular
    .module('divesitesApp').config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProvider) {
        GoogleMapApiProvider.configure({
            key: APPCONFIG.gmapsKey,
            v: '3.17',
            libraries: 'weather,geometry,visualization'
        });
    }]
);