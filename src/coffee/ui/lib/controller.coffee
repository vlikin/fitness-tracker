angular.module('app')
  .controller('FrameController' , ($scope, $mdSidenav)->
    $scope.greetings = 'Hello'
    $scope.toggleSidenav = (menuId)->
      $mdSidenav(menuId).toggle()
      true
    true
  )
