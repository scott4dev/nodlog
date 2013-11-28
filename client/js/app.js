var LogApp = angular.module('LogApp', ['ngResource'])

LogApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {controller: ListCtrl, templateUrl: '/partials/list.html'}) 
    .otherwise({redirectTo: '/'})
    //$locationProvider.html5Mode(true)
})

LogApp.factory('LogsService', function($resource) {
  return $resource('/api/logs/:id', {id: '@id'}, {update: {method: 'PUT'}})
})