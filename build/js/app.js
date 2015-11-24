(function() {
  var app;

  app = angular.module('app', ['ngMaterial']);

}).call(this);

(function() {
  angular.module('app').controller('FrameController', function($scope, $mdSidenav) {
    $scope.greetings = 'Hello';
    $scope.toggleSidenav = function(menuId) {
      $mdSidenav(menuId).toggle();
      return true;
    };
    return true;
  });

}).call(this);

(function() {


}).call(this);
